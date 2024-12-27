import React, {useEffect, useState} from "react";
import DailyWheelBonusConfig from "../DailyWheelBonusConfig";
import DailyBonusMaxAmount from "./DailyBonusMaxAmount";
import DailyWheelBonusType from "./DailyWheelBonusType";
import Loader from "../../../../images/Loader";
import TableLoader from "hoc/CommonTable/TableLoader";

const DailyWheelBonusConfigTab = () => {

    return(
        <>
            {/* {
                loader &&
                <TableLoader />
            } */}
            <div className={'monthly-refer-earn-details-table'}>
                <DailyWheelBonusConfig />
                {/* <DailyBonusMaxAmount  /> */}
            </div>
            <div>
                <DailyWheelBonusType/>
            </div>
        </>
    )
}
export default DailyWheelBonusConfigTab