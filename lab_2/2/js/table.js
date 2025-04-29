function clearTable(idTable) {
  const table = document.getElementById(idTable);
  if (table) {
    const tbody = table.querySelector("tbody");
    if (tbody) {
      tbody.innerHTML = "";
    }
  }
}

function createBuildingsTable(data, idTable = "buildings-table") {
  const existingTable = document.getElementById(idTable);
  if (existingTable) {
    existingTable.remove();
  }

  const table = document.createElement("table");
  table.id = idTable;
  table.className = "buildings-table";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  Object.keys(data[0]).forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.forEach((building) => {
    const row = document.createElement("tr");

    Object.values(building).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  return table;
}

function initTable() {
  const tableContainer = document.getElementById("buildings-table-container");
  const table = createBuildingsTable(buildings);
  tableContainer.appendChild(table);
}

document.addEventListener("DOMContentLoaded", initTable);
