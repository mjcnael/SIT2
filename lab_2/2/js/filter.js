const correspond = {
  Название: "structure",
  Тип: "category",
  Страна: "country",
  Город: "city",
  Год: ["yearFrom", "yearTo"],
  Высота: ["heightFrom", "heightTo"],
};

function dataFilter(dataForm) {
  let dictFilter = {};

  for (let item of dataForm.elements) {
    if (item.type === "submit" || item.type === "button") continue;

    let valInput = item.value;

    if (item.type === "text") {
      valInput = valInput.toLowerCase();
    } else if (item.type === "number") {
      if (valInput !== "") {
        valInput = Number(valInput);
      } else {
        if (item.id.includes("From")) {
          valInput = -Infinity;
        } else if (item.id.includes("To")) {
          valInput = Infinity;
        }
      }
    }

    dictFilter[item.id] = valInput;
  }

  return dictFilter;
}

function filterTable(data, idTable, dataForm) {
  const datafilter = dataFilter(dataForm);

  const tableFilter = data.filter((item) => {
    return Object.entries(correspond).every(([column, formIds]) => {
      const cellValue = item[column];
      const isTextFilter = typeof cellValue === "string";

      if (Array.isArray(formIds)) {
        const from = datafilter[formIds[0]] ?? -Infinity;
        const to = datafilter[formIds[1]] ?? Infinity;
        return cellValue >= from && cellValue <= to;
      } else {
        const filterValue = datafilter[formIds] ?? "";
        return isTextFilter
          ? cellValue.toLowerCase().includes(filterValue)
          : cellValue == filterValue;
      }
    });
  });

  clearTable(idTable);
  const tableContainer = document.getElementById("buildings-table-container");
  const table = createBuildingsTable(tableFilter, idTable);
  tableContainer.appendChild(table);
}

function clearFilter(data, idTable, dataForm) {
  for (let element of dataForm.elements) {
    if (element.type !== "submit" && element.type !== "button") {
      element.value = "";
    }
  }

  clearTable(idTable);
  const tableContainer = document.getElementById("buildings-table-container");
  const table = createBuildingsTable(data, idTable);
  tableContainer.appendChild(table);
}
