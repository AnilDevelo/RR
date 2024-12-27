import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import {ActionFunction, hideActionFunc} from "../../../utils";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import {useDispatch} from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import {
    deleteGameModeDesignList,
    geGameModeDesign,
} from "../../../Redux/Master/action";
import TableCell from "@mui/material/TableCell";
import user from "../../../assets/images/avatar.png";

const GameModeDesignConfig = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddGameModeDesignConfig':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };
    const columns = [
        {id:"designNameImage",
            label:'Design Name Image',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell >
                    <img src={row?.designNameImage || user} alt={''} />
                </TableCell>
            }
        },
        {
            id:'designName',
            label:'Design Name'
        },
        ActionFunction('master', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    {
                        row?.isEditable ?
                       <>
                           <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddGameModeDesignConfig', { isEdit: true, row })}>Edit</span>
                           <span className='edit_btn edit-btn-action prTab'
                                 onClick={() => handleOpenModal('DeleteCommonModal',
                                     { deleteListApiHandler: deleteGameModeDesignList({ gameModeDesignId: row?._id }), title: 'Do you want to delete this data?' })}>
                        Delete
                        </span>
                       </>
                        :'-'
                    }

                </TableCell>
            }
        })
    ]

    useEffect(() => {
        getGameModeDetails();
    }, [])

    const getGameModeDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(geGameModeDesign(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data,
                totalDocs: res?.data?.data?.totalDocs || 0
            })
        });
    };

    return(
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('master') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddGameModeDesignConfig')}> + Create Game Mode Design</button>
                    </div>
                }

                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs}
                    pagination={pagination}
                    setPagination={setPagination}
                    isWinnerTitle={true}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getGameModeDetails} />
            </CommonModal>
        </Box>
    )
}
export default GameModeDesignConfig