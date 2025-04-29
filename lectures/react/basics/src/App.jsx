import "./App.css";
import CreateRange from "./components/CreateRange";
import ShowNotShow from "./components/ShowNotShow";

const App = () => {
  return (
    <div className="content">
      <ShowNotShow header="Header" paragraph="paragraph" />
      {/* <CreateRange firstValue="10" step="3" /> */}
    </div>
  );
};

export default App;
