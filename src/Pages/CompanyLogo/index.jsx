import React, {useEffect, useState} from "react";
import CustomTable from "../../hoc/CommonTable";
import {ActionFunction, hideActionFunc} from "../../utils";
import Loader from "../../images/Loader";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import CommonModal from "../../hoc/CommonModal";
import {useDispatch} from "react-redux";
import TableCell from "@material-ui/core/TableCell";
import PopComponent from "../../hoc/PopContent";
import user from '../../assets/images/avatar.png';
import {deleteCompanyLogoList, getCompanyLogo} from "../../Redux/CompanyLogo/action";
import {CopyToClipboard} from "react-copy-to-clipboard";

const CompanyLogo = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData, setRowData] = useState({ list: [], totalDocs: 0 });
    const [releaseBuild,setReleaseBuild] = useState({
        buildCopy: '',
        copied:''
    })
    useEffect(()=>{
        setTimeout(()=>{
            setReleaseBuild({
                ...releaseBuild,
                copied:''
            })
        },1000)
    },[releaseBuild.copied])

    useEffect(() => {
        getCompanyLogoList();
    }, []);

    const getCompanyLogoList = () => {
        setLoader(true);
        dispatch(getCompanyLogo({}))
            .then((res) => {
                if (res.data.success) {
                    setLoader(false);
                    setRowData({
                        ...rowData,
                        list: res?.data?.data.docs
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
            case 'AddCompanyLogo':{
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
            label: "Company Icon",
            sortable: false,
            isDisbanding: true,
            type: 'custom',
            render: (row, i) => {
                return <TableCell className={'table_icon'}>
                    <img src={row?.companyIcon || user} alt={''} />
                </TableCell>
            }
        },
        {
            id: 'companyIcon',
            label: 'Company Logo URL',
            twoLineText: true,
            type: 'custom',
            render: (row, i ) => {
                return <TableCell className={'pl_3'}>
                    {
                        releaseBuild?.copied === i ?
                            <span style={{color: 'red'}}>Copied.</span>
                            :
                            <CopyToClipboard text={row?.companyIcon}
                                             onCopy={() => setReleaseBuild({
                                                 ...releaseBuild,
                                                 copied: i
                                             })}>
                                <span className={'edit_btn edit-btn-action'}>Copy</span>
                            </CopyToClipboard>
                    }
                </TableCell>
            }
        },
        ActionFunction('companyLogo', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('AddCompanyLogo', {  isEdit: true, row })}>Edit</span>
                    {/*<span className='edit_btn edit-btn-action prTab' onClick={() => handleOpenModal('DeleteCommonModal',*/}
                    {/*    { deleteListApiHandler: deleteCompanyLogoList({ companyLogoId: row?._id }), title: 'Do you want to delete this data?' })}>Delete</span>*/}
                </TableCell>
            }
        })
    ];

    return (
        <Box>
            {/* {loader ? <Loader /> : ""} */}

            <Paper sx={{ mb: 2 }} className="outer-box">
                {
                    (hideActionFunc('companyLogo') && rowData?.list?.length === 0) &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={(e) => handleOpenModal('AddCompanyLogo')}>  + Add Company Logo </button>
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
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getCompanyLogoList} />
            </CommonModal>
        </Box>
    );
}
export default CompanyLogo