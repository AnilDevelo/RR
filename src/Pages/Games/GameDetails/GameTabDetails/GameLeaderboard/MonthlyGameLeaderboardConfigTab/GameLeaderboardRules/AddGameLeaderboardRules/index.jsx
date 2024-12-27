import React, {useCallback, useEffect, useRef, useState} from "react";
import PopComponent from "../../../../../../../../hoc/PopContent";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import Box from "@material-ui/core/Box";
import TextEditorTab from "../../../../HowToPlayGameTab/CreateHowToPlayGame/TextEditorTab";
import FilledButton from "../../../../../../../../Components/FileButton";
import CommonModal from "../../../../../../../../hoc/CommonModal";
import {createLeaderboardRules} from "../../../../../../../../Redux/Documentation/action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const AddGameLeaderboardRules = ({ modalValue, handleOpenModal, redirectApiHandler }) => {
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false })
    let Modal = PopComponent[modalDetails?.modalName];
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({
        value:''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            gameId:id,
            leaderboardRules: formData?.value
        }
        setLoader(true)
        dispatch(createLeaderboardRules(payload)).then(res => {
            setLoader(false)
            if (res.data.success) {
                handleOpenModal('CommonPop', { header: "Success", body: res.data.message });
                redirectApiHandler();
            } else {
                handleOpenModal('CommonPop', { header: "Error", body: (res.data.message || res.data.msg) });
            }
        })
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

    useEffect(()=>{
        if(modalValue?.isEdit){
            setFormData({
                ...formData,
                value: modalValue?.row
            })
        }
    }, [modalValue?.isEdit])
    
    return (
        <Box sx={style} className={'how_to_play_section_details modal_main_popup video-tickets-section'}>
            <div className={'game_details_view add_admin_user_popup'}>
                <div className={'modal_popup_title'}>
                    {modalValue?.isEdit ? <h2>Update Leaderboard Rules</h2> : <h2>Add Leaderboard Rules</h2>}
                </div>
            </div>
            <div className={'add_game_details_sec add_admin_user_popup_content mt_2'}>
                <form onSubmit={ (e) => handleSubmit(e)} method="post" encType="multipart/form-data">
                    <div className={'game_display_form'}>
                        <TextEditorTab formData={formData} setFormData={setFormData} />
                        <div className={formData?.type === 'ImageSlider' ? 'formData_btn mt_2 d_flex_end form_common_btn add_game_btn_details' : 'formData_btn mt_2 d_flex_end form_common_btn add_game_btn_Top'}>
                            <button className={'btn_default'} type={'reset'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton
                            type={'submit'}
                            value={modalValue?.isEdit ? 'Update' : 'Save'}
                            // className={!formData?.value || formData.value === '<p><br></p>' || formData.value === '<p></p>' ? "disabled_button" : "btn loader_css"}
                            loading={loader}
                            // disabled={!formData?.value || formData.value === '<p><br></p>' || formData.value === '<p></p>'}
                        />
                        </div>
                    </div>
                </form>
            </div>
            {/*<WithoutSameOptionForm  handleOpenModalError={handleOpenModalError} modalValue={modalValue} handleOpenModal={handleOpenModal} />*/}
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModalError}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModalError} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default AddGameLeaderboardRules