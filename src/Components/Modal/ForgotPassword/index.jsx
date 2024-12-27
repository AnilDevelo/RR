import React, { useCallback, useRef, useState } from "react";
import { Box } from "@mui/material";
import FilledButton from "../../FileButton";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import { forgotPasswordHandler } from "../../../Redux/auth/action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};

const ForgotPassword = ({ handleOpenModal }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [formData, setFormData] = useState({ email: '' });
    const [, updateState] = useState({});
    const simpleValidator = useRef(new SimpleReactValidator({
        validators: {
            email: {
                message: "The email must be a valid email address.",
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val,/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
                },
                required: true
            }
        }
    }));
    const forceUpdate = useCallback(() => updateState({}), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true);
            let payload = {
                ...formData
            }
            dispatch(forgotPasswordHandler(payload)).then(res => {
                if (res.data.success) {
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }
    }

    return (
        <Box sx={style}>
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                        <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                             preserveAspectRatio="xMidYMid meet" focusable="false">
                            <path
                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                                fill="#64748b" />
                </svg>
            </p>
            <div className={'forgot_password_modal'}>
                <div className={'title'}>
                    <h3>Forgot Password ?</h3>
                </div>
                <div className={'forgot_password_content'}>
                    <p>Enter your registered email. You will be sent a link to reset your password.</p>
                </div>
                <div className={'forgot_email_form'}>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="formData">
                            <label>Email address <span className={'validation-star'}>*</span></label>
                            <div className="emailWrap">
                                <input type="text" name='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                {simpleValidator.current.message("email", formData?.email, "required|email")}
                            </div>
                        </div>
                        <FilledButton type={'submit'} value={'Forgot Password'} className={'forgot-password-btn'} loading={loader} />
                    </form>
                </div>
            </div>
        </Box>
    )
}
export default ForgotPassword