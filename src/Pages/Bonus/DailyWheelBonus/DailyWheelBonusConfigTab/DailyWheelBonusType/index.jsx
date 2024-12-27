import React, {useEffect, useState} from "react";
import Paper from "@mui/material/Paper";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../../hoc/PopContent";
import CustomTable from "../../../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import CommonModal from "../../../../../hoc/CommonModal";
import {ActionFunction, dotGenerator, hideActionFunc} from "../../../../../utils";
import user from "../../../../../assets/images/avatar.png";
import {getDailyWheelBonusTypeList} from "../../../../../Redux/Bonus/action";

const DailyWheelBonusType = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0})
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddDailyWheelBonusType' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment' : {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    const columns = [
        {
            id: 'icon',
            label: 'Type Icon',
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.dailyWheelBonusIcon || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'type',
            label: 'Type',
        },
        {
            id: 'title',
            label: 'Title',
        },
        {
            id: 'description',
            label: 'Description',
            type: 'custom',
            render: (row) => {
                return <TableCell >{dotGenerator(row?.description, handleOpenModal, 'Daily Spin Bonus Type Description')}</TableCell>
            }
        },
        {
            id: 'isDeductTDS',
            label: 'Deduct TDS',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.isDeductTds ? 'Yes' : 'No' }</TableCell>
            }
        },
        ActionFunction('bonus', {
            id: 'Action',
            label: 'Action',
            type: 'custom',
            isDisbanding: true,
            render: (row) => {
                return <TableCell >
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddDailyWheelBonusType', { isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })
    ]

    useEffect(() => {
        getDailyWheelBonusType()
    }, []);

    const getDailyWheelBonusType = () => {
        setLoader(true);
        dispatch(getDailyWheelBonusTypeList({})).then(res => {
            if (res.data.success) {
                setLoader(false);
                setRowData({
                    ...rowData,
                    list: res?.data?.data,
                    totalDocs: res?.data?.data?.totalDocs
                });
            }
        })
    };

    return(
        <Paper sx={{ mb: 0 }} className="outer-box monthly-bonus-amount mb_3">
            <div className={'d_flex_between'}>
                <h2>Daily Spin Bonus Type</h2>
                {
                    (rowData?.list?.length < 6 &&  hideActionFunc('bonus')) &&
                    <button className={'btn'} onClick={()=>handleOpenModal('AddDailyWheelBonusType')}> + Add Daily Spin Bonus Type</button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal}  modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getDailyWheelBonusType} />
            </CommonModal>
        </Paper>
    )
}
export default DailyWheelBonusType