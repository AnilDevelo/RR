import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import PopComponent from "../../../../hoc/PopContent";
import {genreDeleteCategory, getGenreList} from "../../../../Redux/games/GenreGame/action";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, hideActionFunc} from "../../../../utils";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";

const GenreListTab = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 })
    useEffect(() => {
        genreList()
    }, [pagination.rowsPerPage, pagination.page])

    const genreList = () => {
        setLoader(true)
        let payload = {
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            limit: pagination.rowsPerPage,
        }
        dispatch(getGenreList(payload)).then(res => {
            if (res.data?.success) {
                setLoader(false);
                setRowData({
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
                })
            } else {
                setLoader(false)
            }
        })
    }

    const columns = [

        {
            id: 'genreName',
            label: 'Genre Category Name',
        },
        {
            id: '',
            label: 'Genre Type',
        },

        ActionFunction('master', {
            id: 'Action',
            disablePadding: false,
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    {
                        row?.isEditable &&
                        <>
                            <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddGenrePopup', { row, isEdit: true })}>Edit</span>
                            <span className='edit_btn edit-btn-action  prTab'
                                  onClick={() => handleOpenModal('DeleteCommonModal',
                                      { deleteListApiHandler: genreDeleteCategory({ genreId: row?._id, isEditable: false }), title: 'Do you want to delete the category?' })}>
                                Delete
                            </span>
                        </>
                    }
                    {/*{*/}
                    {/*    row?.genreStatus === 'Active' ?*/}
                    {/*        <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('ActiveDeactivateCategory', { genreId: row?._id, genreStatus: 'Deactive' })}>Deactivate</span>*/}
                    {/*        :*/}
                    {/*        <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('ActiveDeactivateCategory', { genreId: row?._id, genreStatus: 'Active' })}>activate</span>*/}
                    {/*}*/}

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
            case 'AddGenrePopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ActiveDeactivateCategory': {
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

    return (
        <React.Fragment>
            <Box>
                {/* {loader ? <Loader /> : ""} */}
                <Paper sx={{ mb: 2 }} className="outer-box">
                    <div className={'game_tab_overView head_to_head_gameTab'}>
                        <div className={'game_tab_overView_title'}>
                            <h2>Genre</h2>
                            {
                                hideActionFunc('master') &&
                                <button className={'font-bold'} onClick={() => handleOpenModal('AddGenrePopup')}>+ Add New Genre</button>
                            }

                        </div>
                        <div className={'head_to_head_gameTab_table'}>
                            <CustomTable
                                headCells={columns}
                                rowData={rowData?.list}
                                totalDocs={rowData?.totalDocs}
                                pagination={pagination}
                                setPagination={setPagination}
                                loading={loader}
                            />
                        </div>
                    </div>
                </Paper>
                <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                    <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={genreList} />
                </CommonModal>
            </Box>
        </React.Fragment>
    )
}
export default GenreListTab