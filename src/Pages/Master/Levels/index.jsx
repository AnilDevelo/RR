import React, {useEffect, useState} from "react";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import Box from "@mui/material/Box";
import PopComponent from "../../../hoc/PopContent";
import { useDispatch } from "react-redux";
import TableCell from "@mui/material/TableCell";
import {deleteLevelsList, getLevelsList} from "../../../Redux/Master/action";
import user from "../../../assets/images/avatar.png";
import {ActionFunction, hideActionFunc} from "../../../utils";
import {genreDeleteCategory} from "../../../Redux/games/GenreGame/action";

const Levels = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData,setRowData] = useState({list:[], totalDocs:0});
    let Modal = PopComponent[modalDetails.modalName];

    const columns = [
        {
            id: 'levelIcon',
            label: ' Icon',
            isDisbanding:true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'game_icon_img'}>
                    <img src={row?.levelIcon || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'levelName',
            label: 'Level Name',
        },
        {
            id: 'winAmountCounter',
            label: 'Win Amount Counter',
        },
        ActionFunction( 'master',{
            id: 'Action',
            disablePadding: false,
            isDisbanding:true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddLevelsPopup',{isEdit:true,row})}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={()=> handleOpenModal('DeleteCommonModal',
                              {deleteListApiHandler : deleteLevelsList({levelId:row?._id}), title: 'Do you want to delete this data?'})}>
                        Delete
                    </span>
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
            case 'AddLevelsPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(()=>{
        getLevelDetails();
    },[pagination.rowsPerPage, pagination.page]);

    const getLevelDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getLevelsList(payload)).then(res=>{
            setLoader(false)
            setRowData({
                ...rowData,
                list:res.data.data.docs,
                totalDocs: res.data.data.totalDocs
            })
        });
    };

    return (
        <Box>
            {/* { loader ? <Loader /> : "" } */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('master') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn font-bold'} onClick={(e) => handleOpenModal('AddLevelsPopup')}> + Add Level</button>
                    </div>
                }

                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getLevelDetails} />
            </CommonModal>
        </Box>
    )
}
export default Levels;