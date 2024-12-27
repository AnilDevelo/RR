import React, {useEffect, useState} from "react";
import CustomTable from "../../hoc/CommonTable";
import {ActionFunction, hideActionFunc, renderSrNo} from "../../utils";
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

const History = () => {

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
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         setReleaseBuild({
    //             ...releaseBuild,
    //             copied:''
    //         })
    //     },1000)
    // },[releaseBuild.copied])

    // useEffect(() => {
    //     getCompanyLogoList();
    // }, []);

    // const getCompanyLogoList = () => {
    //     setLoader(true);
    //     dispatch(getCompanyLogo({}))
    //         .then((res) => {
    //             if (res.data.success) {
    //                 setLoader(false);
    //                 setRowData({
    //                     ...rowData,
    //                     list: res?.data?.data.docs
    //                 });
    //             } else {
    //                 setLoader(false);
    //             }
    //         })
    //         .catch((e) => {
    //             setLoader(false);
    //         });
    // };

    const columns = [
        {
            id: "",
            twoLineText: true,
            label: "Sr. no.",
            type: "custom",
            render: (row, i) => renderSrNo(row, i, pagination),
          },
        {
            id: '',
            label: "User name",
            sortable: false,
            isDisbanding: true,
        },
        {
            id: '',
            label: "User Role",
            sortable: false,
            isDisbanding: true,
        },
        {
            id: '',
            label: "Module Name",
            sortable: false,
            isDisbanding: true,
        },
        {
            id: '',
            label: "Updated date & time",
            sortable: false,
            isDisbanding: true,
        },
        

    ];

  return (
    <Box>
    <Paper sx={{ mb: 2 }} className="outer-box">
        <CustomTable
            headCells={columns}
            rowData={rowData?.list}
            totalDocs={rowData?.totalDocs}
            pagination={pagination}
            setPagination={setPagination}
            // isWinnerTitle={true}
            loading={loader}
        />
    </Paper>
</Box>
  )
}

export default History
