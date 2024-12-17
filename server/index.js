const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { processImage } = require("./imageProcessor");
const { getFoodColorants } = require("./colorants");

const app = express();
const PORT = process.env.PORT || 3000;

// הגדרת תיקיית העלאות
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// הגדרת Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// שרת את קבצי ה-React
app.use(express.static(path.join(__dirname, "client/build")));

// נתיב להעלאת קובץ
app.post("/upload", upload.single("image"), async (req, res) => {
  if (req.file) {
    console.log("File uploaded:", req.file.originalname);
    try {
      // עיבוד התמונה
      const { detectedColorants, text } = await processImage(req.file.path);

      // שליחה חזרה של התוצאה ללקוח
      res.json({ colorants: detectedColorants, text });
    } catch (err) {
      console.error("Error during image processing:", err);
      res.status(500).json({ message: "Failed to analyze image", error: err });
    }
  } else {
    console.log("No file uploaded");
    res.status(400).json({ message: "No file uploaded" });
  }
});

// כל בקשה שלא תואמת ל-API תנותב ל-React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
