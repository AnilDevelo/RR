import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import CustomTable from "hoc/CommonTable";
import PopComponent from "hoc/PopContent";
import CommonModal from "hoc/CommonModal";

const Users = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [modalDetails, setModalDetails] = useState({
        modalValue: "",
        modalName: "",
        modalIsOpen: false,
      });

      let Modal = PopComponent[modalDetails.modalName];
    const [userList, setUserList] = useState({
        list: [
            {
                id: 1,
                numericId: 101,
                name: "John Doe",
                email: "john.doe@example.com",
                phoneNumber: "1234567890",
                requestDateTime: "2024-12-01 10:00:00",
                rechargeAmount: "$50",
                transactionId: "TXN12345",
                bankName: "Bank A",
                accountHolder: "John Doe",
                accountNumber: "123456789",
                ifscCode: "BANK0001",
                status: "Pending",
            },
            {
                id: 2,
                numericId: 102,
                name: "Jane Smith",
                email: "jane.smith@example.com",
                phoneNumber: "9876543210",
                requestDateTime: "2024-12-02 11:00:00",
                rechargeAmount: "$100",
                transactionId: "TXN67890",
                bankName: "Bank B",
                accountHolder: "Jane Smith",
                accountNumber: "987654321",
                ifscCode: "BANK0002",
                status: "Completed",
            },
        ],
        totalDocs: 2,
    });
    const [pagination, setPagination] = useState({
        rowsPerPage: 10,
        page: 0,
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [bankDetails, setBankDetails] = useState("");
    const [amount, setAmount] = useState("");

    const handleModalOpen = (request) => {
        setSelectedRequest(request);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedRequest(null);
        setBankDetails("");
        setAmount("");
    };

    const handleSendPaymentDetails = () => {
        if (!bankDetails || !amount) {
            alert("Please fill in all fields!");
            return;
        }
        // Simulate sending payment details
        alert(`Payment details sent for ${selectedRequest.name}`);
        handleModalClose();
    };

    const getUserListData = () => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 500);
    };

    useEffect(() => {
        getUserListData();
    }, [pagination.rowsPerPage, pagination.page]);

    const handleOpenModal = (type, data) => {
        switch (type) {
          
          case "ViewBank": {
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


    let columns = [
        {
            id: "ClientId",
            numeric: false,
            disablePadding: false,
            label: "Client ID",
            type: "custom",
            render: (row) => (
                <TableCell>
                    <span
                        className="edit_btn"
                        onClick={() => navigate(`/users-tab/${row.id}`)}
                    >{`CID000${row?.numericId}`}</span>
                </TableCell>
            ),
        },
        {
            id: "name",
            numeric: true,
            disablePadding: false,
            label: "Client Name",
            render: (row) => <TableCell>{row.name}</TableCell>,
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
            id: "rechargeAmount",
            numeric: false,
            label: "Deposit Amount",
        },
        {
            id: "transactionId",
            numeric: false,
            label: "Transaction ID",
        },
        {
            id: "bankDetails",
            numeric: false,
            label: "Client Bank Details",
            type: "custom",
            render: (row) => (
                <TableCell style={{cursor:"pointer"}} onClick={()=>  handleOpenModal("ViewBank", { row })}>
                    view
                </TableCell>
            ),
        },
        {
            id: "requestDateTime",
            numeric: false,
            label: "Created Date & Time",
        },
        {
            id: "status",
            numeric: false,
            label: "Status",
        },
        {
            id: "action",
            numeric: false,
            label: "Action",
            type: "custom",
            render: (row) => (
                <TableCell>
                    {row.status === "Pending" && (
                        <Button
                            variant="contained"
                            // color="primary"
                            onClick={() => handleModalOpen(row)}
                        >
                            Enter Bank Account
                        </Button>
                    )}
                </TableCell>
            ),
        },
    ];

    return (
        <Box>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className="d_flex justify_content_between">
                    <h2>User ({userList?.list.length})</h2>
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

            {/* Modal for sending payment details */}
            {/* <Modal
    open={modalOpen}
    onClose={handleModalClose}
    aria-labelledby="send-payment-details-title"
    aria-describedby="send-payment-details-description"
>
    <Box
        sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
        }}
    >
        <h3 id="send-payment-details-title">Send Payment Details</h3>
        <TextField
            select
            label="Bank Details"
            value={bankDetails}
            onChange={(e) => setBankDetails(e.target.value)}
            fullWidth
            margin="normal"
        >
            <MenuItem value="Super Admin Bank">Super Admin Bank</MenuItem>
            <MenuItem value="Trader Bank">Trader Bank</MenuItem>
        </TextField>
        <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
        />
        <Button
            variant="contained"
            color="primary"
            onClick={handleSendPaymentDetails}
            fullWidth
            sx={{ mt: 2 }}
        >
            Send Details
        </Button>
    </Box>
</Modal> */}

<CommonModal
        className={"Approved-reject-section"}
        modalIsOpen={modalDetails.modalIsOpen}
        handleOpenModal={handleOpenModal}
      >
        <Modal
          modalValue={modalDetails.modalValue}
          handleOpenModal={handleOpenModal}
          modalIsOpen={modalDetails.modalIsOpen}
        />
      </CommonModal>
        </Box>
    );
};

export default Users;
