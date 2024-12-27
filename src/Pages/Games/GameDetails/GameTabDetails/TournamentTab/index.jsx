import React, { useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../../images/Loader";
import RecurringTournament from "./RecurringTournament";
import SingleTournament from "./SingleTournament";
import TableLoader from "hoc/CommonTable/TableLoader";

const TournamentTab = ({ handleOpenModal }) => {
    const [loader, setLoader] = useState(false)

    return (
        <React.Fragment>
            <Box>
                {loader ? <TableLoader /> : ""}
                <RecurringTournament handleOpenModal={handleOpenModal} />
                {/*<SingleTournament handleOpenModal={handleOpenModal} />*/}
            </Box>
        </React.Fragment>
    )
}
export default TournamentTab