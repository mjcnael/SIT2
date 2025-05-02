import "./App.css";
import Table from "./components/Table";
import { dists } from "./data";

const App = () => {
  return (
    <div className="App">
      <h3>Дистрибутивы Linux</h3>
      <Table data={dists} amountRows={15} />
    </div>
  );
};

export default App;
