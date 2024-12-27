import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../../hoc/CommonTable";

const SingleTournament = ({ handleOpenModal }) => {
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const columns = [
        {
            id: 'id',
            label: 'Template ID',
        },
        {
            id: 'tournamentName',
            label: 'Tournament Name',
        },
        {
            id: 'startTime',
            label: 'Start Time',
        },
        {
            id: 'endTime',
            label: 'End Time',
        },
        {
            id: 'entryFee',
            label: 'Entry Fee',
        },
    ];
    return (
        <>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'game_tab_overView head_to_head_gameTab'}>
                    <div className={'game_tab_overView_title'}>
                        <h2>Single Tournament Templates</h2>
                        <button onClick={() => handleOpenModal('CreateRecurringTournament')}>Create Single Tournament</button>
                    </div>
                    <div className={'head_to_head_gameTab_table'}>
                        <CustomTable
                            headCells={columns}
                            rowData={[]}
                            totalDocs={0}
                            pagination={pagination}
                            setPagination={setPagination}
                        />
                    </div>
                </div>
            </Paper>
        </>
    )
}
export default SingleTournament