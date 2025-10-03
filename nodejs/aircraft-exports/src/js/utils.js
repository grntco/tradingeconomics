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
  const tenThousand = 10000;
  const million = 1000000;
  const billion = 10000000;

  let percent = 1;
  let letter = "";
  if (int > tenThousand && int < million) {
    percent = 0.001;
    letter = "K";
  } else if (int >= million && int <= billion) {
    percent = 0.00001;
    letter = "M";
  } else if (int >= billion) {
    percent = 0.0000001;
    letter = "B";
  }

  const decimal = int >= tenThousand ? Math.round(int * percent) / 10 : int;

  return "$" + decimal.toString() + letter;
};

module.exports = {
  capitalizeName,
  formatToDollars,
};
