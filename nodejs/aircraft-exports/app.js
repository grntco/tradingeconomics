const express = require("express");
const te = require("tradingeconomics");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.set("view engine", "ejs");

app.get("/", async (req, res, next) => {
  try {
    const country1 = "united states";
    const country2 = "china";

    await te.login(API_KEY);

    const country1Data = await te.getCmtCountryByCategory(
      (country = country1),
      (type = "export"),
      (category = "aircraft, spacecraft")
    );

    // Buffer for TE general limitation of 1 request per second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const country2Data = await te.getCmtCountryByCategory(
      (country = country2),
      (type = "export"),
      (category = "aircraft, spacecraft")
    );

    // const country1DataFormatted = {
    //   totalWorldExports: country1Data[0],
    //   compareCountryExports: country1Data.find(
    //     (item) => item.country2.toLowerCase() === country2.toLowerCase()
    //   ),
    //   topCountriesExports: country1Data.splice(1, 21),
    // };

    // const country2DataFormatted = {
    //   totalWorldExports: country2Data[0],
    //   compareCountryExports: country2Data.find(
    //     (item) => item.country2.toLowerCase() === country1.toLowerCase()
    //   ),
    //   topCountriesExports: country2Data.splice(1, 21),
    // };

    // res.send({
    //   country1: country1DataFormatted,
    //   country2: country2DataFormatted,
    // });

    res.send(country1Data);

    // res.render("index", { country1Data: usData, country2Data });
  } catch (err) {
    console.error("Error", err.message);
    res.status(500).send("Error fetching data");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
