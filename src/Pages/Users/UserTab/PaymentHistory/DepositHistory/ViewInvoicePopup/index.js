import React from "react";
import { Box } from "@mui/material";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const ViewInvoicePopup = ({ modalValue, handleOpenModal }) => {

  return (
    <Box sx={style} className={"user_popup_section h2h_details_view_popup ViewInvoicePopup"}>
      <p className={"custom_close_btn"} onClick={() => handleOpenModal()}>
        <svg
          viewBox="0 0 24 24"
          x="1008"
          y="432"
          fit=""
          height="28"
          width="25"
          preserveAspectRatio="xMidYMid meet"
          focusable="false"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
            fill="#64748b"
          />
        </svg>
      </p>
      <div className="invoice-box">
        <p className="Acknowledgement">Acknowledgement</p>
        <div className="compony_info">
          <div className="top">
            <div>
              <p>
                <b>Payout Solutions Private Limited</b> <br />
                C-301, Diamond World, Varachha <br />
                Road, Kohinoor Rd, Mini Bazar,
                <br />
                Surat, Gujarat 395006
              </p>
            </div>
            <div>
              <p>
                Invoice No. {modalValue.invoiceNumber} <br />
                Date: {moment(modalValue?.createdAt).format("DD-MM-YYYY")}
              </p>
            </div>
          </div>
          <div className="information">
            <div>
              <p style={{ fontWeight: "bold" }}>{modalValue?.userId?.nickName}</p>
            </div>
            <div>
              <p style={{ fontWeight: "bold" }}>
                Transaction Id: {modalValue?.transactionId}
              </p>
            </div>
          </div>
        </div>
        <div className="heading">
          <p>Add Cash Amount</p>
          <p>₹{modalValue?.amount}</p>
        </div>
        <div className="item">
          <p>Deposit amount (excl. Govt. Text)</p>
          <p style={{ color: "green" }}>₹{modalValue?.netCreditedAmount}</p>
        </div>
        <div className="item">
          <p>Govt. Tax ({modalValue?.platformGSTPercentage || 0}% GST)</p>
          <p style={{ color: "red" }}> - ₹{modalValue?.newGSTAmount}</p>
        </div>
        <div className="item">
          <p>Cashback Bonus</p>
          <p style={{ color: "green" }}>+ ₹{modalValue?.newGSTAmount}</p>
        </div>
        <hr />
        <div className="item" style={{border:"none",background: "#dfdfdf"}}>
          <p style={{fontWeight: "700"}}>Total Amount</p>
          <p style={{ color: "green",fontWeight: "700" }}>₹{modalValue?.amount}</p>
        </div>
        <div className="terms_condi">
          <div className="terms">
            <p>
              <b>Terms & Conditions:</b> Refer To{" "}
            </p>
          </div>
        </div>
        <div className="condi">
          <p style={{ margin: "0" }}>
            <b>Privacy & Policy:</b> Refer To{" "}
          </p>
        </div>
      </div>
    </Box>
  );
};
export default ViewInvoicePopup;
