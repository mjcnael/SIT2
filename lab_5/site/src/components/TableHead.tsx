import TableRow from "./TableRow";

const TableHead = (props: any) => {
  return (
    <thead>
      <tr>
        <TableRow row={props.head} isHead={true} />
      </tr>
    </thead>
  );
};

export default TableHead;
