import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import { useDispatch } from "react-redux";
import { getDownloadWebsiteNumberList } from "../../../Redux/website/action";

const DownloadList = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 })

    let columns = [
        {
            id: 'mobileNumber',
            label: 'Mobile Number',
        }
    ];

    useEffect(() => {
        getDownloadWebsiteList();
    }, []);

    const getDownloadWebsiteList = () => {
        setLoader(true)
        dispatch(getDownloadWebsiteNumberList({})).then(res => {
            setLoader(false)
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
                    totalDocs: res.data.data.totalDocs
                });
            }
        });
    };

    return (
        <Box>
            {/* { loader ? <Loader /> : "" } */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    dragUpdater={''}
                    loading={loader}
                />

            </Paper>
        </Box>
    )
}
export default DownloadList