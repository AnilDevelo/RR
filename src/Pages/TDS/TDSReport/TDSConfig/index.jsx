import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {ActionFunction, hideActionFunc} from "../../../../utils";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import {getWhatsAppSupportDetails} from "../../../../Redux/HelpAndSupport/action";
import {getTDSConfig} from "../../../../Redux/TDSReport/action";
import TableCell from "@mui/material/TableCell";

const TDSConfig = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false })
    let Modal = PopComponent[modalDetails?.modalName];

    const columns = [
        {
            id: 'tdsPercentage',
            label: 'TDS Percentage (%)',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell><span>{`${row?.tdsPercentage}%`}</span></TableCell>
            }
        },
        ActionFunction('tdsReport', {
            id: 'Action',
            disablePadding: false,
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('AddTDSConfigPopup', { isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })

        ]

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddTDSConfigPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(() => {
        getTDSConfigHandler();
    }, []);

    const getTDSConfigHandler = () => {
        setLoader(true);
        dispatch(getTDSConfig({})).then(res => {
            setLoader(false);
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: Object?.keys(res.data.data)?.length ? [res.data.data] : [],
                    totalDocs: 0
                })
            }
        });
    };

    return(
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                    <h2>TDS Config</h2>
                    {
                        (hideActionFunc('tdsReport') && rowData?.list?.length <= 0) &&
                        <button className={'btn'} onClick={() => handleOpenModal('AddTDSConfigPopup')}>+  Add TDS Config </button>
                    }

                </div>
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    isWinnerTitle={true}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getTDSConfigHandler} />
            </CommonModal>
        </Box>
    )
}
export default TDSConfig