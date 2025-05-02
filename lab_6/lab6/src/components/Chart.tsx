import * as d3 from "d3";
import { useState } from "react";
import ChartDraw from "./ChartDraw";

const Chart = (props) => {
  const [ox, setOx] = useState("Страна");
  const [oy, setOy] = useState([true, false]);
  const [chartType, setChartType] = useState("scatter");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedOx = event.target["ox"].value;
    const selectedOy = [
      event.target["oy"][0].checked,
      event.target["oy"][1].checked,
    ];

    const selectedChartType = event.target["chartType"].value;

    // Проверка выбора OY
    if (!selectedOy[0] && !selectedOy[1]) {
      setError("Выберите хотя бы одну метрику по оси OY.");
      return;
    }

    setError("");
    setOx(selectedOx);
    setOy(selectedOy);
    setChartType(selectedChartType);
    setData(createArrGraph(props.data, selectedOx));
  };

  const createArrGraph = (data, key) => {
    const groupObj = d3.group(data, (d) => d[key]);
    let arrGraph = [];

    for (let [groupName, groupItems] of groupObj) {
      let max = d3.max(groupItems, (d) => d["Высота"]);
      let min = d3.min(groupItems, (d) => d["Мин"] ?? d["Высота"]);
      arrGraph.push({ labelX: groupName, values: [max, min] });
    }

    if (key === "Год") {
      arrGraph.sort((a, b) => +a.labelX - +b.labelX);
    }

    return arrGraph;
  };

  return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={handleSubmit}>
        <p> Значение по оси OX: </p>
        <div>
          <input type="radio" name="ox" value="Страна" defaultChecked />
          Страна <br />
          <input type="radio" name="ox" value="Год" />
          Год
        </div>

        <p> Значение по оси OY </p>
        <div>
          <input type="checkbox" name="oy" defaultChecked />
          Максимальная высота <br />
          <input type="checkbox" name="oy" />
          Минимальная высота
        </div>

        <p>Тип диаграммы</p>
        <select name="chartType">
          <option value="scatter">Точечная диаграмма</option>
          <option value="bar">Гистограмма</option>
        </select>

        <p>
          <button type="submit">Построить</button>
        </p>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data.length > 0 && (
        <ChartDraw data={data} oy={oy} chartType={chartType} />
      )}
    </>
  );
};

export default Chart;
