import { useState } from "react";
import Container from "@mui/material/Container";
import { tGroup } from "../groupdata";
import SettingChart from "./SettingChart";
import { axisClasses, BarChart, LineChart } from "@mui/x-charts";

type GroupProps = {
  data: tGroup;
};

function GroupChart({ data }: GroupProps) {
  const [series, setSeries] = useState({
    "Год выпуска": true,
    Активность: false,
    Рейтинг: false,
  });

  const [isBar, setIsBar] = useState(true);

  let seriesY = Object.entries(series)
    .filter((item) => item[1] == true)
    .map((item) => {
      return { dataKey: item[0], label: item[0] };
    });

  const chartSetting = {
    yAxis: [
      {
        label: "Значение",
      },
    ],
    height: 500,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-10px, 0)",
      },
    },
  };

  return (
    <Container maxWidth="lg">
      {isBar ? (
        <BarChart
          dataset={data}
          barLabel={seriesY.length === 1 ? "value" : undefined}
          xAxis={[{ scaleType: "band", dataKey: "Дистрибутив" }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: "bottom", horizontal: "center" },
            },
          }}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: "band", dataKey: "Дистрибутив" }]}
          series={seriesY}
          slotProps={{
            legend: {
              position: { vertical: "bottom", horizontal: "center" },
            },
          }}
          {...chartSetting}
        />
      )}
      <SettingChart
        series={series}
        setSeries={setSeries}
        isBar={isBar}
        setIsBar={setIsBar}
      />
    </Container>
  );
}

export default GroupChart;
