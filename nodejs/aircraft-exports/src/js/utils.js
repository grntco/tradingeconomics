const capitalizeName = (name) => {
  const capitalized = name
    .split(" ")
    .map((word) =>
      word.length > 2 ? word[0].toUpperCase() + word.slice(1) : word
    )
    .join(" ");

  return capitalized;
};

const formatToDollars = (value) => {
  const int = parseInt(value);

  // Defining as vars to make sure number of 0s is consistent throughout if statement
  const thousand = 1000;
  const tenThousand = 10000;
  const million = 1000000;
  const billion = 1000000000;

  if (int >= billion) {
    return "$" + (int / billion).toFixed(1) + "B";
  } else if (int >= million) {
    return "$" + (int / million).toFixed(1) + "M";
  } else if (int >= tenThousand) {
    return "$" + (int / thousand).toFixed(1) + "K";
  }
  return "$" + int;
};

module.exports = {
  capitalizeName,
  formatToDollars,
};
