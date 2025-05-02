import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

type tSeries = {
  "Год выпуска": boolean;
  Активность: boolean;
  Рейтинг: boolean;
};

type CheckboxProps = {
  series: tSeries;
  setSeries: React.Dispatch<React.SetStateAction<tSeries>>;
  isBar: boolean;
  setIsBar: React.Dispatch<React.SetStateAction<boolean>>;
};

function SettingChart({ isBar, setIsBar, series, setSeries }: CheckboxProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries({
      ...series,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{ m: "20px 0" }}
    >
      <FormControl>
        <FormLabel id="label-radio-group">Тип диаграммы:</FormLabel>
        <RadioGroup
          row
          name="group-radio"
          value={isBar ? "bar" : "line"}
          onChange={(e) => setIsBar(e.target.value === "bar")}
        >
          <FormControlLabel
            value="bar"
            control={<Radio />}
            label="Гистограмма"
          />
          <FormControlLabel value="line" control={<Radio />} label="Линейная" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="label-checkbox-group">Показать метрики:</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={series["Год выпуска"]}
              onChange={handleChange}
              name="Год выпуска"
            />
          }
          label="Год выпуска"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={series["Активность"]}
              onChange={handleChange}
              name="Активность"
            />
          }
          label="Активность"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={series["Рейтинг"]}
              onChange={handleChange}
              name="Рейтинг"
            />
          }
          label="Рейтинг"
        />
      </FormControl>
    </Stack>
  );
}

export default SettingChart;
