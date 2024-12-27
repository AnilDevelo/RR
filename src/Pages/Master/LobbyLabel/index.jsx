import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import user from "../../../assets/images/avatar.png";
import { deleteLobbyLabelList, getLobbyLabelList } from "../../../Redux/Master/action";
import { ActionFunction, dotGenerator, hideActionFunc } from "../../../utils";

const LobbyLabel = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [lobbyType,setLobbyType] = useState(['BATTLE','CONTEST','PRACTICE BATTLE', 'PRACTICE CONTEST', 'POINT VALUE'])
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddLobbyLabel': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    const columns = [
        {
            id: 'Icon',
            label: ' Icon',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.lobbyTypeIcon || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'lobbyType',
            label: 'Title',
        },

        {
            id: 'description',
            isDisbanding: true,
            label: 'Description',
            twoLineText: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.description ? dotGenerator(row?.description, handleOpenModal, 'Lobby Type Description') : ''}</TableCell>
            }
        },
        {
            id: 'type',
            label: 'Type',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.type === 'HeadToHead' ? 'BATTLE (One Vs One) ' : row?.type === 'Contest' ? 'CONTEST (One vs Many) ' : ''}</TableCell>
            }
        },
        ActionFunction('master', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddLobbyLabel', { isEdit: true, row, lobby:['BATTLE','CONTEST','PRACTICE BATTLE', 'PRACTICE CONTEST', 'POINT VALUE'] })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                        onClick={() => handleOpenModal('DeleteCommonModal',
                            { deleteListApiHandler: deleteLobbyLabelList({ lobbyTypeId: row?._id }), title: 'Do you want to delete this data?' })}>
                        Delete
                    </span>
                </TableCell>
            }
        })

    ];


    useEffect(() => {
        getLobbyLabelDetails();
    }, [])

    const getLobbyLabelDetails = () => {
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getLobbyLabelList(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs
            })
        });
    };
    useEffect(()=>{
        //let temp = ['BATTLE', 'CONTEST', 'PRACTICE BATTLE', 'PRACTICE CONTEST', 'POINT VALUE']
        let temp = ['BATTLE','CONTEST','PRACTICE BATTLE', 'PRACTICE CONTEST']
            setLobbyType(temp.filter(element => !rowData?.list?.reduce((acc,cur)=> [...acc, cur.lobbyType],[]).sort().includes(element)))
    }, [rowData?.list]);
    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    (hideActionFunc('master') && lobbyType?.length > 0) &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddLobbyLabel', {lobby:lobbyType})}> + Create Lobby Type</button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getLobbyLabelDetails} />
            </CommonModal>
        </Box>
    );
};
export default LobbyLabel;