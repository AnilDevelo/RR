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
	const [dateFilter, setDateFilter] = useState(filterData);
	let prevDateFilter = React.useRef(dateFilter);

	useEffect(() => {
		if (filterData?.statusValue === 'Custom' && filterData.startDate === null && filterData.endDate === null && prevDateFilter?.current?.statusValue !== 'Custom') {
			getUserListData(prevDateFilter?.current?.startDate, prevDateFilter?.current?.endDate);
		}
		else if (filterData.startDate && filterData.endDate || filterData?.statusValue === 'All Days') {
			getUserListData(filterData.startDate, filterData.endDate, filterData.search);
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
			state: state === 'All States' ? '' : state,
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
				window.open(res?.data?.data?.filePath, "_blank");
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
			label: "Client ID",
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
			label: "Client Name",
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
								Block User Account
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
							Edit User
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
							Delete User
						</span>
					</TableCell>
				);
			},
		}
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
			case "AddAdminUserList": {
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

	const handleSearch = (searchTerm) => {
		console.log("Search term:", searchTerm);
		// Logic for filtering/searching can be added here  
	};

	useEffect(() => {
		setPagination({
			rowsPerPage: 10,
			page: 0,
			startRange: "",
			endRange: "",
		})
	}, [filterData?.platformName, filterData?.statusValue, filterData?.state])
	return (
		<Box>
			<Paper sx={{ mb: 2 }} className="outer-box">

				<div className={"d_flex justify_content_between"}>
					<h2>User ({userList?.list == 0 ? 0 : userList?.totalDocs})</h2>
					<div className={"d_flex justify_content_between"} style={{gap:'10px'}}>
						  <SearchInput onSearch={handleSearch} /> 
						<button
							className={"btn"}
							onClick={() =>
								handleOpenModal("AddAdminUserList", { isEdit: false })
							}
						>
							{" "}
							+ Add Client
						</button>
					</div>
				</div>
				<CustomTable
					headCells={columns}
					rowData={userList?.list}
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
