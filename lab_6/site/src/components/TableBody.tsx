import TableRow from "./TableRow";

const TableBody = (props: {
  body: Record<string, any>[];
  amountRows: number;
  numPage: number;
}) => {
  const startIndex = (props.numPage - 1) * props.amountRows;
  const visibleRows = props.body.slice(
    startIndex,
    startIndex + props.amountRows,
  );

  return (
    <tbody>
      {visibleRows.map((row, idx) => (
        <tr key={idx}>
          <TableRow row={Object.values(row)} />
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
