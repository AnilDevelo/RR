import ImageUploading from "react-images-uploading";
import React, {useEffect, useState} from "react";
import user from '../../assets/images/imgeUpload.svg';
import close from '../../assets/images/close_icon.svg';
import PopComponent from "../../hoc/PopContent";
import CommonModal from "../../hoc/CommonModal";
import {Box} from "@mui/material";

let filterValue = []
const UploaderImages = ({ formData, setFormData, modalValue, setDeleteScreenShort, isHowToPlay,isDisabled }) => {
    const [updateState,setUpdateState] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    const onChange = (imageList,addUpdateIndex) => {
        setImages(imageList);
        setFormData({
            ...formData,
            screenShots: imageList?.map(item => item?.file ? item?.file : item?.data_url),
            isGameScreenShort: true,
            isImageUpdate:true
        })
    };

    const handleOpenErrorModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };
    useEffect(() => {
        let temp = [];
        if(formData?.screenShots?.length > 0){
            if (isHowToPlay) {
                formData?.screenShots?.forEach(ele => {
                    temp.push({ data_url: ele.type ? URL.createObjectURL(ele) : ele })
                })
                setImages(temp)
            } else {
                modalValue?.screenShots?.forEach(ele => {
                    temp.push({ data_url:  ele.type ? URL.createObjectURL(ele) : ele })
                })
                setImages(temp)
            }
        }
        setUpdateState(true)
    }, [modalValue, updateState]);



    const handleDelete = (img, index) => {
        filterValue.push({ gameId: modalValue?._id, screenshot: img?.data_url });
        setDeleteScreenShort(filterValue);
    };

    const handleImageError = (errors, files) => {
        handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please Enter Only Image File' });
        if (errors && errors?.maxFileSize) {
            handleOpenErrorModal('CommonPop', { header: "Error", body: 'The image may not be greater than 5 MB.' });
        }
    }

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                onError={handleImageError}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                type={'button'}
                disabled={isDisabled}
                acceptType={['jpg', 'jpeg', 'png']}
                maxFileSize={5000000}
            >
                {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <div className={'upload__image_section'}>
                            <button
                                type={'button'}
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                disabled={isDisabled}
                            >
                                <img src={user} alt={'user'} />
                            </button>
                        </div>
                        <div className={'upload_img_slider'}>
                            {imageList?.map((image, index) => {
                                return (
                                    <div key={index} className="image-item">

                                        <img src={image['data_url']} className={'image-upload'} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <div className={'close_upload_icon'}>
                                                <button onClick={() => {
                                                    onImageRemove(index)
                                                    handleDelete(image, index)
                                                }} type={'button'}>
                                                    <img src={close} alt={'close'} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </ImageUploading>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenErrorModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenErrorModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </div>
    )
}
export default UploaderImages