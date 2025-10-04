const generateChart = (
  canvasId,
  title,
  labels = [],
  values = [],
) => {
  const canvas = document.getElementById(canvasId).getContext("2d");

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: values,
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
