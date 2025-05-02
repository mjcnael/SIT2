import { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Filter from "./Filter";
import Sort from "./Sort";

type SortDirection = "asc" | "desc" | "none";
type SortConfig = {
  key: string;
  direction: SortDirection;
};

const Table = (props: { data: Record<string, any>[]; amountRows: number }) => {
  const [numPage, setNumPage] = useState(1);
  const [dataTable, setDataTable] = useState(props.data);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const updateDataTable = (filteredData: any[]) => {
    setDataTable(filteredData);
    setNumPage(1);
    setSortConfig(null);
  };

  const updateSortedData = (sortedData: any[]) => {
    setDataTable(sortedData);
    setNumPage(1);
  };

  const handleSort = (key: string) => {
    let direction: SortDirection = "asc";

    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = "none";
      }
    }

    setSortConfig(direction === "none" ? null : { key, direction });

    if (direction === "none") {
      setDataTable(props.data);
    } else {
      const sortedData = [...dataTable].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setDataTable(sortedData);
    }

    setNumPage(1);
  };

  const totalPages = Math.ceil(dataTable.length / props.amountRows);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <h4>Фильтры</h4>
      <Filter filtering={updateDataTable} fullData={props.data} />
      <Sort
        sorting={updateSortedData}
        fullData={dataTable}
        columns={Object.keys(props.data[0])}
      />
      <table className="dists-table">
        <TableHead
          head={Object.keys(props.data[0])}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
        <TableBody
          body={dataTable}
          amountRows={props.amountRows}
          numPage={numPage}
        />
      </table>

      <div style={{ marginTop: "10px" }}>
        {pages.map((item) => (
          <span
            key={item}
            onClick={() => setNumPage(item)}
            style={{
              color: numPage === item ? "blue" : "black",
              fontWeight: numPage === item ? "bold" : "normal",
              display: "inline-flex",
              cursor: "pointer",
              userSelect: "none",
              fontSize: 20,
              margin: 6,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </>
  );
};

export default Table;
