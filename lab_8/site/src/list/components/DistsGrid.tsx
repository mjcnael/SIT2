import { dists } from "../table";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { ruRU } from "@mui/x-data-grid/locales";

function BuildingsGrid() {
  const rows: GridRowsProp = dists;

  const columns: GridColDef[] = [
    { field: "Дистрибутив", flex: 1 },
    { field: "Год", flex: 0.5 },
    { field: "Пользователи", flex: 0.5 },
    { field: "Загрузок в день", flex: 0.5 },
    { field: "Пакетный менеджер", flex: 0.5 },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: "700px", mt: "20px" }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        showToolbar
        slotProps={{
          pagination: {
            rowsPerPageOptions: [10, 20, 30, 100],
          },
        }}
      />
    </Container>
  );
}

export default BuildingsGrid;
