import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { getWhatsAppSupportDetails} from "../../../Redux/HelpAndSupport/action";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {ActionFunction, hideActionFunc} from "../../../utils";

const WhatsAppSupportTab = ()=>{
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [rowData, setRowData] = useState({ list: []});
    let Modal = PopComponent[modalDetails.modalName];

    const columns = [
        {
            id: 'phoneNumber',
            label: 'Phone Number',
        },
        ActionFunction('helpAndSupport', {
            id: 'Action',
            disablePadding: false,
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('AddWhatsAppMobileNumberPopup', { isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })
    ];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddWhatsAppMobileNumberPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(() => {
        getWhatsAppSupportHandler();
    }, []);

    const getWhatsAppSupportHandler = () => {
        setLoader(true);
        dispatch(getWhatsAppSupportDetails({})).then(res => {
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

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    (hideActionFunc('helpAndSupport') && rowData?.list?.length <= 0) &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddWhatsAppMobileNumberPopup')}> + Add WhatsApp Number</button>
                    </div>
                }
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    isWinnerTitle={true}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getWhatsAppSupportHandler} />
            </CommonModal>
        </Box>
    )
}
export default WhatsAppSupportTab