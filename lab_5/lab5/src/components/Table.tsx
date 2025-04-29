import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = (props) => {
  const n = Math.ceil(props.data.length / props.amountRows);

  const arr = Array.from({ length: n }, (v, i) => i + 1);

  const pages = arr.map((item, index) => <span key={index}> {item} </span>);

  return (
    <>
      <table>
        <TableHead head={Object.keys(props.data[0])} />
        <TableBody
          body={props.data}
          amountRows={props.amountRows}
          numPage="1"
        />
      </table>

      <div>{pages}</div>
    </>
  );
};

export default Table;
