import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import { ActionFunction, dotGenerator } from "../../../../../utils";
import PopComponent from "../../../../../hoc/PopContent";
import CommonModal from "../../../../../hoc/CommonModal";
import TableCell from "@mui/material/TableCell";

const DeleteTermCondition = ({rowData, getDeleteTermConditionData}) => {
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const columns = [
        {
            id: 'termsAndCondition',
            label: 'Description',
            type: 'custom',
            render: (row) => {
                return  <TableCell >{dotGenerator(row?.termsAndCondition, handleOpenModal, 'Terms & Conditions Policy','isGamePlay') }</TableCell>
            }
        },
        ActionFunction('helpAndSupport',{
            id: 'Action',
            disablePadding: false,
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action ' onClick={(e) => handleOpenModal('AddDeleteUserAccountTermsCondition', { isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })
    ];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'AddDeleteUserAccountTermsCondition': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment' :{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    return(
        <>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'game_tab_overView head_to_head_gameTab'}>
                    <div className={'d_flex_between'}>
                        <h2>Terms & Conditions Policy</h2>
                        { ( !rowData?.termsAndCondition && Object?.keys(rowData || {})?.length <= 0) &&
                            <div className={'admin_user_list'}>
                                <button className={'btn'} onClick={(e) => handleOpenModal('AddDeleteUserAccountTermsCondition')}> + Add Terms & Conditions Policy</button>
                            </div>
                        }
                    </div>
                <CustomTable
                    headCells={columns}
                    rowData={Object?.keys(rowData || {})?.length > 0 ? [ rowData ] : []}
                    totalDocs={0}
                        isWinnerTitle={true}
                />
                </div>
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getDeleteTermConditionData} />
            </CommonModal>
        </>
    )
}
export default DeleteTermCondition