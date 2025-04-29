function createSortArr(data) {
  let sortArr = [];
  let sortSelects = data.getElementsByTagName("select");

  for (let i = 0; i < sortSelects.length; i++) {
    let keySort = sortSelects[i].value;
    if (keySort == 0) {
      break;
    }
    let desc = document.getElementById(sortSelects[i].id + "Desc").checked;
    sortArr.push({
      column: keySort - 1,
      order: desc,
    });
  }
  return sortArr;
}

function sortTable(idTable, data) {
  let sortArr = createSortArr(data);

  if (sortArr.length === 0) {
    return false;
  }

  let table = document.getElementById(idTable);
  let rowData = Array.from(table.rows);
  rowData.shift();

  rowData.sort((first, second) => {
    for (let i in sortArr) {
      let key = sortArr[i].column;
      let firstValue = first.cells[key].innerHTML;
      let secondValue = second.cells[key].innerHTML;

      let firstNum = parseFloat(firstValue);
      let secondNum = parseFloat(secondValue);
      let isNumeric = !isNaN(firstNum) && !isNaN(secondNum);

      let comparison = 0;

      if (isNumeric) {
        comparison = firstNum - secondNum;
      } else {
        comparison = firstValue.localeCompare(secondValue);
      }

      if (comparison !== 0) {
        return sortArr[i].order ? -comparison : comparison;
      }
    }
    return 0;
  });

  let tbody = table.querySelector("tbody");
  tbody.innerHTML = "";
  rowData.forEach((row) => tbody.appendChild(row));
}
