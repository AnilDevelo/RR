import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import CommonModal from "../../../../../hoc/CommonModal";
import React, {useState} from "react";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, currencyFormat} from "../../../../../utils";

const DailyBonusMaxAmount = ({handleOpenModal}) => {
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0, bonusType:'' });
    const columns =[
        {
            id:'maxMonthlyBonusLimit',
            label:'Bonus Amount',
            // type: 'custom',
            // render: (row) => {
            //     return <TableCell >{currencyFormat(+row?.maxMonthlyBonusLimit)}</TableCell>
            // }
        }
    ]
    return(
        <Paper sx={{ mb: 0 }} className="outer-box monthly-bonus-amount">

            <div className={'d_flex_between'}>
                <h2>Leaderbord Bonus Amount</h2>
                {/*{*/}
                {/*    Object.keys(rowData?.list || {})?.length <= 0 &&*/}
                {/*    <button className={'btn'} onClick={()=>handleOpenModal('AddDailyWheelBonusConfig')}> + Add Monthly Bonus Amount</button>*/}
                {/*}*/}
            </div>

            <CustomTable
                headCells={columns}
                rowData={Object.keys(rowData?.list || {})?.length > 0 ? [rowData?.list] : []}
                totalDocs={0}
                isAboutWebsite={true}
            />
        </Paper>
    )
}
export default DailyBonusMaxAmount