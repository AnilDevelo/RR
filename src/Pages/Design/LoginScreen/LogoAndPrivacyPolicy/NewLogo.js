import React, { useEffect, useRef, useState } from "react";
import { convertToRaw, EditorState ,ContentState} from "draft-js";
import PopComponent from "../../../../hoc/PopContent";
import { useDispatch } from "react-redux";
import Loader from "../../../../images/Loader";
import Paper from "@mui/material/Paper";
import { Editor } from "react-draft-wysiwyg";
import CommonModal from "../../../../hoc/CommonModal";
import draftToHtml from "draftjs-to-html";
import { documentationUploadImages } from "../../../../Redux/Documentation/action";
import { hideActionFunc, jsonToFormData, profileImages } from "../../../../utils";
import SimpleReactValidator from "simple-react-validator";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import icon_plus from "../../../../assets/images/plus.svg";
import user from "../../../../assets/images/avatar.png";
import TableCell from "@mui/material/TableCell";
import {ActionFunction} from "../../../../utils";
import { AddLoginScreenPrivacyPolicy, DesignLoginScreen, getDesignLoginScreen } from "Redux/Design/action";
import CustomTable from "hoc/CommonTable";
import htmlToDraft from "html-to-draftjs";
import TableLoader from "hoc/CommonTable/TableLoader";


