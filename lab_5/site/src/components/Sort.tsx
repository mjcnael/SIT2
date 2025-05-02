import { useState } from "react";

const Sort = (props: {
  sorting: (value: any[]) => void;
  fullData: any[];
  columns: string[];
}) => {
  const [sortLevels, setSortLevels] = useState<
    { column: string; direction: "asc" | "desc" }[]
  >([
    { column: "", direction: "asc" },
    { column: "", direction: "asc" },
    { column: "", direction: "asc" },
  ]);

  const handleSort = () => {
    let sortedData = [...props.fullData];

    for (let i = sortLevels.length - 1; i >= 0; i--) {
      const level = sortLevels[i];
      if (level.column) {
        sortedData = sortedData.sort((a, b) => {
          const aValue = a[level.column];
          const bValue = b[level.column];

          if (!isNaN(aValue) && !isNaN(bValue)) {
            return level.direction === "asc"
              ? Number(aValue) - Number(bValue)
              : Number(bValue) - Number(aValue);
          }

          const aStr = String(aValue).toLowerCase();
          const bStr = String(bValue).toLowerCase();

          return level.direction === "asc"
            ? aStr.localeCompare(bStr)
            : bStr.localeCompare(aStr);
        });
      }
    }

    props.sorting(sortedData);
  };

  const handleLevelChange = (index: number, column: string) => {
    const newLevels = [...sortLevels];
    newLevels[index] = { ...newLevels[index], column };
    setSortLevels(newLevels);
  };

  const handleDirectionChange = (index: number) => {
    const newLevels = [...sortLevels];
    newLevels[index] = {
      ...newLevels[index],
      direction: newLevels[index].direction === "asc" ? "desc" : "asc",
    };
    setSortLevels(newLevels);
  };

  const handleReset = () => {
    setSortLevels([
      { column: "", direction: "asc" },
      { column: "", direction: "asc" },
      { column: "", direction: "asc" },
    ]);
    props.sorting(props.fullData);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h4>Сортировка</h4>
      {sortLevels.map((level, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <span>Уровень {index + 1}:</span>
          <select
            value={level.column}
            onChange={(e) => handleLevelChange(index, e.target.value)}
            style={{ margin: "0 10px" }}
          >
            <option value="">-- Не выбрано --</option>
            {props.columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
          {level.column && (
            <button
              onClick={() => handleDirectionChange(index)}
              style={{ marginLeft: "10px" }}
            >
              {level.direction === "asc" ? "↑ По возрастанию" : "↓ По убыванию"}
            </button>
          )}
        </div>
      ))}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleSort} style={{ marginRight: "10px" }}>
          Применить сортировку
        </button>
        <button onClick={handleReset}>Сбросить сортировку</button>
      </div>
    </div>
  );
};

export default Sort;
