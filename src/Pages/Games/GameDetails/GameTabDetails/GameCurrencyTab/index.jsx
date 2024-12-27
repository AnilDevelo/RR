import React, { useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import { ActionFunction } from "../../../../../utils";

const GameCurrencyTab = ({ handleOpenModal }) => {
    const [loader, setLoader] = useState(false);
    const columns = [
        {
            id: 'currency',
            label: 'Currency',
        },
        // ActionFunction( 'game',{
        //     id: 'Action',
        //     disablePadding: false,
        //     label: 'Action',
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell >
        //             <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('UpdateGameCurrency', row)}>Edit</span>
        //         </TableCell>
        //     }
        // })
    ]
    const Data = [
        {
            currency: 'India'
        }
    ]
    return (
        <React.Fragment>
            <Box>
                {/* {loader ? <Loader /> : ""} */}
                <Paper sx={{ mb: 2 }} className="outer-box">
                    <div className={'game_tab_overView_title'}>
                        <h2>Game Currency</h2>
                    </div>
                    <div className={'head_to_head_gameTab_table'}>
                        <CustomTable
                            headCells={columns}
                            rowData={Data}
                            totalDocs={0}
                            isCurrency={true}
                            loading={loader}
                        />
                    </div>
                </Paper>
            </Box>
        </React.Fragment>
    )
}
export default GameCurrencyTab