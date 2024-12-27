import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import PopComponent from "../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, currencyFormat, hideActionFunc} from "../../../../utils";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../hoc/CommonTable";
import CommonModal from "../../../../hoc/CommonModal";
import BonusReleaseDate from "./BonusReleaseDate";
import MonthlyBonusAmount from "./MonthlyBonusAmount";
import moment from "moment";
import {deleteReferAndEarnRankConfig, getReferAndEarnRankConfig} from "../../../../Redux/Bonus/action";
import Loader from "../../../../images/Loader";

const ReferAndEarnMonthlyTab = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 })
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({monthlyBonusAmountConfig:[],monthlyBonusDateConfig:[],ranks:[],bonusMonthlyAllData:{}});

    const columns = [
        {
            id: '',
            label: 'Date & Time',
            isDisbanding: true,
            twoLineText: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.createdAt).format('MMM DD YYYY, hh:mm A')}</TableCell>
            }
        },
        {
            id: 'rankTitle',
            label: 'Rank Title',
            isDisbanding: true,
        },
        {
            id: '',
            label: 'Rank Range',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.startRank} TO {row?.endRank}</TableCell>
            }
        },
        {
            id: 'bonus',
            label: 'Bonus',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell >{currencyFormat(+row?.bonus)}</TableCell>
            }

        },
        ActionFunction('bonus', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action u_border' onClick={(e) => handleOpenModal('AddReferAndEarnMonthly', { isEdit: true, row })}>Edit</span>
                    <span className='edit_btn edit-btn-action prTab'
                          onClick={()=> handleOpenModal('DeleteCommonModal', {deleteListApiHandler : deleteReferAndEarnRankConfig({referAndEarnRankConfigId: row?._id}), title: 'Do you want to delete this data?'})}
                    >Delete</span>
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
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddBonusReleaseDate':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddReferAndEarnMonthly': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddMonthlyBonusAmount':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    useEffect(() => {
        getReferAndEarnList();
    }, []);

    const getReferAndEarnList = () => {
        setLoader(true);
        dispatch(getReferAndEarnRankConfig({})).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                monthlyBonusAmountConfig : Object?.keys(res?.data?.data?.monthlyBonusConfig || {})?.length > 0 ? [res?.data?.data?.monthlyBonusConfig] : [],
                monthlyBonusDateConfig: (Object?.keys(res?.data?.data?.monthlyBonusConfig || {})?.length > 0  && res?.data?.data?.monthlyBonusConfig?.bonusReleaseDate)? [res?.data?.data?.monthlyBonusConfig] : [],
                ranks:res?.data?.data?.ranks,
                bonusMonthlyAllData:res?.data?.data
            })
        })
    };

    return (
        <>
            {/* {loader && <Loader />} */}
         <div className={'monthly-refer-earn-details-table'}>
             <MonthlyBonusAmount handleOpenModal={handleOpenModal} rowData={rowData?.monthlyBonusAmountConfig} />
             <BonusReleaseDate handleOpenModal={handleOpenModal} rowData={rowData?.monthlyBonusDateConfig}/>
         </div>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                    <h2>Monthly Refer & Earn Rank</h2>
                    {
                        hideActionFunc('bonus') &&
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddReferAndEarnMonthly')}> + Add Monthly Refer & Earn Rank</button>
                    }

                </div>
                <CustomTable
                    headCells={columns}
                    rowData={rowData?.ranks}
                    totalDocs={0}
                    pagination={pagination}
                    setPagination={setPagination}
                    isAboutWebsite={true}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                    <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getReferAndEarnList} monthlyBonus={rowData?.bonusMonthlyAllData} />
            </CommonModal>
        </>
    )
};

export default ReferAndEarnMonthlyTab