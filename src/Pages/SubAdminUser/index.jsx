import React, {useEffect, useState} from "react";
import Loader from "../../images/Loader";
import Paper from "@material-ui/core/Paper";
import CustomTable from "../../hoc/CommonTable";
import CommonModal from "../../hoc/CommonModal";
import TableCell from "@material-ui/core/TableCell";
import {
    deleteSubAdminUserList,
    getSubAdminUserListing
} from "../../Redux/AdminUser/action";
import {useDispatch} from "react-redux";
import PopComponent from "../../hoc/PopContent";
import {ActionFunction, AdminRole, agentDetails, helpTicketTypeArr, hideActionFunc} from "../../utils";
import {getLeaderboardGameList} from "../../Redux/Bonus/action";
import Cookies from "universal-cookie";

const SubAdminUser = () => {
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails?.modalName];
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0, gameList:[] });
    const [gameList,setGameList] = useState([])


    let columns = [
        {
            id: 'id',
            numeric: false,
            disablePadding: false,
            label: 'Sub Admin Role ID',
            type: 'custom',
            render: (row, i) => {
                return <TableCell>{`ARID000${row?.numericId}`}</TableCell>
            }
        },
        {
            id: 'fullName',
            numeric: true,
            disablePadding: false,
            label: 'Full Name',
        },
        {
            id: 'email',
            numeric: true,
            disablePadding: false,
            label: 'Email',
        },
        {
            id: 'phoneNumber',
            numeric: true,
            disablePadding: false,
            label: 'Phone Number',

        },
        {
            id: 'role',
            disablePadding: false,
            label: 'Access Role Category',
            type: 'custom',
            render: (row) => {
                const { adminUserPermission } = row;
                //let agentDataDetails = JSON.parse(localStorage.getItem('agentData')) || cookies.get('agentData');
                let agentDataDetails =  agentDetails();
                let temp =  AdminRole?.reduce((r, v, i) => r.concat(Object.keys(agentDataDetails?.permission).includes(v?.value) ? v : []), []);
                return <TableCell>
                    <ul>
                        {
                            (adminUserPermission?.all?.viewer && adminUserPermission?.all?.editor) ?
                                <li>All Roles Viewers, All Roles Editors</li>
                                : adminUserPermission?.all?.viewer?
                                <li>All Roles Viewers.</li>
                                :
                            temp?.filter(item => Object?.keys(adminUserPermission || {})?.includes(item.value))?.map(item => {
                                return (adminUserPermission[item.value].viewer || adminUserPermission[item.value].editor) && <li>
                                    {  item.label} {adminUserPermission[item.value].viewer ? "Viewer" : ""}{adminUserPermission[item.value].editor ? ', ' + item.label + ' ' + "Editor" : ''}
                                    {/*{*/}
                                    {/*    item?.label === 'Help & Support' &&*/}
                                    {/*    <ul className={'helpAndSupport-first_nested'}>*/}
                                    {/*        {*/}
                                    {/*            helpTicketTypeArr?.filter(item => Object?.keys(adminUserPermission || {})?.includes(item.value))?.map(item=>{*/}
                                    {/*                return  <li>*/}
                                    {/*                    {`Help & Support ${item?.label} Ticket`}*/}
                                    {/*                    {*/}
                                    {/*                        item?.label === 'Games' &&*/}
                                    {/*                        <ul className={'helpAndSupport-sec_nested'}>*/}
                                    {/*                            {*/}
                                    {/*                                gameList?.filter(element => adminUserPermission?.helpAndSupportGame?.allowedGames?.includes(element?.value))?.map(item=>{*/}
                                    {/*                                    return    <li>{item?.label}</li>*/}
                                    {/*                                })*/}
                                    {/*                            }*/}
                                    {/*                        </ul>*/}
                                    {/*                    }*/}
                                    {/*                </li>*/}
                                    {/*            })*/}
                                    {/*        }*/}
                                    {/*    </ul>*/}
                                    {/*}*/}
                                </li>
                            })
                        }
                    </ul>
                </TableCell>
            }
        },
        {
            id: 'status',
            isDisbanding: true,
            label: 'Status',
            type: 'custom',
            render: (row, i) => {

                return <TableCell>{row?.isBlock ? 'Deactivate' : 'activate'}</TableCell>
            }
        },
        ActionFunction('subAdminUser', {
            id: "action",
            isDisbanding: true,
            label: "Action",
            type: "custom",
            render: (row) => {
                return (
                    <TableCell className={'role_field_id'}>
                        <span className="edit_btn edit-btn-action u_border" onClick={() => handleOpenModal('AddSubAdminPopup', { isEdit: true, data: row })}>Edit</span>
                        <span className='edit_btn edit-btn-action u_border prTab'
                              onClick={() => handleOpenModal('DeleteCommonModal',
                                  { deleteListApiHandler: deleteSubAdminUserList({ subAdminUserRoleId: row?._id }), title: 'Do you want to delete this data?' })}>
                            Delete
                        </span>
                        {!row?.isBlock ?
                            <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('ActivateDeactivateSubAdmin', { subAdminUserRoleId: row?._id, isActive: true })}>Deactivate</span>
                            : <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('ActivateDeactivateSubAdmin', { subAdminUserRoleId: row?._id, isActive: false })}>Activate</span>}
                    </TableCell>
                );
            },
        })
    ];

    // ActionFunction('mgpRelease', {

    useEffect(() => {
        getSubAdminUserListData();
        dispatch(getLeaderboardGameList()).then(res => {
            setGameList(res.data.data?.docs?.map((item) => {
                return {value: item?._id, label: item?.gameName}
            }) || [])
        })
    }, [pagination.rowsPerPage, pagination.page]);

    const getSubAdminUserListData = () => {
        setLoader(true);
        let payload = {
            limit: pagination.rowsPerPage,
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
        };
        dispatch(getSubAdminUserListing(payload)).then(res => {
            setLoader(false)
            setRowData({
                ...rowData,
                list: res?.data?.data?.docs,
                totalDocs: res?.data?.data?.totalDocs
            });
        });
    };

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddSubAdminPopup' :{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal':{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ActivateDeactivateSubAdmin' :{
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                localStorage.setItem('closeModal','true')
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    return(
        <>
            {/* {loader ? <Loader /> : ""} */}
            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    hideActionFunc('subAdminUser') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={() => handleOpenModal('AddSubAdminPopup', { isEdit: false })}> + Add Sub Admin</button>
                    </div>
                }

                <CustomTable
                    headCells={columns}
                    rowData={rowData?.list}
                    totalDocs={rowData?.totalDocs || 0}
                    pagination={pagination}
                    setPagination={setPagination}
                    loading={loader}
                />
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getSubAdminUserListData} />
            </CommonModal>
        </>
    )
}
export default SubAdminUser