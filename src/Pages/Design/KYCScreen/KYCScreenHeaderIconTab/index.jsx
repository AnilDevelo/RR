import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import PopComponent from "../../../../hoc/PopContent";
import {getKYCHeaderLogo} from "../../../../Redux/Design/action";
import TableCell from "@mui/material/TableCell";
import user from "../../../../assets/images/avatar.png";
import {ActionFunction, hideActionFunc} from "../../../../utils";
import {Box} from "@mui/material";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";

const KYCScreenHeaderIconTab = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

    useEffect(() => {
        getKYCScreenLogoList();
    }, []);

    const getKYCScreenLogoList = () => {
        setLoader(true);
        dispatch(getKYCHeaderLogo({}))
            .then((res) => {
                if (res.data.success) {
                    setLoader(false);
                    setRowData({
                        ...rowData,
                        list: Object?.keys(res?.data?.data || {})?.length > 0 ? [res?.data?.data] : []
                    });
                } else {
                    setLoader(false);
                }
            })
            .catch((e) => {
                setLoader(false);
            });
    };

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddKYCScreenHeader':{
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
            label: "Image",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.KYCHeaderIconImage || user} alt={''} />
                </TableCell>
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
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddKYCScreenHeader', {  isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })
    ];


    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}

            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    (hideActionFunc('master') && rowData?.list?.length === 0) &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddKYCScreenHeader')}>  + Add KYC Screen Logo</button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getKYCScreenLogoList} />
            </CommonModal>
        </Box>
    );
}
export default KYCScreenHeaderIconTab