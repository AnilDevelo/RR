import React, {useEffect, useRef, useState} from "react";
import {isValidUrl} from "../../../../../../../utils";
import ReactPlayer from "react-player";

const VideoTab = ({formData, setFormData, handleOpenModalError, simpleValidator}) => {
    const videoRef = useRef();

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length === 11)? match[7] : false;
    }

    useEffect(() => {
        if(videoRef?.current){
            videoRef?.current?.load();
            videoRef?.current.play();
        }

    }, [formData?.howToPlayVideo]);

    return(
        <>
            <div className="formData formData_field header_slider_details_Ads">
                {/*<div className={'common_checkbox_details'}>*/}
                {/*    <div className={'game_mode_btn'}>*/}
                {/*        <div className={'game_mode_btn_option yes_radio_btn'}>*/}
                {/*            <input type={'radio'} name={'isVideoLink'} checked={formData?.isVideoLink}   onChange={() => setFormData({ ...formData, isVideoLink: true, howToPlayVideo: '' })} />*/}
                {/*            <label>Video Link</label>*/}
                {/*        </div>*/}
                {/*        <div className={'game_mode_btn_option no_radio_btn'}>*/}
                {/*            <input type={'radio'} name={'isVideoLink'} checked={!formData?.isVideoLink}  onChange={() => setFormData({ ...formData, isVideoLink: false, howToPlayVideo: '' })} />*/}
                {/*            <label>Upload Video</label>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*{*/}
                {/*    formData?.isVideoLink  &&*/}
                {/*    <div>*/}
                {/*        <div className="emailWrap">*/}
                {/*            <input type="text" name='howToPlayVideo' placeholder={'Enter Video Link'} value={formData?.howToPlayVideo} onChange={(e) => setFormData({ ...formData, howToPlayVideo: e.target.value })} />*/}
                {/*        </div>*/}
                {/*        {*/}
                {/*            (formData?.isVideoLink &&  !isValidUrl(formData?.howToPlayVideo)) ?*/}
                {/*                simpleValidator.current.message("EnterValidVideoLink", videoLinkError, 'required')*/}
                {/*                :*/}
                {/*                simpleValidator.current.message("videoLink", formData?.howToPlayVideo, 'required')*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*}*/}

                <div className='user_profile'>
                    <div className={'header_section_slider'}>
                        <div className='user_profile_pic'>
                            <p>Choose Video</p>
                            <span className='add_new'>
                                         <input type='file' name='playVideo' accept=".mp4"   onChange={(e)=>  {
                                             if(e.target.files[0]?.type?.includes('video/')){
                                                 setFormData({...formData, howToPlayVideo: e.target.files[0], isVideoUpdate: true})
                                             }else {
                                                 handleOpenModalError('CommonPop', { header: "Error", body: 'Support Only Video File' })
                                             }
                                         }} />
                                    </span>
                        </div>
                    </div>
                    {simpleValidator.current.message("video", formData?.howToPlayVideo, "required")}
                </div>

                {
                    formData?.howToPlayVideo &&
                    <div className={'video-preview mt_2'}>
                        {
                            youtube_parser(typeof formData?.howToPlayVideo === 'string' ?  formData?.howToPlayVideo : URL.createObjectURL(formData?.howToPlayVideo)) ?
                                <ReactPlayer url={typeof formData?.howToPlayVideo === 'string' ?  formData?.howToPlayVideo : URL.createObjectURL(formData?.howToPlayVideo)}  width="100%" height="100%" />
                                :
                                <video ref={videoRef} width="100%" height="240" controls muted>
                                    <source src={typeof formData?.howToPlayVideo === 'string' ?  formData?.howToPlayVideo : URL.createObjectURL(formData?.howToPlayVideo)} />
                                </video>
                        }
                    </div>
                }
            </div>
        </>
    )
}
export default VideoTab