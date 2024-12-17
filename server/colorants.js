const axios = require("axios");

// הגדרת מטמון לצבעי מאכל
let cachedColorants = [];
let lastUpdate = 0;

// פונקציה לחיפוש צבעי מאכל מ-Open Food Facts
const getFoodColorants = async () => {
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 שעות
  const now = Date.now();

  if (cachedColorants.length > 0 && now - lastUpdate < CACHE_DURATION) {
    console.log("Using cached colorants...");
    return cachedColorants; // מחזיר מהמטמון אם הוא בתוקף
  }

  try {
    console.log("Fetching colorants from API...");
    const response = await axios.get(
      "https://world.openfoodfacts.org/additives.json",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = response.data.tags;

    if (!Array.isArray(data) || data.length === 0) {
      console.error("No data found in API response.");
      return [];
    }

    // שמירת כל הצבעים עם id ו-name
    cachedColorants = data.filter((additive) => additive.id && additive.name);
    lastUpdate = now;
    return cachedColorants;
  } catch (error) {
    console.error("Error fetching food colorants:", error.message);
    return [];
  }
};

module.exports = { getFoodColorants };
