import React from "react";
import UploaderImages from "../../../../../../../Components/UploaderImages";

const ImageSliderTab = ({modalValue, deleteScreenShort, setDeleteScreenShort, formData, setFormData}) => {
    return(
        <>
            <div className={'common_checkbox_details'}>
                <div className={'game_mode_btn'}>
                    <div className={'game_mode_btn_option yes_radio_btn'}>
                        <input type={'radio'} name={'isPortraitMode'} checked={formData?.isPortraitMode}   onChange={() => setFormData({ ...formData, isPortraitMode: true})} />
                        <label>Portrait Mode</label>
                    </div>
                    <div className={'game_mode_btn_option no_radio_btn'}>
                        <input type={'radio'} name={'isPortraitMode'} checked={!formData?.isPortraitMode}  onChange={() => setFormData({ ...formData, isPortraitMode: false })} />
                        <label>Landscape Mode</label>
                    </div>
                </div>
            </div>
            <div className={'formData_field upload_img_section'}>
                <UploaderImages
                    setFormData={setFormData}
                    formData={formData}
                    modalValue={modalValue?.row}
                    isHowToPlay={true}
                    setDeleteScreenShort={setDeleteScreenShort}
                    deleteScreenShort={deleteScreenShort} />
            </div>
        </>
    )
}
export default ImageSliderTab