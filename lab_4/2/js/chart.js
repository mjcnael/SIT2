function createArrGraph(data, xKey, showMin, showMax) {
  const groupObj = d3.group(data, (d) => d[xKey]);
  let arrGraph = [];

  for (let entry of groupObj) {
    const heights = entry[1].map((d) => d["Высота"]);
    const [min, max] = d3.extent(heights);

    const item = { labelX: entry[0] };
    if (showMin) item.min = min;
    if (showMax) item.max = max;

    arrGraph.push(item);
  }

  if (xKey === "Год") {
    arrGraph.sort((a, b) => a.labelX - b.labelX);
  }

  return arrGraph;
}

function drawGraph(data, settings) {
  const { xAxis, showMin, showMax, chartType } = settings;
  const svg = d3.select("svg");
  svg.selectAll("*").remove();

  if (!showMin && !showMax) {
    document.getElementById("error-message").textContent =
      "Выберите хотя бы одно значение для оси OY";
    return;
  }
  document.getElementById("error-message").textContent = "";

  const arrGraph = createArrGraph(data, xAxis, showMin, showMax);

  const attr_area = {
    width: parseFloat(svg.style("width")),
    height: parseFloat(svg.style("height")),
    marginX: 50,
    marginY: 50,
  };

  const [scX, scY] = createAxis(
    svg,
    arrGraph,
    attr_area,
    xAxis,
    showMin,
    showMax,
  );

  if (chartType === "scatter") {
    createScatterChart(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
  } else {
    createBarChart(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
  }
}

function createAxis(svg, data, attr_area, xAxis, showMin, showMax) {
  const yValues = [];
  data.forEach((d) => {
    if (showMin && d.min) yValues.push(d.min);
    if (showMax && d.max) yValues.push(d.max);
  });

  if (yValues.length === 0) {
    throw new Error("No Y values available for axis");
  }

  const [minY, maxY] = d3.extent(yValues);

  let scaleX = d3
    .scaleBand()
    .domain(data.map((d) => d.labelX))
    .range([0, attr_area.width - 2 * attr_area.marginX])
    .padding(0.1);

  let scaleY = d3
    .scaleLinear()
    .domain([minY * 0.85, maxY * 1.1])
    .range([attr_area.height - 2 * attr_area.marginY, 0]);

  let axisX = d3.axisBottom(scaleX);
  let axisY = d3.axisLeft(scaleY);

  svg
    .append("g")
    .attr(
      "transform",
      `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`,
    )
    .call(axisX)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", (d) => "rotate(-45)");

  svg
    .append("g")
    .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
    .call(axisY);

  return [scaleX, scaleY];
}

function createScatterChart(
  svg,
  data,
  scaleX,
  scaleY,
  attr_area,
  showMin,
  showMax,
) {
  const r = 4;

  if (showMax) {
    svg
      .selectAll(".dot-max")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot-max")
      .attr("r", r)
      .attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
      .attr("cy", (d) => scaleY(d.max))
      .attr(
        "transform",
        `translate(${attr_area.marginX}, ${attr_area.marginY})`,
      )
      .style("fill", "red");
  }

  if (showMin) {
    svg
      .selectAll(".dot-min")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot-min")
      .attr("r", r)
      .attr("cx", (d) => scaleX(d.labelX) + scaleX.bandwidth() / 2)
      .attr("cy", (d) => scaleY(d.min))
      .attr(
        "transform",
        `translate(${attr_area.marginX}, ${attr_area.marginY})`,
      )
      .style("fill", "blue");
  }
}

function createBarChart(
  svg,
  data,
  scaleX,
  scaleY,
  attr_area,
  showMin,
  showMax,
) {
  const barWidth = scaleX.bandwidth() / (showMin && showMax ? 2 : 1);

  if (showMax) {
    svg
      .selectAll(".bar-max")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar-max")
      .attr("x", (d, i) => scaleX(d.labelX) + (showMin ? barWidth : 0))
      .attr("y", (d) => scaleY(d.max))
      .attr("width", barWidth)
      .attr(
        "height",
        (d) => attr_area.height - 2 * attr_area.marginY - scaleY(d.max),
      )
      .attr(
        "transform",
        `translate(${attr_area.marginX}, ${attr_area.marginY})`,
      )
      .style("fill", "steelblue");
  }

  if (showMin) {
    svg
      .selectAll(".bar-min")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar-min")
      .attr("x", (d, i) => scaleX(d.labelX))
      .attr("y", (d) => scaleY(d.min))
      .attr("width", barWidth)
      .attr(
        "height",
        (d) => attr_area.height - 2 * attr_area.marginY - scaleY(d.min),
      )
      .attr(
        "transform",
        `translate(${attr_area.marginX}, ${attr_area.marginY})`,
      )
      .style("fill", "orange");
  }
}
