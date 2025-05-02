import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = ({ data, oy, chartType }) => {
  const chartRef = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    setWidth(parseFloat(svg.style("width")));
    setHeight(parseFloat(svg.style("height")));
  });

  const margin = { top: 10, bottom: 60, left: 80, right: 10 };
  const boundsWidth = width - margin.left - margin.right;
  const boundsHeight = height - margin.top - margin.bottom;

  // Подготовка всех Y-значений
  const allYValues = data.flatMap((d) => {
    const values = [];
    if (oy[0]) values.push(d.values[0]); // max
    if (oy[1]) values.push(d.values[1]); // min
    if (oy[2]) values.push(d.values[2]); // min
    return values;
  });

  const [min, max] = d3.extent(allYValues);

  const scaleX = useMemo(() => {
    return d3
      .scaleBand()
      .domain(data.map((d) => d.labelX))
      .range([0, boundsWidth])
      .padding(0.2);
  }, [data, boundsWidth]);

  const scaleY = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([min * 0.85, max * 1.1])
      .range([boundsHeight, 0]);
  }, [boundsHeight, min, max]);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove();

    const xAxis = d3.axisBottom(scaleX);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-30)");

    const yAxis = d3.axisLeft(scaleY);
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    if (chartType === "scatter") {
      data.forEach((d) => {
        const x = scaleX(d.labelX) + scaleX.bandwidth() / 2;
        if (oy[0]) {
          svg
            .append("circle")
            .attr("r", 5)
            .attr("cx", x)
            .attr("cy", scaleY(d.values[0]))
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("fill", "red");
        }
        if (oy[1]) {
          svg
            .append("circle")
            .attr("r", 5)
            .attr("cx", x)
            .attr("cy", scaleY(d.values[1]))
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("fill", "blue");
        }
        if (oy[2]) {
          svg
            .append("circle")
            .attr("r", 5)
            .attr("cx", x)
            .attr("cy", scaleY(d.values[2]))
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .style("fill", "green");
        }
      });
    } else if (chartType === "bar") {
      data.forEach((d) => {
        const x = scaleX(d.labelX);
        const barWidth = scaleX.bandwidth() / (oy[0] && oy[1] ? 2 : 1);

        if (oy[0]) {
          svg
            .append("rect")
            .attr("x", x)
            .attr("y", scaleY(d.values[0]))
            .attr("width", barWidth)
            .attr("height", boundsHeight - scaleY(d.values[0]))
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .attr("fill", "red");
        }

        if (oy[1]) {
          svg
            .append("rect")
            .attr("x", x + (oy[0] ? barWidth : 0))
            .attr("y", scaleY(d.values[1]))
            .attr("width", barWidth)
            .attr("height", boundsHeight - scaleY(d.values[1]))
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .attr("fill", "blue");
        }

        if (oy[2]) {
          svg
            .append("rect")
            .attr("x", x + (oy[2] ? barWidth : 0))
            .attr("y", scaleY(d.values[2]))
            .attr("width", barWidth)
            .attr("height", boundsHeight - scaleY(d.values[2]))
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .attr("fill", "green");
        }
      });
    }
  }, [scaleX, scaleY, data, oy, chartType]);

  return <svg ref={chartRef} style={{ width: "900px", height: "400px" }} />;
};

export default ChartDraw;
