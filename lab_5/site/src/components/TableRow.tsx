const TableRow = (props: { row: string[] | number[]; isHead?: boolean }) => {
  const cells = props.row.map((item, index) =>
    props.isHead ? <th key={index}>{item}</th> : <td key={index}>{item}</td>,
  );

  return <>{cells}</>;
};

export default TableRow;
