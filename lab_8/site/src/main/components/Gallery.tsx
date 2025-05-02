import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { dists } from "../../data";
import { Box, Container, ImageListItemBar } from "@mui/material";
import { Link } from "react-router-dom";

const imgData = dists.slice(0, -1);

function Gallery() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          width: "auto",
          height: "auto",
          overflowY: "scroll",
          m: "20px auto",
        }}
      >
        <ImageList
          variant="masonry"
          sx={{
            columnCount: {
              xs: "1 !important",
              sm: "2 !important",
              md: "3 !important",
              lg: "4 !important",
            },
          }}
          gap={8}
        >
          {imgData.map((item, index) => (
            <Link to={`/dist/${index}`}>
              <ImageListItem key={item.img}>
                <img
                  srcSet={item.img}
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar position="bottom" title={item.title} />
              </ImageListItem>
            </Link>
          ))}
        </ImageList>
      </Box>
    </Container>
  );
}
export default Gallery;
