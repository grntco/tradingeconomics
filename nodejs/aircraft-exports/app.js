require("dotenv").config();
const path = require("node:path");
const express = require("express");
const te = require("tradingeconomics");
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const normalize = require("./src/js/normalize.js");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "src/views"));

app.get("/", async (req, res, next) => {
  try {
    const country1Name = req.query?.country1 || "united states";
    const country2Name = req.query?.country2 || "china";

    if (!country1Name.trim() || !country2Name.trim()) {
      throw new Error("Please select countries to compare.");
    }

    if (
      country1Name.trim().toLowerCase() === country2Name.trim().toLowerCase()
    ) {
      throw new Error("Countries cannot be the same.");
    }

    await te.login(API_KEY);

    const country1Data = await te.getCmtCountryByCategory(
      (country = country1Name),
      (type = "export"),
      (category = "aircraft, spacecraft")
    );

    // Buffer for TE general limitation of 1 request per second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const country2Data = await te.getCmtCountryByCategory(
      (country = country2Name),
      (type = "export"),
      (category = "aircraft, spacecraft")
    );

    if (!country1Data || !country2Data) {
      throw new Error("Failed to retrieve data.");
    }

    const [country1, country2] = normalize(
      {
        name: country1Name.trim(),
        data: country1Data,
      },
      { name: country2Name.trim(), data: country2Data }
    );

    res.render("index", { error: null, country1, country2 });
  } catch (err) {
    console.error("Error", err.message);
    res
      .status(500)
      .render("index", { error: err.message, country1: null, country2: null });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
