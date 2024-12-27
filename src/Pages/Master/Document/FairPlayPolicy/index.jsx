import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import PopComponent from "../../../../hoc/PopContent";
import CommonModal from "../../../../hoc/CommonModal";
import Loader from "../../../../images/Loader";
import { hideActionFunc } from "../../../../utils";
import {
    createFairPlayPolicy,
    documentationUploadImages,
    getFairPlayPolicy
} from "../../../../Redux/Documentation/action";
import TextEditor from "../TextEditor";
import TableLoader from "hoc/CommonTable/TableLoader";

const FairPlayPolicy = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = React.useState(false);
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const [rowData,setRowData] = useState({})
    const [formData, setFormData] = useState({
        title:'',
        description:''
    });

    useEffect(() => {
        gameFairPlayPolicy();
    }, []);

    const gameFairPlayPolicy = () => {
        setLoader(true);
        dispatch(getFairPlayPolicy({})).then(res => {
            setRowData(res?.data?.data)
            setLoader(false)
        });
    };

    useEffect(()=>{
        if(Object.keys(rowData || {})?.length > 0){
            setFormData({
                ...formData,
                description: rowData?.fairPlayPolicy
            })
        }
    },[rowData])
    const fairPlayPolicySubmitHandler = () => {
        dispatch(createFairPlayPolicy({ fairPlayPolicy: formData?.description })).then(res => {
            if (res.data.statusCode === 200) {
                handleOpenModal('CommonPop', { header: "Success", body: res.data.message });
                gameFairPlayPolicy();
            } else {
                handleOpenModal('CommonPop', { header: "Error", body: (res.data.message || res.data.msg) });
            }
        })
    };

    const checkRchEmpty = (html = formData?.description) => {
        let div = document.createElement('div');
        div.innerHTML = html;
        let isImage = div?.getElementsByTagName?.('img')?.length > 0;
        if (isImage) {
            return false;
        }
        return (div.innerText.replaceAll('\n', '').trim() === '' || div.innerText.replaceAll('\n', '').trim() === 'undefined');
    };

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'UpdateFairPlayPolicy': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    const uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const fileData = new FormData();
                fileData.append('documentationImage', file)
                dispatch(documentationUploadImages(fileData)).then(res => {
                    if (res.data.success) {
                        resolve({ data: { link: res.data.data.imageLink } });
                    }
                }).catch(err => {
                    handleOpenModal('ErrorPop', { header: "Error", body: err.message })
                });
            }
        );
    }

    const handleEditor = (props)=>{
        setFormData({
            ...formData,
            description: props
        })
    };

    return (
        <>
            {loader ? <TableLoader /> : ""}
            <Paper sx={{ mb: 2 }} className="outer-box game-rules-section">
                <div className={'text-editor-details-section'}>
                    <label className={'fontFamily'}>Description</label>
                    <div className={'mt_margin'}>
                        <TextEditor handleChange={handleEditor} value={formData?.description} classNameProps={'policy_details'}/>
                    </div>
                </div>
                {
                    hideActionFunc('master') &&
                    <div className={'game-play-rules'}>
                        {
                            (checkRchEmpty() && Object.keys(rowData || {})?.length <= 0) ?
                                <button className={'btn mt_2'} onClick={(e) => fairPlayPolicySubmitHandler(e)}>Save Fair Play Policy</button>
                                :
                                <button className={'btn mt_2'} onClick={(e) => handleOpenModal('UpdateFairPlayPolicy', { fairPlayPolicy: formData?.description })}>Update Fair Play Policy</button>
                        }
                    </div>
                }

            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={gameFairPlayPolicy} />
            </CommonModal>
        </>
    )
}
export default FairPlayPolicy