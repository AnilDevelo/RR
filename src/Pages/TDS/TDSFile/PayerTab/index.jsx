import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import PayerPerson from "./PayerPerson";
import ResponsiblePerson from "./ResponsiblePerson";

const PayerTab = () => {

    return(
        <Box>
            <PayerPerson/>
            <ResponsiblePerson/>
        </Box>
    )
}
export default PayerTab