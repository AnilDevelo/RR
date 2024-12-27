import ImageUploading from "react-images-uploading";
import React, { useEffect } from "react";
import user from '../../../../assets/images/imgeUpload.svg';
import close from '../../../../assets/images/close_icon.svg';

let filterValue=[]
const UploaderImages = ({ formData, setFormData, modalValue, setDeleteScreenShort,isHowToPlay }) => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList) => {
        setImages(imageList);
        setFormData({
            ...formData,
            screenShots: imageList?.map(item => item?.file),
            isGameScreenShort: true
        })
    };

    useEffect(() => {
        let temp = [];
        if(isHowToPlay) {
            formData?.screenShots?.forEach(ele => {
                temp.push({ data_url: ele })
            })
            setImages(temp)
        }else {
            modalValue?.screenShots?.forEach(ele => {
                temp.push({ data_url: ele })
            })
            setImages(temp)
        }
    }, [modalValue]);

    const handleDelete = (img,index) => {
        filterValue.push({gameId : modalValue?._id,screenshot: img?.data_url});
        setDeleteScreenShort(filterValue)
    };

    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                type={'button'}
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
                            >
                                <img src={user} alt={'user'} />
                            </button>
                        </div>
                        <div className={'upload_img_slider'}>
                            {imageList.map((image, index) => {
                                return (
                                    <div key={index} className="image-item">

                                        <img src={image['data_url']} className={'image-upload'} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <div className={'close_upload_icon'}>
                                                <button onClick={() => {
                                                    onImageRemove(index)
                                                    handleDelete(image, index)
                                                }}  type={'button'}>
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
        </div>
    )
}
export default UploaderImages