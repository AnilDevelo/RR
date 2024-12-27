import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, hideActionFunc} from "../../../../../../utils";
import CommonModal from "../../../../../../hoc/CommonModal";
import PopComponent from "../../../../../../hoc/PopContent";
import {useDispatch} from "react-redux";
import { getLoginScreenTypeConfigList } from "Redux/Design/action";

const SelectLoginScreenTypeConfig = ({setHelpType}) => {
    const dispatch = useDispatch();
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    let Modal = PopComponent[modalDetails.modalName];
    const [loader, setLoader] = useState(false);

    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

    const columns = [
        {
            id: 'rows',
            label: 'Type',
            type: 'custom',
            isDisbanding: true,
            render: (row) => {
               return <TableCell>{row?.type}</TableCell>
            }
        },
        ActionFunction('bonus', {
            id: 'Action',
            label: 'Action',
            type: 'custom',
            isDisbanding: true,
            render: (row) => {
                return <TableCell >
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddTypeConfig', { isEdit: true, row })}>Edit</span>
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
            case 'AddTypeConfig' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    useEffect(() => {
        getTypeConfigDetails()
    }, [pagination.rowsPerPage, pagination.page]);

    const getTypeConfigDetails = () => {
        dispatch(getLoginScreenTypeConfigList({})).then(res => {
            if (res.data.success) {
                setHelpType( res?.data?.data?.type)
                setRowData({
                    ...rowData,
                    list: Object?.keys(res.data.data)?.length ? [res.data.data] : [],
                });
            }
        })
    }

    return(
        <>

        <Paper sx={{ mb: 0 }} className="outer-box monthly-bonus-amount">
            <div className={'d_flex_between'}>
                <h2>Select Login Screen Config</h2>
                {
                   (hideActionFunc('bonus') && rowData?.list?.length <= 0)&&
                    <button className={'btn'} onClick={()=>handleOpenModal('AddTypeConfig')}> + Add Type Config</button>
                }
            </div>

            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={0}
                isAboutWebsite={true}
                loading={loader}

            />
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getTypeConfigDetails} />
            </CommonModal>
        </Paper>
            </>
    )
}

export default SelectLoginScreenTypeConfig