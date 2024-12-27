import React, { useEffect, useState } from "react";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import { useDispatch } from "react-redux";
import {deleteWebSiteSocialMedia, getWebsiteSocialMedia} from "../../../Redux/website/action";
import user from "../../../assets/images/avatar.png";
import {ActionFunction, hideActionFunc} from "../../../utils";

const SocialLink = () => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false })
    let Modal = PopComponent[modalDetails?.modalName];
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

    let columns = [
        {
            id: 'webSiteSocialMediaIcon',
            label: 'Image',
            isDisbanding:true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'social_profile_img'}>
                    <img src={row?.socialIcon || user} alt={'profile'} />
                </TableCell>
            }

        },
        {
            id: 'link',
            label: 'Link',
        },
        ActionFunction( 'webSite',{
            id: 'action',
            label: 'Action',
            isDisbanding:true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddSocialMediaLinkPopup', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={()=> handleOpenModal('DeleteCommonModal', {deleteListApiHandler : deleteWebSiteSocialMedia({socialMediaId: row?._id}), title: 'Do you want to delete this data?'})}>
                        Delete
                    </span>
                </TableCell>
            }
        })
    ];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'AddSocialMediaLinkPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    useEffect(() => {
        getWebsiteSocialMediaHandler()
    }, [pagination.rowsPerPage, pagination.page]);

    const getWebsiteSocialMediaHandler = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        }
        setLoader(true)
        dispatch(getWebsiteSocialMedia(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res.data.data?.docs,
                    totalDocs: res.data.data?.totalDocs
                })
            }
        })
    };

    return (
        <>
            { loader ? <Loader /> : "" }
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('webSite') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={() => handleOpenModal('AddSocialMediaLinkPopup')}> + Add Social Media</button>
                    </div>
                }

                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    dragUpdater={''}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getWebsiteSocialMediaHandler} />
            </CommonModal>
        </>
    )
}
export default SocialLink