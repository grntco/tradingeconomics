require("dotenv").config();
const path = require("node:path");
const express = require("express");
// const te = require("tradingeconomics");
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const normalize = require("./src/js/normalize.js");

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "src/views"));

// Pulling from example JSON file to not exceed API limits for month. Will need to use below code to TE make api calls
const country1Data = undefined;
const country2Data = undefined;
// const country1Data = require("./country1Data.json");
// const country2Data = require("./country2Data.json");

app.get("/", async (req, res, next) => {
  try {
    // const country1 = req.query?.country1 || "united states";
    // const country2 = req.query?.country2 || "china";
    const country1Name = "china";
    const country2Name = "united states";

    if (!country1Name.trim() || !country2Name.trim()) {
      throw new Error("Please select countries to compare.");
    }

    if (
      country1Name.trim().toLowerCase() === country2Name.trim().toLowerCase()
    ) {
      throw new Error("Countries cannot be the same.");
    }

    // await te.login(API_KEY);

    // const country1Data = await te.getCmtCountryByCategory(
    //   (country = country1),
    //   (type = "export"),
    //   (category = "aircraft, spacecraft")
    // );

    // // Buffer for TE general limitation of 1 request per second
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // const country2Data = await te.getCmtCountryByCategory(
    //   (country = country2),
    //   (type = "export"),
    //   (category = "aircraft, spacecraft")
    // );

    if (!country1Data || !country2Data) {
      throw new Error("Failed to retrieve data.");
    }

    const [country1, country2] = normalize(
      {
        name: country1Name,
        data: country1Data,
      },
      { name: country2Name, data: country2Data }
    );

    res.render("index", { error: null, country1, country2 });
  } catch (err) {
    console.error("Error", err.message);
    res
      .status(500)
      .render("index", { error: err.message, country1: null, country2: null });
  }
});

// FOR TESTING API

app.get("/test", async (req, res, next) => {
  try {
    // await te.login(API_KEY);

    // const data = await te.getCmtCountryByCategory(
    //   (country = "china"),
    //   (type = "export"),
    //   (category = "aircraft, spacecraft")
    // );

    res.send(data);
  } catch (err) {
    console.error("Error", err.message);
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
