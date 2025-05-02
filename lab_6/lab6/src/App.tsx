import { useState } from "react";
import "./App.css";
import Chart from "./components/Chart";
import Table from "./components/Table";
import { buildings } from "./data";

const App = () => {
  const [filteredData, setFilteredData] = useState(buildings);

  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>
      <Chart data={filteredData} />
      <Table data={buildings} amountRows={15} onDataFilter={setFilteredData} />
    </div>
  );
};

export default App;
