import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const TableContent = ({
  rowData,
  stableSort,
  getComparator,
  headCells,
  order,
  orderBy,
}) => {
  return (
    <>
      {rowData?.length ? (
        stableSort(rowData, getComparator(order, orderBy)).map(
          (_data, dataIndex) => {
            return (
              <>
                <TableRow
                  className={"table_body"}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={_data.name}
                >
                  {headCells?.map((col, i) => {
                    switch (col.type) {
                      case "custom": {
                        return col.render(_data, dataIndex);
                      }
                      case "action": {
                        return col.ActionContent(_data);
                      }
                      case "hide": {
                        return <TableCell className={"hide_table_td"} />;
                       }
                       default: {
                        return <TableCell>{_data[col?.id]}</TableCell>;
                       }
                    }
                  })}
                </TableRow>
              </>
            );
          }
        )
      ) : (
        <TableRow hover role="checkbox" tabIndex={-1} className={"table_row"}>
          <TableCell
            colSpan={headCells?.length}
            className={"data_notFound_box"}
          >
            No Data Found
          </TableCell>{" "}
        </TableRow>
      )}
    </>
  );
};

export default TableContent;
