import { Box, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import structures from "../data";

const Building = () => {
  const { id } = useParams();

  if (id === undefined) return;

  const structure = structures[Number(id)];

  return (
    <div>
      <NavBar active="" />
      <Typography
        variant="h5"
        sx={{
          justifyContent: "center",
          display: "flex",
          marginTop: 5,
        }}
      >
        {structure.title}
      </Typography>
      <div
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={structure.img}
          alt=""
          style={{
            width: "30%",
            height: "30%",
            objectFit: "cover",
          }}
        />
      </div>
      <Typography
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          justifyContent: "center",
          marginTop: 5,
          alignItems: "flex-start",
        }}
      >
        <Box>{structure.description[0]}</Box>
        <Box>{structure.description[1]}</Box>
      </Typography>{" "}
    </div>
  );
};

export default Building;
