import {useDispatch} from "react-redux";
import React, {useCallback, useEffect, useRef, useState} from "react";
import SimpleReactValidator from "simple-react-validator";
import PopComponent from "../../../../../hoc/PopContent";
import {Box} from "@mui/material";
import FilledButton from "../../../../../Components/FileButton";
import CommonModal from "../../../../../hoc/CommonModal";
import {addGenreList, editGenreList} from "../../../../../Redux/games/GenreGame/action";
import DropdownList from "../../../../../Components/Dropdown/DropdownList";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const AddGenreTypePopup = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({
        genreName: '',
        isEditable: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            // dispatch(addGenreList(formData)).then(res => {
            //     if (res.data.success) {
            //         setLoader(false)
            //         redirectApiHandler();
            //         handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
            //     } else {
            //         setLoader(false)
            //         handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
            //     }
            // })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    };

    const handleOpenModalError = (type, data) => {
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
        if (modalValue?.isEdit) {
            setFormData({
                ...formData,
                genreName: modalValue?.row?.genreName,
                isEditable: modalValue?.row?.isEditable
            })
        }
    }, [modalValue]);
    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true)
            let payload = {
                ...formData,
                genreId: modalValue?.row?._id
            }
            // dispatch(editGenreList(payload)).then(res => {
            //     if (res.data.success) {
            //         setLoader(false)
            //         redirectApiHandler();
            //         handleOpenModal('CommonPop', { header: "Success", body: res?.data?.message })
            //     } else {
            //         setLoader(false)
            //         handleOpenModalError('CommonPop', { header: "Error", body: res?.data?.message || res?.data?.msg })
            //     }
            // })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }
    return(
        <Box sx={style}>
            <div className={'add_admin_user_popup genre_popup_details'}>
                <div className={'add_admin_user_popup_title'}>
                    <h2>{modalValue?.isEdit ? 'Edit Genre Type' : `Add Genre Type`}</h2>
                </div>
                <div className={'add_admin_user_popup_content'}>
                    <form method={'POST'} onSubmit={modalValue?.isEdit ? (e) => handleEditSubmit(e) : (e) => handleSubmit(e)}>
                        <div className="formData">
                            <label>Genre Type Name </label>
                            <div className="emailWrap">
                                <input type="text" name='genreName' value={formData?.genreName} placeholder={'Enter Genre Type Name'} onChange={(e) => setFormData({ ...formData, genreName: e.target.value })} />
                            </div>
                            {simpleValidator.current.message("genreName", formData?.genreName, 'required')}
                        </div>
                        <div className={'formData_btn'}>
                            <button className={'cancel_btn'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={modalValue?.isEdit ? 'Update' : 'Save'} className={'submit_btn loader_css'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default AddGenreTypePopup