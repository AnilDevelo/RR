import React, {useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, dotGenerator} from "../../../../../utils";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import CommonModal from "../../../../../hoc/CommonModal";
import { useEffect } from "react";
import { getLoginScreenPrivacyPolicy } from "Redux/Design/action";

const LogoPrivacyPolicy = ({rowData, getLogoListDetails}) => {
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({PrivacyPolicy: ""})
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const columns = [
        {
            id: 'privacyPolicy',
            label: 'Description',
            type: 'custom',
            render: (row) => {
                return  <TableCell >{dotGenerator(formData?.PrivacyPolicy, handleOpenModal, 'Privacy Policy','isGamePlay') }</TableCell>
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
                    <span className='edit_btn edit-btn-action ' onClick={(e) => handleOpenModal('AddLogoPrivacyPolicy', { isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })
    ];
    useEffect(() => {
        getLoginScreenPrivacyPolicyFunction()
    }, [formData?.PrivacyPolicy]);
    const getLoginScreenPrivacyPolicyFunction = () => {
        dispatch(getLoginScreenPrivacyPolicy({})).then(res => {
            if (res.data.success) {
                setFormData({
                    ...formData,
                    PrivacyPolicy: res?.data?.data?.privacyPolicy
                });
            }
        })
    }
    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'AddLogoPrivacyPolicy': {
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
                        <h2>Privacy Policy</h2>
                        { ( !formData?.PrivacyPolicy && rowData?.list[0]?.docs?.length <= 0) &&
                        <div className={'admin_user_list'}>
                            <button className={'btn'} onClick={(e) => handleOpenModal('AddLogoPrivacyPolicy')}> + Add Terms & Conditions Policy</button>
                        </div>
                        }
                    </div>
                    <CustomTable
                        headCells={columns}
                        rowData={ [formData] }
                        totalDocs={0}
                        isWinnerTitle={true}
                    />
                </div>
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getLoginScreenPrivacyPolicyFunction} />
            </CommonModal>
        </>
    )
}

export default LogoPrivacyPolicy