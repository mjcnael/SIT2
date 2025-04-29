document.addEventListener("DOMContentLoaded", function () {
  showTable("buildings-table", buildings);

  const toggleButton = document.getElementById("toggle-table");
  const table = document.getElementById("buildings-table");

  toggleButton.addEventListener("click", function () {
    if (toggleButton.textContent === "Скрыть таблицу") {
      table.style.display = "none";
      toggleButton.textContent = "Показать таблицу";
    } else {
      table.style.display = "";
      toggleButton.textContent = "Скрыть таблицу";
    }
  });

  document.getElementById("draw-chart").addEventListener("click", function () {
    const xAxis = document.querySelector('input[name="x-axis"]:checked').value;
    const showMin = document.getElementById("y-min").checked;
    const showMax = document.getElementById("y-max").checked;
    const chartType = document.getElementById("chart-type").value;

    drawGraph(buildings, {
      xAxis,
      showMin,
      showMax,
      chartType,
    });
  });

  drawGraph(buildings, {
    xAxis: "Страна",
    showMin: true,
    showMax: true,
    chartType: "scatter",
  });
});
