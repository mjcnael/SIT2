function createOption(str, val) {
  let item = document.createElement("option");
  item.text = str;
  item.value = val;
  return item;
}

function setSortSelect(arr, sortSelect) {
  sortSelect.innerHTML = "";
  sortSelect.append(createOption("Нет", 0));

  for (let i in arr) {
    sortSelect.append(createOption(arr[i], Number(i) + 1));
  }
}

function setSortSelects(data, dataForm) {
  let head = Object.keys(data);
  let allSelect = dataForm.getElementsByTagName("select");

  for (let j = 0; j < allSelect.length; j++) {
    setSortSelect(head, allSelect[j]);
    if (j > 0) {
      allSelect[j].disabled = true;
    }
  }
}

function changeNextSelect(nextSelectId, curSelect) {
  let nextSelect = document.getElementById(nextSelectId);
  nextSelect.disabled = false;
  nextSelect.innerHTML = curSelect.innerHTML;

  if (curSelect.value != 0) {
    nextSelect.remove(curSelect.value);
  } else {
    nextSelect.disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const filterForm = document.getElementById("filter-form");
  const clearButton = document.getElementById("clear-filter");

  if (filterForm) {
    filterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      filterTable(buildings, "buildings-table", this);
      resetSortForm();
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", function () {
      clearFilter(buildings, "buildings-table", filterForm);
      resetSortForm();
    });
  }

  const sortForm = document.getElementById("sort-form");
  const sortButton = document.getElementById("sort-button");
  const resetSortButton = document.getElementById("reset-sort");
  const fieldsFirstSelect = document.getElementById("fieldsFirst");

  if (sortForm && buildings.length > 0) {
    setSortSelects(buildings[0], sortForm);
  }

  if (fieldsFirstSelect) {
    fieldsFirstSelect.addEventListener("change", function () {
      changeNextSelect("fieldsSecond", this);
    });
  }

  if (sortButton) {
    sortButton.addEventListener("click", function () {
      sortTable("buildings-table", sortForm);
    });
  }

  if (resetSortButton) {
    resetSortButton.addEventListener("click", function () {
      resetSortForm();
      clearTable("buildings-table");
      const tableContainer = document.getElementById(
        "buildings-table-container",
      );
      const table = createBuildingsTable(buildings, "buildings-table");
      tableContainer.appendChild(table);
    });
  }
});

function resetSortForm() {
  const sortForm = document.getElementById("sort-form");
  if (sortForm && buildings.length > 0) {
    setSortSelects(buildings[0], sortForm);
    document.getElementById("fieldsFirstDesc").checked = false;
    document.getElementById("fieldsSecondDesc").checked = false;
  }
}
