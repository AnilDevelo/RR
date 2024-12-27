import React, {useEffect, useState} from "react";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, dotGenerator} from "../../../../utils";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import {deleteReferAndEarnShare, getReferAndEarnShare} from "../../../../Redux/Bonus/action";
import {useDispatch} from "react-redux";
import user from "../../../../assets/images/avatar.png";
import {deleteAvatarData} from "../../../../Redux/Avatar/action";


const ReferAndEarnShareConfig = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [rowData,setRowData] = useState([])
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const columns = [
        {
            id: 'icon',
            label: 'Banner',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    {
                        row?.referAndEarnShareImage &&
                        <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('DocumentOpenPopup', { front: row?.referAndEarnShareImage, back: '' })}>View</span>
                    }

                </TableCell>
            }
        },
        {
            id: 'description',
            label: 'Description',
            type: 'custom',
            render: (row) => {
                return  <TableCell >{dotGenerator(row?.description, handleOpenModal, 'Description','isGamePlay') }</TableCell>
            }
        },
        {
            id: '',
            label: 'Refer Link',
            type: 'custom',
            render: (row) => {
                return  <TableCell >{row?.referLink}</TableCell>
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
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddReferAndEarnShareConfig', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('DeleteCommonModal',
                        { deleteListApiHandler: deleteReferAndEarnShare({ }), title: 'Do you want to delete this data?' })}>Delete</span>
                </TableCell>
            }
        })
    ];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'AddReferAndEarnShareConfig': {
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
            case 'DocumentOpenPopup':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal' :{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };


    useEffect(() => {
        getReferAndEarnShareConfigList();
    }, []);

    const getReferAndEarnShareConfigList = () => {
        setLoader(true);
        dispatch(getReferAndEarnShare({})).then(res => {
            setLoader(false)
            if (res.data.success) {
                if (Object?.keys(res.data.data || {})?.length > 0) {
                    setRowData([res.data?.data])
                } else {
                    setRowData([])
                }
            } else {
                setRowData([])
            }
        })
    };

    return(
        <>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'game_tab_overView head_to_head_gameTab'}>
                    <div className={'d_flex_between'}>
                        <h2>Refer & Earn Share Config</h2>
                        { ( !rowData?.termsAndCondition && Object?.keys(rowData || {})?.length <= 0) &&
                        <div className={'admin_user_list'}>
                            <button className={'btn'} onClick={(e) => handleOpenModal('AddReferAndEarnShareConfig')}> + Add Refer & Earn Share Config</button>
                        </div>
                        }
                    </div>
                    <CustomTable
                        headCells={columns}
                        rowData={rowData}
                        totalDocs={0}
                        isWinnerTitle={true}
                        loading={loader}
                    />
                </div>
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getReferAndEarnShareConfigList} />
            </CommonModal>
        </>
    )
};

export default ReferAndEarnShareConfig;