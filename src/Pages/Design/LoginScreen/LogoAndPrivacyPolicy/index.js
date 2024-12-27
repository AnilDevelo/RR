import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../../../../images/Loader";
import {  getDesignLoginScreen } from "Redux/Design/action";
import LogoAndImage from "./LogoAndImage";
import TableLoader from "hoc/CommonTable/TableLoader";

const LogoAndPrivacyPolicy = () => {
  const [rowData, setRowData] = useState({list:[]});
  const [loader, setLoader] = React.useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getLogoListDetails()
  }, []);

  const getLogoListDetails = () => {
    setLoader(true);
    dispatch(getDesignLoginScreen({})).then(res => {
      if (res.data.success) {
        setLoader(false);
        setRowData({
          ...rowData,
          list: Object.keys(res?.data?.data)?.length > 0 ? [res?.data?.data] : [],
          totalDocs: res?.data?.data?.totalDocs
        });
      }
    })
  }

  return (
    <>
      {loader && <TableLoader />}
      <LogoAndImage getLogoListDetails={getLogoListDetails} />
    </>
  );
};
export default LogoAndPrivacyPolicy;
