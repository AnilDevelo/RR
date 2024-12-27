import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../hoc/PopContent";
import {genreDeleteCategory, getGenreList} from "../../../../Redux/games/GenreGame/action";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, hideActionFunc} from "../../../../utils";
import Box from "@mui/material/Box";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";

const GenreTypeListTab = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 })
    useEffect(() => {
        genreTypeList()
    }, [pagination.rowsPerPage, pagination.page])

    const genreTypeList = () => {
        // setLoader(true)
        let payload = {
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            limit: pagination.rowsPerPage,
        }
        // dispatch(getGenreList(payload)).then(res => {
        //     if (res.data?.success) {
        //         setLoader(false);
        //         setRowData({
        //             list: res?.data?.data?.docs,
        //             totalDocs: res?.data?.data?.totalDocs
        //         })
        //     } else {
        //         setLoader(false)
        //     }
        // })
    }

    const columns = [
        {
            id: 'id',
            label: 'Genre Type ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>
                    <span >{`GTID000${row?.numericId}`}</span>
                </TableCell>
            }
        },
        {
            id: 'genreName',
            label: 'Genre Type Name',
        },

        ActionFunction('master', {
            id: 'Action',
            disablePadding: false,
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' >Edit</span>
                    <span className='edit_btn edit-btn-action  prTab'>Delete</span>
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
            case 'AddGenreTypePopup': {
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

    const Data = [
        {
            numericId:1,
            genreName:'Game Mode'
        },
        {
            numericId:2,
            genreName:'Number of Players'
        },
        {
            numericId:3,
            genreName:'Number of Decks'
        },
        {
            numericId:4,
            genreName:'Number of Winners'
        },
        {
            numericId:5,
                genreName:'Time Limit'
        },
    ]

    return (
        <React.Fragment>
            <Box>
                {/* {loader ? <Loader /> : ""} */}
                <Paper sx={{ mb: 2 }} className="outer-box">
                    <div className={'game_tab_overView head_to_head_gameTab'}>
                        <div className={'game_tab_overView_title'}>
                            <h2>Genre Type</h2>
                            {
                                hideActionFunc('master') &&
                                <button className={'font-bold'} onClick={() => handleOpenModal('AddGenreTypePopup')}>+ Add New Genre Type</button>
                            }

                        </div>
                        <div className={'head_to_head_gameTab_table'}>
                            <CustomTable
                                headCells={columns}
                                rowData={Data}
                                totalDocs={rowData?.totalDocs}
                                pagination={pagination}
                                setPagination={setPagination}
                                loading={loader}
                            />
                        </div>
                    </div>
                </Paper>
                <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                    <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={genreTypeList} />
                </CommonModal>
            </Box>
        </React.Fragment>
    )
}
export default GenreTypeListTab