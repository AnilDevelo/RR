import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../../hoc/PopContent";
import TableCell from "@mui/material/TableCell";
import {ActionFunction, dotGenerator, hideActionFunc} from "../../../../../utils";
import {getResponsiblePerson, getTDSFilling} from "../../../../../Redux/TDSReport/action";
import Box from "@mui/material/Box";
import Loader from "../../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import CommonModal from "../../../../../hoc/CommonModal";

const ResponsiblePerson = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddResponsiblePerson': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewRejectedComment' :{
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
            id: "name",
            numeric: true,
            disablePadding: false,
            label: "Name",
        },
        {
            id: "designation",
            numeric: true,
            disablePadding: false,
            label: "Designation",
        },
        {
            id: "pan",
            numeric: true,
            disablePadding: false,
            label: "Pan Card Number",
        },
        {
            id: "street",
            numeric: true,
            disablePadding: false,
            label: "Address",
            type: 'custom',
            render: (row, i) => {
                const str = row?.state?.toLowerCase();
                const str2 = str?.charAt(0).toUpperCase() + str?.slice(1);
                let address = `${row?.street},${row?.area},${row?.city},${str2},${row?.postal_code}.`
                return <TableCell >{dotGenerator(address, handleOpenModal, 'Address')}</TableCell>
            }
        },

        {
            id: "email",
            numeric: true,
            disablePadding: false,
            label: "Email",
        },
        {
            id: "mobile",
            numeric: true,
            disablePadding: false,
            label: "Mobile No.",
        },
        ActionFunction('tdsReport', {
            id: 'action',
            label: 'Action',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={(e) => handleOpenModal('AddResponsiblePerson', { isEdit: true, row })}>Edit</span>
                </TableCell>
            }
        })
    ];

    useEffect(()=>{
        getResponsiblePersonData()
    },[])

    const getResponsiblePersonData = () => {
        setLoader(true)
        dispatch(getResponsiblePerson({})).then(res => {
            setLoader(false)
            if (res.data.success) {
                setRowData({
                    ...rowData,
                    list: Object?.keys(res?.data?.data || {}).length > 0 ? [res?.data?.data] : []
                })
            }
        })
    }

    return(
        <Box>
            {/*{loader ? <Loader /> : ""}*/}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'d_flex_between'}>
                   <h2>Responsible Person (CEO/CFO/Finance Manager)</h2>
                   {
                       (hideActionFunc('tdsReport') && rowData?.list?.length <= 0) &&
                       <div className={'d_flex_end'}>
                           <button className={'btn'} onClick={(e) => handleOpenModal('AddResponsiblePerson')}> + Add Responsible Person</button>
                       </div>
                   }
               </div>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getResponsiblePersonData} />
            </CommonModal>
        </Box>
    )
}
export default ResponsiblePerson