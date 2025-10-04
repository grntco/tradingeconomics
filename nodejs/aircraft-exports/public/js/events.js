document.addEventListener("DOMContentLoaded", () => {
  const country1Select = document.getElementById("country1-select");
  const country2Select = document.getElementById("country2-select");

  const handleOnChange = (e, otherSelect) => {
    [...otherSelect.options].forEach((option) => (option.disabled = false));
    otherSelect.options[e.target.selectedIndex].disabled = true;
  };

  country1Select.addEventListener("change", (e) =>
    handleOnChange(e, country2Select)
  );
  country2Select.addEventListener("change", (e) =>
    handleOnChange(e, country1Select)
  );
});
