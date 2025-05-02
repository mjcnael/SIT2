import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import { dists } from "./data";
import Chart from "./components/Chart";

const App = () => {
  const [filteredData, setFilteredData] = useState(dists);

  return (
    <div className="App">
      <h3>Дистрибутивы Linux</h3>
      <Chart data={filteredData} />
      <Table data={dists} amountRows={15} onDataFilter={setFilteredData} />
    </div>
  );
};

export default App;
