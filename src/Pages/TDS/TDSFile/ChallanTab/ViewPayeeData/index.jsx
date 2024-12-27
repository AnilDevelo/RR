import React, {useEffect, useState} from "react";
import PopComponent from "../../../../../hoc/PopContent";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, currencyFormat} from "../../../../../utils";
import {getViewUserBlockList} from "../../../../../Redux/user/action";
import Box from "@material-ui/core/Box";
import Loader from "../../../../../images/Loader";
import CustomTable from "../../../../../hoc/CommonTable";
import CommonModal from "../../../../../hoc/CommonModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
    bgcolor: 'white',
    boxShadow: 24,
    padding: '32px 0',
    borderRadius: "5px",
};

const ViewPayeeData = ({ modalValue, redirectApiHandler, handleOpenModal }) => {
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0
    });


    const columns = [

        {
            id: 'userName',
            label: 'Users Name',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.name}</TableCell>
            }
        },
        {
            id: 'pan',
            label: 'Pan Card Number',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{row?.pan}</TableCell>
            }
        },
        {
            id: 'credit_amount',
            label: 'Credit Amount',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell  >{currencyFormat(+row?.credit_amount)}</TableCell>
            }
        },
        {
            id: 'credit_amount',
            label: 'Tds Amount',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell  >{currencyFormat(+row?.tds_amount)}</TableCell>
            }
        }
    ];



    return (
            <Box sx={style} >
            {/* {loader ? <Loader /> : ""} */}
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            <div className={'modal_main_popup'}>
                <div className={'add_admin_user_popup_title modal_popup_title'}>
                    <h2>{modalValue?.userName} Payee Data</h2>
                </div>
            </div>
            <div className={'OverView_pagination'}>
                <CustomTable
                    headCells={columns}
                    rowData={modalValue?.payeeData}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    isWinnerTitle={true}
                    loading={loader}
                />
            </div>

        </Box>
    )
}
export default ViewPayeeData