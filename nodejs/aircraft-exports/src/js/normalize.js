const { capitalizeName, formatToDollars } = require("./utils.js");
const { format } = require("date-fns");

const normalize = (
  country1 = { name: "", data: [] },
  country2 = { name: "", data: [] }
) => {
  const countries = [country1, country2];

  const normData = countries.map((country, index) => {
    return {
      name: capitalizeName(country.name),
      totalWorld: country.data[0].country2 === "World" ? country.data[0] : null,
      toEachOther:
        country.data.find(
          (item) =>
            item.country2.toLowerCase() ===
            countries[index === 0 ? 1 : 0].name.toLowerCase()
        ) || null,
      topCountries:
        country.data.slice(1, 21).map((item) => {
          return {
            ...item,
            prettyValue: formatToDollars(item.value),
            prettyLastUpdated: format(new Date(item.lastupdate), "PP"),
          };
        }) || null,
    };
  });

  return normData;
};

module.exports = normalize;
