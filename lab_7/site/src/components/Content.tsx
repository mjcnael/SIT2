import Container from "@mui/material/Container";
import dists from "../data";
import { Grid } from "@mui/material";
import BuildCard from "./BuildCard";

function Content() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={{ xs: 3, md: 6 }}>
        {dists.map((item, index) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <BuildCard building={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Content;
