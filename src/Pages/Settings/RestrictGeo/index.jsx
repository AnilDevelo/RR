import React, { useEffect, useState } from "react";
import Loader from "../../../images/Loader";
import {useDispatch} from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../hoc/CommonTable";
import Box from "@mui/material/Box";
import {TableCell} from "@mui/material";
import {ActionFunction, hideActionFunc} from "../../../utils";
import CommonModal from "../../../hoc/CommonModal";
import {deleteRestrictGeoList, getRestrictGeoList} from "../../../Redux/settings/action";


const RestrictGeo = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const columns = [
        {
            id: 'country',
            label: 'Country',
            isDisbanding: true,
        },
        {
            id: 'states',
            label: 'State Availability',
            isDisbanding: true,
            type: "custom",
            render: (row) => {
                let temp = [...row?.states]
                return <TableCell>
                    {
                        temp?.splice(0,4)?.map((item, i) => {
                            return (
                                <div className={'country_availability_details_info'}>
                                    {`${i + 1}) ${item}`}
                                </div>
                            )
                        })
                    }
                    {row?.states?.length > 4 ? <span className={'edit_btn edit-btn-action'} onClick={() => handleOpenModal('countryDisplayPopup',{countryList:row?.states, title:'Restricted state'})}> ...more </span> : ''}
                    {/*<span className={'edit_btn edit-btn-action'} onClick={() => handleOpenModal('countryDisplayPopup',{countryList:row?.states, title:'State Availability'})}> {row?.states?.length} </span>*/}
                </TableCell>
            }
        },
        ActionFunction('setting', {
            id: 'action',
            label: 'Action',
            isDisbanding: true,
            type: "custom",
            render: (row) => {
                return (
                    <TableCell className={'role_field_id'}>
                        <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('AddRestrictGeo', {isEdit:true, row})}>Edit</span>
                        <span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('DeleteCommonModal', { deleteListApiHandler: deleteRestrictGeoList({ restrictGeoId: row?._id }), title: 'Do you want to delete this data?' })}>Delete</span>
                    </TableCell>
                )
            }
        })
    ];

    const handleOpenModal = (type, data) => {
        const modalData = { modalValue: data, modalName: type, modalIsOpen: true };
      
        if (type === 'CommonPop' || type === 'DeleteCommonModal' || type === 'countryDisplayPopup' || type === 'AddRestrictGeo') {
          setModalDetails({ ...modalDetails, ...modalData });
        } else {
          setModalDetails({ ...modalDetails, modalIsOpen: false });
        }
      };

    useEffect(() => {
        getRestrictGeo()
    }, [])

    const getRestrictGeo = () => {
        let payload = {
            start: ((pagination.page + 1) - 1) * pagination.rowsPerPage,
            limit: pagination.rowsPerPage,
        };
        setLoader(true);
        dispatch(getRestrictGeoList(payload)).then((res) => {
            if (res.data.success) {
                setLoader(false);
                setRowData({
                    ...rowData,
                    list: res?.data?.data?.docs,
                    totalDocs: res?.data?.data?.totalDocs
                });
            } else {
                setLoader(false);
            }
        })
            .catch((e) => {
                setLoader(false);
            });
    };
    return(
            <div className={'restrictGeo-section'}>
                {/* {loader ? <Loader /> : ""} */}

                <Paper sx={{ mb: 2 }} className="outer-box">
                    {(hideActionFunc("game") && rowData?.list?.length <= 0) && (
                        <div className={"d_flex_end"}>
                            <button className={"btn"} onClick={() => handleOpenModal("AddRestrictGeo")}>+ Add Restrict Geo</button>
                        </div>
                    )}
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
                <CommonModal className={"Approved-reject-section"} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                    <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getRestrictGeo}/>
                </CommonModal>
            </div>
        )
};
export default RestrictGeo