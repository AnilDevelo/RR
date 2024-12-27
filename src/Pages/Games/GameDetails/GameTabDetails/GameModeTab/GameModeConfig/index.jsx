import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import PopComponent from "../../../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, currencyFormat, hideActionFunc} from "../../../../../../utils";
import {getReferAndEarn} from "../../../../../../Redux/Master/action";
import Box from "@mui/material/Box";
import Loader from "../../../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../../hoc/CommonTable";
import CommonModal from "../../../../../../hoc/CommonModal";
import {gameModeDesignConfigList} from "../../../../../../Redux/games/action";
import { useParams } from "react-router-dom";
import user from "../../../../../../assets/images/avatar.png";

const GameModeConfig = () => {
    const {id} =useParams()
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState([]);

    const columns = [

        {
            id: '',
            label: 'Game Config',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell>{row?.gameModeDesignId?.designName}</TableCell>
            }
        },
        {
            id:"",
            label:'Design Name Image',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell >
                    <img src={row?.gameModeDesignId?.designNameImage || user} alt={''} />
                </TableCell>
            }
        },
        ActionFunction('game', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('AddGameModeConfigList', { isEdit: true, row })}>Edit</span>

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
            case 'AddGameModeConfigList': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    useEffect(() => {
        getGameModeConfigList();
    }, []);

    const getGameModeConfigList = () => {
         setLoader(true);
        let payload = {
            gameId:id
        };
        dispatch(gameModeDesignConfigList(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                let data = res?.data?.data ?  [res?.data?.data] : []
                setRowData(data)
            } else {
                setRowData([])
            }
        })
    };


    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                    <h2>Game Mode Design Config</h2>
                    {
                        ( rowData?.length === 0 && hideActionFunc('game')) &&
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddGameModeConfigList')}> + Add Game Mode Design Config</button>
                    }
                </div>
                <CustomTable
                    headCells={columns}
                    rowData={rowData}
                    totalDocs={0}
                    pagination={pagination}
                    setPagination={setPagination}
                    isAboutWebsite={true}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getGameModeConfigList} />
            </CommonModal>
        </Box>
    )
}
export default GameModeConfig