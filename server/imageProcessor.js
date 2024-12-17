const Jimp = require("jimp");
const Tesseract = require("tesseract.js");
const { getFoodColorants } = require("./colorants");
const path = require("path");
const fs = require("fs");

// פונקציה לנרמול טקסט
const normalizeString = (str) => {
  if (typeof str !== "string") return "";
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9א-ת]/g, "") // הסרת תוויים לא רצויים
    .trim();
};

// פונקציה לחיפוש צבעי מאכל בטקסט
const containsColorant = (text, colorant) => {
  const normalizedText = normalizeString(text);
  const normalizedColorantId = normalizeString(colorant.id.replace("en:", "")); // התאמה לפי id
  const normalizedColorantName = normalizeString(colorant.name); // התאמה לפי name

  // בדיקת התאמה לפי id או name
  return (
    normalizedText.includes(normalizedColorantId) ||
    normalizedText.includes(normalizedColorantName)
  );
};

// פונקציה לעיבוד תמונה
const processImage = async (imagePath) => {
  try {
    const processedImagePath = path.join(
      __dirname,
      "uploads",
      "processed_" + path.basename(imagePath)
    );

    // קריאת התמונה
    const image = await Jimp.read(imagePath);

    // להימנע משינויים קשים מדי בתמונה
    await image.resize(800, Jimp.AUTO); // שינוי גודל לתמונה

    // אין צורך להמיר לשחור-לבן או לחידוד קונטרסט קשה
    await image.writeAsync(processedImagePath);

    const {
      data: { text },
    } = await Tesseract.recognize(processedImagePath, ["eng", "heb"], {
      tessedit_char_whitelist:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789אבגדהוזחטיכלמנסעפצקרשת", // הרחבה של כל התוויים
      oem: 1,
      psm: 6, // מצב הדף המשולב (נראה טוב יותר לטקסט עם כמה שורות)
    });

    console.log("Detected text:", text);

    const colorants = await getFoodColorants();
    const detectedColorants = colorants.filter((colorant) =>
      containsColorant(text, colorant)
    );

    // הסרת קבצים לאחר עיבוד
    fs.unlinkSync(imagePath);
    fs.unlinkSync(processedImagePath);

    return { detectedColorants, text };
  } catch (err) {
    console.error("Error during image processing:", err);
    throw err;
  }
};

module.exports = { processImage };