const LogoAndPrivacyPolicy = () => {
    const simpleValidator = useRef(new SimpleReactValidator());
    const [formData, setFormData] = useState({
        companyLogoImage: "",
        isImageUpdated: false,
        type: "Logo",
        privacyPolicy: "",
        // rowData: {},
    });

    const [rowData, setRowData] = useState([formData.companyLogoImage]);
    const [policy, setPolicy] = useState()
    const [pagination, setPagination] = useState({ rowsPerPage: 10, page: 0 });
    const [loader, setLoader] = React.useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [modalDetails, setModalDetails] = useState({
        modalValue: "",
        modalName: "",
        modalIsOpen: false,
    });
    let Modal = PopComponent[modalDetails.modalName];


    const dispatch = useDispatch();

    useEffect(() => {
        getDesignLoginScreen()
    }, []);




    const handleSubmit = () => {
        let payload = {
            companyLogoImage: formData?.companyLogoImage,
            isImageUpdated: formData?.isImageUpdated,
            type: formData.type,
            privacyPolicy : formData?.privacyPolicy
        };
        if (!payload.isImageUpdated) {
            delete payload.companyLogoImage;
        }

        dispatch(DesignLoginScreen(jsonToFormData(payload))).then((res) => {
            if (res.data.success) {
                handleOpenModal("CommonPop", {
                    header: "Success",
                    body: res.data.message,
                });
                getPrivacyPolicyData();
            } else {
                handleOpenModal("CommonPop", {
                    header: "Error",
                    body: res.data.message || res.data.msg,
                });
            }
        });
    };
    const getPrivacyPolicyData = () => {
        setLoader(true);

        dispatch(getDesignLoginScreen({})).then((res) => {
            setLoader(false);

            setFormData({
                ...formData,
                companyLogoImage:res.data.data.companyLogoImage ,
                type: res.data.data.type,
                privacyPolicy: res.data.data.privacyPolicy
            });



        });
    };

    useEffect(() => {
        getPrivacyData();
    }, []);

    const getPrivacyData = () => {
        setLoader(true);
        dispatch(getDesignLoginScreen({})).then(res => {
            setPolicy(res?.data.data)
            setLoader(false);
        });
    };
    useEffect(() => {
        if (policy) {

            const contentBlock = htmlToDraft(policy?.privacyPolicy);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState);
            }
        }
    }, [policy]);

    const onEditorStateChange = (editorState) => {

        setEditorState(editorState);

    };
    const handleOpenModal = (type, data) => {
        switch (type) {
            case "UpdatePrivacyPolicy": {
                setModalDetails({
                    ...modalDetails,
                    modalValue: data,
                    modalName: type,
                    modalIsOpen: true,
                });
                break;
            }
            case "CommonPop": {
                setModalDetails({
                    ...modalDetails,
                    modalValue: data,
                    modalName: type,
                    modalIsOpen: true,
                });
                break;
            }
            case "AddSplashScreen": {
                setModalDetails({
                    ...modalDetails,
                    modalValue: data,
                    modalName: type,
                    modalIsOpen: true,
                });
                break;
            }
            case "ViewHowToPlayPopup": {
                setModalDetails({
                    ...modalDetails,
                    modalValue: data,
                    modalName: type,
                    modalIsOpen: true,
                });
                break;
            }

            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false });
            }
        }
    };

    const uploadImageCallBack = (file) => {
        return new Promise((resolve, reject) => {
            const fileData = new FormData();
            fileData.append("documentationImage", file);
            dispatch(documentationUploadImages(fileData))
                .then((res) => {
                    if (res.data.success) {
                        resolve({ data: { link: res.data.data.imageLink } });
                    }
                })
                .catch((err) => {
                    reject(err.message);
                    handleOpenModal("ErrorPop", { header: "Error", body: err.message });
                });
        });
    };

    const gameLogoHandler = (e) => {
        let img = new Image();
        img.src = window.URL.createObjectURL(e.target.files[0]);
        img.onload = () => {
            if (img.width === 512 && img.height === 512) {
                setFormData({
                    ...formData,
                    companyLogoImage: e.target.files[0],
                    isImageUpdated: true,
                    privacyPolicy: ""
                });
            } else {
                handleOpenModal("CommonPop", {
                    header: "Error",
                    body: "The width and height of the image should be  512 * 512 size",
                });
            }
        };
    };

    const handleSubmitPrivacyPolicy = () => {
        let payload = {

            privacyPolicy: draftToHtml(convertToRaw(editorState.getCurrentContent())),

        };

        // if (!payload.isImageUpdated) {
        //   delete payload.privacyPolicy;
        // }
        dispatch(AddLoginScreenPrivacyPolicy(payload)).then((res) => {
            if (res.data.success) {
                handleOpenModal("CommonPop", {
                    header: "Success",
                    body: res.data.message,
                });
            } else {
                handleOpenModal("CommonPop", {
                    header: "Error",
                    body: res.data.message || res.data.msg,
                });
            }
        });
    };


    const columns = [
        {
            id: 'rowData',
            label: 'Image',
            type: 'custom',
            render: () => {
                return  <TableCell >  <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('ViewHowToPlayPopup', formData)}
                >View</span></TableCell>
            }
        },
        ActionFunction('master', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'custom',
            render: (row) => {
                return <TableCell className={'role_field_id'}>
                <span className='edit_btn edit-btn-action' onClick={() =>
                    handleOpenModal("AddSplashScreen", { isEdit: true,row })
                }>Edit</span>
                </TableCell>
            }
        })
    ];
    return (
        <>
            {loader ? <TableLoader /> : ""}
            <Paper sx={{ mb: 2 }} className="outerbox game-rules-section">
                <div className={"formData policy_form"}>
                    <div
                        className={
                            "select_game_platform_value game_mode game_mode_main_section "
                        }
                    >
                        <div className={"select_label tab01 game_mode_left_details "}>
                            <label>Type</label>

                            <div className={"game_mode_btn"}>
                                <div className={"game_mode_btn_option"}>
                                    <input

                                        type={"radio"}
                                        name={"isDummyPlayer"}
                                        checked={formData?.type === "Logo"}
                                        onChange={(e) => setFormData({ ...formData, type: "Logo" })}
                                    />

                                    <label>Logo</label>
                                </div>
                                <div className={"game_mode_btn_option tab_radio"}>
                                    <input
                                        type={"radio"}
                                        name={"isDummyPlayer"}
                                        checked={formData?.type === "Image"}
                                        onChange={(e) =>
                                            setFormData({ ...formData, type: "Image" })
                                        }
                                    />

                                    <label>Image</label>
                                </div>
                            </div>
                            {simpleValidator.current.message(
                                "type",
                                formData?.type,
                                "required"
                            )}
                        </div>
                    </div>

                    {formData.type === "Image" ? (
                        <div className={"game-play-rules"}>

                            <CustomTable
                                headCells={columns}
                                rowData={rowData}
                                totalDocs={rowData?.totalDocs}
                                pagination={pagination}
                                setPagination={setPagination}
                                isWinnerTitle={true}
                            />
                        </div>
                    ) : (
                        <div className={"policy_title"}>
                            <label className={"fontFamily"}>Logo</label>

                            {/*--------------------------------------- Game Logo [Start] ----------------------------------------- */}
                            <div className="form_group profile new_game_section profile-image-dropdown">
                                <div>
                                    <div className="user_profile">
                                        <div className="user_profile_pic">
                                            {profileImages(formData?.companyLogoImage[0], user)}

                                            {!formData?.companyLogoImage[0] && (
                                                <span className="addnew">
                          <img src={icon_plus} alt="" />
                          <input
                              type="file"
                              name="member_photo"
                              id=""
                              onChange={(e) => gameLogoHandler(e)}
                          />
                        </span>
                                            )}
                                        </div>
                                    </div>

                                    {simpleValidator.current.message(
                                        "companyLogoImage",
                                        formData?.companyLogoImage,
                                        "required"
                                    )}
                                </div>
                                {formData?.companyLogoImage && (
                                    <div
                                        className={"close-icon"}
                                        onClick={() => setFormData({ ...formData, companyLogoImage: "" })}
                                    >
                                        <CloseSharpIcon />
                                    </div>
                                )}
                            </div>
                            {/*--------------------------------------- Game Logo [End] ----------------------------------------- */}
                        </div>
                    )}
                </div>

                {hideActionFunc("master") && (
                    <>
                        <div className={"game-play-rules"}>
                            <button className={"fontFamily"} onClick={(e) => handleSubmit(e)}>
                                Save
                            </button>&nbsp;
                            <button className={"fontFamily"} onClick={(e) => handleSubmit(e)}>
                                Update
                            </button>
                        </div>

                    </>
                )}
            </Paper>
            <Paper sx={{ mb: 2 }} className="outerbox game-rules-section">
                <div className={"text-editor-details-section"}>
                    <label className={"fontFamily"}>Privacy Policy</label>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={(editorState) => onEditorStateChange(editorState)}
                        toolbar={
                            {
                                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link','image'],
                                fontFamily: {
                                    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Inter'],
                                },
                                image: {
                                    urlEnabled: false,
                                    uploadEnabled: true,
                                    alignmentEnabled: false,
                                    uploadCallback: uploadImageCallBack,
                                    previewImage: true,
                                    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                    alt: { present: false, mandatory: false },
                                    defaultSize: {
                                        height: '100%',
                                        width: '100%',
                                    },
                                },
                            }
                        }
                        toolbarClassName="rdw-editor-toolbar-custom"
                        wrapperClassName="rdw-editor-wrapper-custom"
                        editorClassName="editor-content-details"
                    />
                </div>
                {hideActionFunc("master") && (
                    <>
                        <div className={"game-play-rules"}>
                            <button className={"fontFamily"} onClick={(e) => handleSubmitPrivacyPolicy(e)}>
                                Save
                            </button>&nbsp;
                            <button className={"fontFamily"} onClick={(e) => handleSubmitPrivacyPolicy(e)}>
                                Update
                            </button>
                        </div>

                    </>
                )}
            </Paper>
            <CommonModal
                className={"Approved-reject-section"}
                modalIsOpen={modalDetails.modalIsOpen}
                handleOpenModal={handleOpenModal}
            >
                <Modal
                    modalValue={modalDetails.modalValue}
                    handleOpenModal={handleOpenModal}
                    modalIsOpen={modalDetails.modalIsOpen}
                    redirectApiHandler={getPrivacyPolicyData}
                />
            </CommonModal>
        </>
    );
};
export default LogoAndPrivacyPolicy;
