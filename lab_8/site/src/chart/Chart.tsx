import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import NavBar from "../components/NavBar";
import GroupGrid from "./components/GroupGrid";
import { year, dists, type } from "./groupdata";
import GroupChart from "./components/GroupChart";

type tSelect = "Дистрибутив" | "Год" | "Тип";

const Chart = () => {
  const [group, setGroup] = useState<tSelect>("Дистрибутив");
  const [groupData, setGroupData] = useState(dists);

  const handleChange = (event: SelectChangeEvent) => {
    setGroup(event.target.value as tSelect);

    switch (event.target.value as tSelect) {
      case "Дистрибутив":
        setGroupData(dists);
        break;
      case "Год":
        setGroupData(year);
        break;
      case "Тип":
        setGroupData(type);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <NavBar active="3" />
      <Box sx={{ width: "200px", m: "auto", marginTop: 3 }}>
        <FormControl fullWidth>
          <InputLabel> Группировать по </InputLabel>
          <Select
            id="select-group"
            value={group}
            label="Группировать по"
            onChange={handleChange}
          >
            <MenuItem value="Дистрибутив"> Дистрибутив </MenuItem>
            <MenuItem value="Год"> Году </MenuItem>
            <MenuItem value="Тип"> Типу </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <GroupChart data={groupData} />
      <GroupGrid data={groupData} />
    </>
  );
};

export default Chart;
