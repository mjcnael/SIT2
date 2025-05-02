import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tGroup } from "../groupdata";
import { Container } from "@mui/material";
import { ruRU } from "@mui/x-data-grid/locales";

type GroupProps = {
  data: tGroup;
};

function GroupGrid({ data }: GroupProps) {
  const columns: GridColDef[] = [
    { field: "Дистрибутив", headerName: "Дистрибутив", flex: 1 },
    {
      field: "Год выпуска",
      headerName: "Год выпуска",
      flex: 0.5,
      type: "number",
    },
    {
      field: "Активность",
      headerName: "Активность",
      flex: 0.5,
      type: "number",
    },
    { field: "Рейтинг", headerName: "Рейтинг", flex: 0.5, type: "number" },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: "700px", mt: "20px" }}>
      <DataGrid
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={data}
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

export default GroupGrid;
