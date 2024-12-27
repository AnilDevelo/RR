import React from 'react'
import SelectTicketTypeConfig from './SelectTicketTypeConfig'
import VideoType from '../VideoAndImage/VideoType'
import ImageType from './ImageType'
import { useState } from 'react'
import { getLoginScreenTypeConfigList } from 'Redux/Design/action'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getTicketTypeConfig } from 'Redux/HelpAndSupport/action'

const VideoAndImage = ({ rowData, getLogoListDetails }) => {
    const [helpType, setHelpType] = useState("")



  return (
    <>
           <SelectTicketTypeConfig setHelpType={setHelpType}/>
           {helpType === "Video" ?
           <VideoType rowData={rowData} getLogoListDetails={getLogoListDetails}/> :
           <ImageType rowData={rowData} getLogoListDetails={getLogoListDetails}/>
           }
        </>
  )
}

export default VideoAndImage