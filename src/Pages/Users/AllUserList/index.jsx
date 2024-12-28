import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import TableCell from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import PopComponent from "hoc/PopContent";
import { ActionFunction, clearPaginationAndFilterData, currencyFormat, renderSrNo } from "utils";
import { getAllUserDetailsList } from "Redux/user/action";
import MainCommonFilter from "Components/MainCommonFilter";
import CustomTable from "hoc/CommonTable";
import CommonModal from "hoc/CommonModal";
import SearchInput from '../../../Components/SearchInput';


const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const userList = useSelector((state) => state.userReducer.userList);
  const [modalDetails, setModalDetails] = useState({
    modalValue: "",
    modalName: "",
    modalIsOpen: false,
  });
  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    page: 0,
    startRange: "",
    endRange: "",
  });
  let Modal = PopComponent[modalDetails.modalName];
  const [filterData, setFilterData] = useState({
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    statusValue: "Today",
    exportFile: false,
    csvDownload: false,
    search: "",
    filterClose: false,
    exportFileName: "Export File",
    platformName: "All Users",
    state: "All States",
  });
  const [dateFilter,setDateFilter] = useState(filterData);
  let prevDateFilter  = React.useRef(dateFilter);

  useEffect(() => {
    if(filterData?.statusValue ==='Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom'  ){
        getUserListData(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
    }
    else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
        getUserListData(filterData.startDate, filterData.endDate,filterData.search);
    }
}, [pagination.rowsPerPage, pagination.page, filterData.exportFile, filterData.csvDownload, filterData.startDate, filterData.endDate, filterData?.platformName, filterData?.state, filterData?.statusValue]);

  // get Users Api and All Filter Api
  const getUserListData = (startDate, endDate, search) => {
    setLoader(true);
    const { platformName, state, exportFile, csvDownload } = filterData;
    const { rowsPerPage, page, startRange, endRange } = pagination;
    let payload = {

      limit: endRange || rowsPerPage,
      start: startRange || page * rowsPerPage,
      // searchText: search ? search : state === "All States" ? "" : state,
      searchText: search,
      state:state === 'All States' ? '' : state,
      startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
      endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
      isBlock:
        platformName !== "All Users"
          ? platformName === "Blocked Users Accounts"
          : "",
      exportFile,
      csvDownload,
    };
    const filteredPayload = Object.fromEntries(
      Object.entries(payload).filter(
        ([_, value]) => value !== "" && value !== null
      )
    );
    dispatch(getAllUserDetailsList(filteredPayload)).then((res) => {
      setLoader(false);
      if (
        pagination?.endRange?.toString() !== "" &&
        pagination?.startRange?.toString() !== ""
      ) {
        clearPaginationAndFilterData(
          pagination,
          filterData,
          setPagination,
          setFilterData
        );
      }
      if (res?.data?.data?.filePath) {
        window.open(res?.data?.data?.filePath,"_blank");
      }
    });
  };

  useEffect(() => {
    if (
      filterData.startDate &&
      filterData.endDate &&
      filterData?.statusValue === "Custom"
    ) {
      setPagination({
        ...pagination,
        page: 0,
      });
    }
  }, [filterData.startDate, filterData.endDate]);

  // table columns
  let columns = [
		{
			id: "ClientId",
			numeric: false,
			disablePadding: false,
			label: "User ID",
			type: "custom",
			render: (row, i) => {
				return (
					<TableCell>
						<span
							className="edit_btn"
							onClick={() => navigate(`/users-tab/${row.id}`)}
						>{`UID000${row?.numericId}`}</span>
					</TableCell>
				);
			},
		},

		{
			id: "ClientName",
			numeric: true,
			disablePadding: false,
			label: "User Name",
		},

		{
			id: "email",
			numeric: true,
			disablePadding: false,
			label: "Email",
		},
		{
			id: "phoneNumber",
			numeric: true,
			disablePadding: false,
			label: "Phone",
		},
		{
			id: "commission",
			twoLineText: true,
			label: "Commission Rate",
		},
		{
			id: "quickpay",
			disablePadding: false,
			label: "Quick Pay",
		},
		{
			id: "regularpay",
			twoLineText: true,
			label: "Regular Pay",
		},
		ActionFunction("user", {
			id: "Action",
			isDisbanding: true,
			label: "Action",
			type: "custom",
			render: (row) => {
				return (
					<TableCell className={"role_field_id"}>
						{row?.isBlock ? (
							<span
								className="edit_btn edit-btn-action"
								onClick={() =>
									handleOpenModal("BlockUser", {
										userId: row.id,
										isBlock: !row?.isBlock,
									})
								}
							>
								Unblock User Account
							</span>
						) : (
							<span
								className="edit_btn edit-btn-action"
								onClick={() =>
									handleOpenModal("BlockUser", {
										userId: row.id,
										isBlock: !row?.isBlock,
									})
								}
							>
								{" "}
								Block User Account
							</span>
						)}
					</TableCell>
				);
			},
		}),
		{
			id: "Action",
			isDisbanding: true,
			label: "Action",
			type: "custom",
			render: (row) => {
				return (
					<TableCell className={"role_field_id"}>
						{/* Block/Unblock User Account */}
						{row?.isBlock ? (
							<span
								className="edit_btn edit-btn-action"
								onClick={() =>
									handleOpenModal("BlockUser", {
										userId: row.id,
										isBlock: !row?.isBlock,
									})
								}
							>
								Unblock
							</span>
						) : (
							<span
								className="edit_btn edit-btn-action"
								onClick={() =>
									handleOpenModal("BlockUser", {
										userId: row.id,
										isBlock: !row?.isBlock,
									})
								}
							>
								Block
							</span>
						)}

						{/* Edit User */}
						<span
							className="edit_btn edit-btn-action"
							onClick={() =>
								handleOpenModal("EditUser", {
									userId: row.id,
								})
							}
						>
							Edit
						</span>

						{/* Delete User */}
						<span
							className="edit_btn edit-btn-action"
							onClick={() =>
								handleOpenModal("DeleteUser", {
									userId: row.id,
								})
							}
						>
							Delete
						</span>
					</TableCell>
				);
			},
		}
	];;

  const userData = [
    {
        id: 1,
        numericId: 101,
        ClientName: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
        commission: "5%",
        quickpay: "$100",
        regularpay: "$150",
        isBlock: false,
    },
    {
        id: 2,
        numericId: 102,
        ClientName: "Jane Smith",
        email: "jane.smith@example.com",
        phoneNumber: "9876543210",
        commission: "7%",
        quickpay: "$200",
        regularpay: "$250",
        isBlock: true,
    },
    {
        id: 3,
        numericId: 103,
        ClientName: "Alice Johnson",
        email: "alice.johnson@example.com",
        phoneNumber: "4561237890",
        commission: "10%",
        quickpay: "$300",
        regularpay: "$350",
        isBlock: false,
    },
    {
        id: 4,
        numericId: 104,
        ClientName: "Bob Williams",
        email: "bob.williams@example.com",
        phoneNumber: "7894561230",
        commission: "8%",
        quickpay: "$400",
        regularpay: "$450",
        isBlock: false,
    },
    {
        id: 5,
        numericId: 105,
        ClientName: "Charlie Brown",
        email: "charlie.brown@example.com",
        phoneNumber: "3216549870",
        commission: "6%",
        quickpay: "$500",
        regularpay: "$550",
        isBlock: true,
    },
];

  // custom PopUp function
  const handleOpenModal = (type, data) => {
    switch (type) {
      case "DeleteCommonModal":
      case "BlockUser":
      case "CommonPop":
      case "ExportFilePopup": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      case "AddTraderUser": {
        setModalDetails({
          ...modalDetails,
          modalValue: data,
          modalName: type,
          modalIsOpen: true,
        });
        break;
      }
      default: {
        setModalDetails({ ...modalDetails, modalIsOpen: false });
      }
    }
  };

  const userRedirectApi = () => {
    getUserListData(filterData.startDate, filterData.endDate);
  };

  useEffect(() => {
    setPagination({
      rowsPerPage: 10,
      page: 0,
      startRange: "",
      endRange: "",
    })
  }, [filterData?.platformName,filterData?.statusValue,filterData?.state])

  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
    // Logic for filtering/searching can be added here  
  };

  return (
    <Box>
      <Paper sx={{ mb: 2 }} className="outer-box">
        <div className={"d_flex justify_content_between"}>
          <h2>User ({userList?.list == 0 ? 0 : userList?.totalDocs})</h2>
          {/* <div className={"d_flex"}>
            <MainCommonFilter
              filterData={filterData}
              setFilterData={setFilterData}
              searchApiHandler={getUserListData}
              pagination={pagination}
              setPagination={setPagination}
              plateFormOption={[
                "All Users",
                "Blocked Users Accounts",
                "Unblocked Users Accounts",
              ]}
              addPropsFilter={{
                isGameList: true,
                isPending: true,
                isAllUser: true,
                userStateOption: userList?.stateOptions,
                userPayment: userList?.list?.length <= 0,
              }}
              isSearchTooltip={{ isAllUser: true }}
              handleOpenModal={handleOpenModal}
              totalDocs={userList?.totalDocs}
            />
          </div> */}
          <div className={"d_flex justify_content_between"} style={{ gap: '10px' }}>
              <SearchInput onSearch={handleSearch} />
              <button
                className={"btn"}
                onClick={() =>
                  handleOpenModal("AddTraderUser", { isEdit: false })
                }
              >
                {" "}
                + Add User
              </button>
            </div>
        </div>
        <CustomTable
          headCells={columns}
          // rowData={userList?.list}
          rowData={userData}
          totalDocs={userList?.totalDocs}
          pagination={pagination}
          setPagination={setPagination}
          loading={loader}
        />
      </Paper>
      <CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
          redirectApiHandler={userRedirectApi}
        />
      </CommonModal>
    </Box>
  );
};
export default Users;
