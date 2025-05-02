import { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Filter from "./Filter";

const Table = ({ data, amountRows, onDataFilter }) => {
  const [numPage, setNumPage] = useState(1);
  const [dataTable, setDataTable] = useState(data);

  const updateDataTable = (filteredData: any[]) => {
    setDataTable(filteredData);
    setNumPage(1);
    onDataFilter(filteredData);
  };

  const totalPages = Math.ceil(dataTable.length / amountRows);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <h4>Фильтры</h4>
      <Filter filtering={updateDataTable} fullData={data} />
      <table className="buildings-table">
        <TableHead head={Object.keys(data[0])} />
        <TableBody body={dataTable} amountRows={amountRows} numPage={numPage} />
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
