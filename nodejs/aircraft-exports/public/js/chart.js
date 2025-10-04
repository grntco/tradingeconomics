const generateChart = (canvasId, type, country1, country2) => {
  const canvas = document.getElementById(canvasId).getContext("2d");

  const title =
    type === "world"
      ? "Total World Aircraft & Spacecraft Exports"
      : "Aircraft & Spacecraft Exports to Each Other";

  const data =
    type === "world"
      ? [country1.totalWorld?.value, country2.totalWorld?.value]
      : [country1.toEachOther?.value, country2.toEachOther?.value];

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: [country1.name, country2.name],
      datasets: [
        {
          label: title,
          data: data,
          backgroundColor: ["#3333ff", "#ff3333"],
          hoverBackgroundColor: ["#0000ff", "#ff0000"],
          borderRadius: 4,
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          font: {
            size: 16,
            family: "Noto Sans",
            weight: 500,
          },
          color: "#666666",
          text: title,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return (
                context.dataset.label +
                ": " +
                context.parsed.x.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              );
            },
          },
          backgroundColor: "#2a2a2a",
          titleFont: {
            size: 12,
            family: "Noto Sans",
          },
          displayColors: false,
          bodyFont: {
            family: "Noto Sans",
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: (value) => "$" + (value / 1000000000).toFixed(1) + "B",
            color: "#8a8a8a",
            font: {
              size: 12,
              family: "Noto Sans",
            },
          },
          grid: {
            color: "#bbbbbb",
          },
        },
        y: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 16,
              family: "Noto Sans",
            },
            color: "#8a8a8a",
          },
        },
      },
    },
  });
};
