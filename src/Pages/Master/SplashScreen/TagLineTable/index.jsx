import React from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, dotGenerator} from "../../../../utils";

const TagLineTable = ({handleOpenModal, rowData}) => {
    const columns = [
        {
            id: '',
            label: 'TagLine',
            type: 'custom',
            render: (row) => {
                return <TableCell>{dotGenerator(row?.tagLine, handleOpenModal, 'TagLine')}</TableCell>
            }

        },
        ActionFunction('master', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddTagLineSplashScreen', {  isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })
    ];
    return(
        <>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <h2>Splash Screen TagLine</h2>
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={0}
                    isWinnerTitle={true}
                />
            </Paper>
        </>
    )
}
export default TagLineTable