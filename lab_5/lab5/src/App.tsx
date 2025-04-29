import "./App.css";
import Table from "./components/Table";
import { buildings } from "./data";

const App = () => {
  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>
      <Table data={buildings} amountRows="10" />
    </div>
  );
};

export default App;
