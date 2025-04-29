let showTable = (idTable, data) => {
  let table = d3.select("#" + idTable).attr("class", "buildings-table");

  let head = table
    .append("thead")
    .append("tr")
    .selectAll("th")
    .data(Object.keys(data[0]))
    .enter()
    .append("th")
    .text((d) => d);

  let body = table.append("tbody");

  let rows = body.selectAll("tr").data(data).enter().append("tr");

  let cells = rows
    .selectAll("td")
    .data((d) => Object.values(d))
    .enter()
    .append("td")
    .text((d) => d);
};
