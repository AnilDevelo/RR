import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import {ActionFunction, hideActionFunc} from "../../../utils";
import CustomTable from "../../../hoc/CommonTable";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import TableCell from "@mui/material/TableCell";
import PopComponent from "../../../hoc/PopContent";
import CommonModal from "../../../hoc/CommonModal";
import {getTicketsVideoDetails} from "../../../Redux/HelpAndSupport/action";
import user from "../../../assets/images/avatar.png";
import VideoAndImage from "./VideoAndImage";

const TicketsVideoTab = () => {
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState([]);
    const [loader, setLoader] = useState(false);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    useEffect(() => {
        getTicketsVideo()
    }, []);

    const getTicketsVideo = () => {
        setLoader(true);
        dispatch(getTicketsVideoDetails({ })).then(res => {
            setLoader(false);
            if (res?.data?.success) {
                setRowData({
                    ...rowData,
                    list: Object?.keys(res.data.data || {})?.length ? [res.data.data] : [],
                    totalDocs: 0
                })
            } else {
                setRowData({
                    ...rowData,
                    list: [],
                })
            }
        })
    }

    const columns = [
        {
            id: 'ticketVideo',
            label: 'Ticket Image',
            type: 'custom',
            render: (row) => {

                //ViewVideoImage
                return  <TableCell > {row?.isImage ? <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('ViewHowToPlayPopup', row)}>View</span> : '' }  </TableCell>
            }
            // type: 'custom',
            // render: (row) => {
            //     return <TableCell className={'game_icon_img'}>
            //         {
            //             row?.isImage ?
            //                 <img src={row?.ticketVideoImage || user} alt={'images'}/>
            //                 :"-"
            //         }
            //
            //     </TableCell>
            // }
        },
        {
            id: 'ticketVideo',
            label: 'video',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    {
                        !row?.isImage ?
                            <span className={'edit_btn edit-btn-action'} onClick={()=> handleOpenModal('ViewVideoImage', row)}>View</span>
                            :"_"
                    }
                </TableCell>
            }
        },
        ActionFunction('helpAndSupport', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddTicketsVideo', {  isEdit: true, row })}>Edit</span>
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
            case 'AddTicketsVideo': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewVideoImage':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewHowToPlayPopup':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    return (
        <>
          <VideoAndImage/>  
        </>
        // <React.Fragment>
        //     {loader ? <Loader /> : ""}
        //     <Paper sx={{ mb: 2 }} className="outer-box">
        //         {
        //             ( hideActionFunc('helpAndSupport') && rowData?.list?.length === 0) &&
        //             <div className={'d_flex_end'}>
        //                 <button className={'btn'} onClick={(e) => handleOpenModal('AddTicketsVideo')}> + Add Help Desk Header Image/Video Button</button>
        //             </div>
        //         }

        //         <CustomTable
        //             headCells={columns}
        //             rowData={rowData?.list}
        //             totalDocs={rowData?.totalDocs}
        //             pagination={pagination}
        //             setPagination={setPagination}
        //             isWinnerTitle={true}
        //         />
        //     </Paper>
        //     <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
        //         <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getTicketsVideo} />
        //     </CommonModal>
        // </React.Fragment>
    )
}
export default TicketsVideoTab