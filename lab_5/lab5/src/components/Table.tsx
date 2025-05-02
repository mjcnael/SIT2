import { useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Filter from "./Filter";

const Table = (props: { data: Record<string, any>[]; amountRows: number }) => {
  const [numPage, setNumPage] = useState(1);
  const [dataTable, setDataTable] = useState(props.data);

  const updateDataTable = (filteredData: any[]) => {
    setDataTable(filteredData);
    setNumPage(1);
  };

  const totalPages = Math.ceil(dataTable.length / props.amountRows);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <h4>Фильтры</h4>
      <Filter filtering={updateDataTable} fullData={props.data} />
      <table className="buildings-table">
        <TableHead head={Object.keys(props.data[0])} />
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
