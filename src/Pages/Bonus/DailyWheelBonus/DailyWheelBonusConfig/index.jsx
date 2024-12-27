import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, hideActionFunc} from "../../../../utils";
import CommonModal from "../../../../hoc/CommonModal";
import PopComponent from "../../../../hoc/PopContent";
import {useDispatch} from "react-redux";
import {getDailySpinDivisionRow} from "../../../../Redux/Bonus/action";
import Loader from "../../../../images/Loader";

const DailyWheelBonusConfig = () => {
    const dispatch = useDispatch();
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    const [loader, setLoader] = useState(false)
    let Modal = PopComponent[modalDetails.modalName];

    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });

    const columns = [
        {
            id: 'rows',
            label: 'Daily Spin Division',
            type: 'custom',
            render: (row) => {
               return <TableCell>{row?.rows}</TableCell>
            }
        },
        ActionFunction('bonus', {
            id: 'Action',
            label: 'Action',
            type: 'custom',
            isDisbanding: true,
            render: (row) => {
                return <TableCell >
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddDailyWheelBonusConfig', { isEdit: true, row })}>Edit</span>
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
            case 'AddDailyWheelBonusConfig' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    useEffect(() => {
        getDailySpinDivisionRowDetails()
    }, [pagination.rowsPerPage, pagination.page]);

    const getDailySpinDivisionRowDetails = () => {
        setLoader(true);
        dispatch(getDailySpinDivisionRow({})).then(res => {
            if (res.data.success) {
                setLoader(false);
                setRowData({
                    ...rowData,
                    list: Object?.keys(res.data.data)?.length ? [res.data.data] : [],
                });
            }
        })
    }

    return(
        <>
        <Paper sx={{ mb: 0 }} className="outer-box monthly-bonus-amount w_100_i" style={{marginRight:"0px"}}>
            <div className={'d_flex_between'}>
                <h2>Daily Spin Division</h2>
                {
                   (hideActionFunc('bonus') && rowData?.list?.length <= 0)&&
                    <button className={'btn'} onClick={()=>handleOpenModal('AddDailyWheelBonusConfig')}> + Add Daily Spin Division Config</button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getDailySpinDivisionRowDetails} />
            </CommonModal>
        </Paper>
            </>
    )
}
export default DailyWheelBonusConfig