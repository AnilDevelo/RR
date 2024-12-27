import React, {useState} from "react";
import LogoType from './LogoType';
import ImageType from './ImageType';
import SelectLoginScreenTypeConfig from './SelectLoginScreenTypeConfig';


const LogoAndImage = ({rowData, getLogoListDetails}) => {
    const [helpType, setHelpType] = useState("")

    return(
           <>
           <SelectLoginScreenTypeConfig setHelpType={setHelpType} />
           {helpType === "Logo" ?
           <LogoType rowData={rowData} getLogoListDetails={getLogoListDetails}/> :
           <ImageType rowData={rowData} getLogoListDetails={getLogoListDetails}/>
           }
        </>

    )
}
export default LogoAndImage