import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ mt: 5, py: 3, backgroundColor: "#f5f5f5", textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Все права защищены. Линукс.
      </Typography>
    </Box>
  );
}

export default Footer;
