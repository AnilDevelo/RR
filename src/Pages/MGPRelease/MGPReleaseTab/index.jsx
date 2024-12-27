import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, dotGenerator, hideActionFunc} from "../../../utils";
import {getMgpReleases} from "../../../Redux/MGPRelease/action";
import Box from "@mui/material/Box";
import Loader from "../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import CommonModal from "../../../hoc/CommonModal";

const MGPReleaseTab = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    let Modal = PopComponent[modalDetails.modalName];

    const columns = [
        {
            id: 'releaseNumber',
            numeric: true,
            disablePadding: false,
            label: 'Release Number',
        },
        {
            id: 'releaseNote',
            numeric: true,
            disablePadding: false,
            isDisbanding: true,
            label: 'Release Note',
            type: 'custom',
            render: (row) => {
                let text = new DOMParser().parseFromString(row?.releaseNote, "text/html").documentElement.textContent
                return <TableCell >{dotGenerator(text, handleOpenModal, 'Release Notes')}</TableCell>
            }
        },
        {
            id: '',
            numeric: true,
            disablePadding: false,
            label: 'Country availability',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell> {!row?.isAvailableAllCountry ? row?.countryAvailability[0] : <ul>{row?.countryAvailability?.map((item, i) => item)}</ul>} </TableCell>
            }
        },
        {
            id: 'rolloutStage',
            numeric: true,
            disablePadding: false,
            label: 'Roll Out Stage',
        },
        {
            id: 'rolloutPercentage',
            numeric: true,
            disablePadding: false,
            label: 'Roll Out Percentage',
            type: 'custom',
            render: (row) => {
                return <TableCell>{row?.rolloutPercentage}%</TableCell>
            }
        },
        ActionFunction('mgpRelease', {
            id: 'action',
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    {
                        row?.isHaltRollout ?
                            "Halt RollOut"
                            :
                            row?.rolloutPercentage !== 100 ?
                                <>
                                    <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('HaltRollOutPopup', {mgpReleaseId: row?._id })}>Halt RollOut</span>
                                    <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('UpdateRollOutPopup', row)}>Update RollOut</span>
                                </>
                                :
                                <span>-</span>
                    }

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
            case 'AddMGPRelease': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'HaltRollOutPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'UpdateRollOutPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    useEffect(() => {
        getMGReleaseList();
    }, []);

    const getMGReleaseList = () => {
        let payload = {
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            limit: pagination.rowsPerPage,
        }
        setLoader(true);
        dispatch(getMgpReleases(payload)).then(res => {
            setLoader(false);
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
                });
            }
        });
    };

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('mgpRelease') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddMGPRelease')}> + Add MGP Release</button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getMGReleaseList} />
            </CommonModal>
        </Box>
    );
}
export default MGPReleaseTab