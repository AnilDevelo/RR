import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";

const PositionsLeaderBoard = ({ rowData }) => {
    const [bonusPosition,setBonusPosition] =useState([])
    const columns = [
        {
            id:'position',
            label: 'Position',
        },
        {
            id:'bonusPosition',
            label: 'Bonus'
        }
    ];

    useEffect(()=>{
        let temp = []
        rowData?.bonusPositions?.forEach((ele,index)=>{
            temp.push({position:index +1 , bonusPosition:ele})
        })
        setBonusPosition(temp)
    },[rowData])

    return(
        <>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <h2>Number Of Top Player Position</h2>
                <CustomTable
                    headCells={columns}
                    rowData={bonusPosition}
                    totalDocs={0}
                    isAboutWebsite={true}
                />
            </Paper>
        </>
    )
}
export default PositionsLeaderBoard