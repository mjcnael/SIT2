import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: "justify",
  marginBottom: theme.spacing(2),
}));

interface ComponentProps {
  dist: {
    img: string;
    title: string;
    description: string[];
  };
  index: number;
}

function DistCard({ dist, index }: ComponentProps) {
  const isEven = index % 2 === 0;

  return (
    <Card
      sx={{ display: "flex", flexDirection: isEven ? "row-reverse" : "row" }}
    >
      <CardMedia
        component="img"
        alt={dist.title}
        image={dist.img}
        sx={{ width: "50%", objectFit: "cover" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "50%",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5">
            {dist.title}
          </Typography>
          {dist.description.map((item, ind) => (
            <StyledTypography key={ind} variant="body2">
              {item}
            </StyledTypography>
          ))}
        </CardContent>
        <CardActions
          sx={{ justifyContent: isEven ? "end" : "start", px: 2, pb: 2 }}
        >
          <Link to={`/dist/${index}`}>
            <Button size="small">Подробнее</Button>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
}

export default DistCard;
