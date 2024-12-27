import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import TableCell from "@material-ui/core/TableCell";
import {ActionFunction} from "../../../../utils";
import {Box} from "@mui/material";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import {getUserOldPhoneNumber} from "../../../../Redux/user/action";
import Loader from "../../../../images/Loader";
import moment from "moment";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    padding: '32px 0',
    borderRadius: "5px",
};
const ViewOldUserMobileNumber = ({ modalValue, handleOpenModal}) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = React.useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0, startRange: '' , endRange: '' });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

    useEffect(()=>{
        setLoader(true)
        let payload = {
            limit: pagination?.endRange ?  pagination?.endRange : pagination.rowsPerPage  ,
            start: +pagination?.startRange ? +pagination?.startRange :   ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            userId: modalValue?.userId?._id
        }
        dispatch(getUserOldPhoneNumber(payload)).then((res)=>{
            setLoader(false)
            if(res?.data?.success){
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs || 0
                })
            }
        })
    },[modalValue,pagination])

    const columns = [
        {
            id: 'updatedAt',
            label: 'Approved Date & Time',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment.utc(row?.updatedAt).local().format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        {
            id:'oldPhoneNumber',
            label:'Old Phone Number',
        }
    ];

    return(
        <Box sx={style} >
            {/* {loader && <Loader />} */}
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            <div className={'OverView_pagination'}>
            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs}
                pagination={pagination}
                setPagination={setPagination}
                loading={loader}
            />
            </div>
        </Box>
    )
}
export default ViewOldUserMobileNumber