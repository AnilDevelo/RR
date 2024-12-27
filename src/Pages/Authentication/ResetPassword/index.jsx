import React, { useRef, useState } from "react";
import eye_open_icon from "../../../assets/images/eye_open_icon.svg";
import eye_close_icon from "../../../assets/images/eye_close_icon.svg";
import CommonModal from "../../../hoc/CommonModal";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import PopComponent from "../../../hoc/PopContent";
import SimpleReactValidator from "simple-react-validator";
import Logo from "../../../assets/images/newLogoMGP.png";
import { useLocation } from "react-router-dom";
import { resetPasswordHandle } from "../../../Redux/auth/action";

const ResetPassword = () => {
    const location = useLocation();
    const [, updateState] = useState();
    const dispatch = useDispatch();
    const [modalValue, setModalValue] = useState('')
    const [modalName, setModalName] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    let Modal = PopComponent[modalName]
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        confirmPassword: false
    });
    const [passwordState, setPasswordState] = useState({
        password: '',
        confirmPassword: ''
    })

    const simpleValidator = useRef(new SimpleReactValidator({
        validators: {
            password: {
                rule: (val, params, validator) => validator.helpers.testRegex(val.trim(), /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/), required: true, // optional
            },
            character: {
                rule: (val, params, validator) => validator.helpers.testRegex(val, /(?=.*[!@#$%^&*])/), required: true, // optional
            },
            oneDigit: {
                rule: (val, params, validator) => validator.helpers.testRegex(val, /(?=.*?[0-9])/), required: true, // optional
            },
            eightCharacter: {
                rule: (val, params, validator) => validator.helpers.testRegex(val, /^.{8,}$/), required: true, // optional
            },
            upLowercase: {
                rule: (val, params, validator) => validator.helpers.testRegex(val, /(?=.*?[a-z])(?=.*?[A-Z])/), required: true, // optional
            },
        }
    }))

    const handleLoginInputChange = (e) => {
        const { name, value } = e.target
        setPasswordState({
            ...passwordState, [name]: value
        })
    }

    const handleResetSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid() && simpleValidator.current.check(passwordState.password, 'eightCharacter') &&
            simpleValidator.current.check(passwordState.password, 'oneDigit') &&
            simpleValidator.current.check(passwordState.password, 'character') && simpleValidator.current.check(passwordState.password, 'upLowercase')) {
            let payload = {
                ...passwordState,
                resetToken: location?.pathname?.split('/')[location?.pathname?.split('/')?.length - 1],
                email: location?.pathname?.split('/')[location?.pathname?.split('/')?.length - 2],
            }
            delete payload.confirmPassword;

            dispatch(resetPasswordHandle(payload)).then(res => {
                if (res.data.success) {
                    setPasswordState({ ...passwordState, password: '', confirmPassword: '' });
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message, auth: true, redirect: '/' })
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                }
            })
        } else {
            simpleValidator.current.showMessages();
            forceUpdate()
        }
    }

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalName(type)
                setModalIsOpen(true)
                setModalValue(data)
            }
                break
            default: {
                setModalIsOpen(false)
            }
        }
    };
    return (
        <Box className={'login_section'}>
            <Box className='bg_black' p={2} sx={{ textAlign: 'center' }}>
                {/*<SideLogo />*/}
                <img src={Logo} alt={"Logo"} className={"Logo"} height={68} />
            </Box>
            {/*<Box className='bg_black' p={2} sx={{ textAlign: 'center' }}>*/}
            {/*    /!*<SideLogo />*!/*/}
            {/*    <img src={Logo} alt={"Logo"} className={"Logo"} height={68} />*/}
            {/*</Box>*/}
            <div className="reset_tag">
            
                <div className="reset-password-center-form">
                <h3 style={{textAlign: "center", marginBottom: "20px"}}>Reset Password</h3>
                    <form className={'change-password-section reset-password-section'} method={'post'} onSubmit={(e) => handleResetSubmit(e)}>
                        <div>
                <div className="formData">
                    <label>New Password</label>
                    <div className="passWrap">
                        <div className="passInput">
                            <input type={showPassword.oldPassword ? "text" : "password"} value={passwordState?.password} name="password" onChange={handleLoginInputChange} />
                            <button type="button" className="sd_passoword_toggle"  >
                                <img src={showPassword.oldPassword ? eye_open_icon : eye_close_icon} alt="Password" title="Password"
                                     className="sd_password_eye_open" onClick={() => setShowPassword({ ...showPassword, oldPassword: !showPassword.oldPassword })} />
                            </button>
                        </div>
                    </div>
                    {
                        passwordState.password !== '' &&
                        <ul className="norms-details" style={{fontSize:"14px"}}>
                            <li className={`${simpleValidator.current.check(passwordState.password, 'eightCharacter') ? 'valid-condition' : 'normsLi'}`}> Minimum
                                8 characters
                            </li>
                            <li className={`${simpleValidator.current.check(passwordState.password, 'oneDigit') ? 'valid-condition' : 'normsLi'}`}> At
                                Contains at least one digit
                            </li>
                            <li className={`${simpleValidator.current.check(passwordState.password, 'character') ? 'valid-condition' : 'normsLi'}`}> At
                                Contains at least one special character
                            </li>
                            <li className={`${simpleValidator.current.check(passwordState.password, 'upLowercase') ? 'valid-condition' : 'normsLi'}`}> Includes
                                both upper and lower case letters
                            </li>
                        </ul>
                    }
                    <div className="invalid-feedback pl-4 d-block errorMsg">
                        {simpleValidator.current.message('NewPassword', passwordState.password, 'required')}
                    </div>
                </div>
                <div className="formData">
                    <label>Confirm New Password</label>
                    <div className="passWrap">
                        <div className="passInput">
                            <input type={showPassword?.confirmPassword ? "text" : "password"} value={passwordState?.confirmPassword} name="confirmPassword" onChange={handleLoginInputChange} />
                            <button type="button" className="sd_passoword_toggle"  >
                                <img src={showPassword.confirmPassword ? eye_open_icon : eye_close_icon} alt="Password" title="Password"
                                     className="sd_password_eye_open" onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })} />
                            </button>
                        </div>
                    </div>
                    <div className="invalid-feedback pl-4 d-block errorMsg">
                        {simpleValidator.current.message('ConfirmNewPassword', passwordState.confirmPassword, `required|in:${passwordState.password}`, { messages: { in: 'Confirm Password  Does not Match!!' } })}
                    </div>
                </div>
                <div className={'btn-change-password'}>
                    <button type={'submit'}>Reset Password</button>
                        </div>
                        </div>      
            </form>
            </div>
            </div>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalIsOpen} handleOpenModal={handleOpenModal} >
                <Modal modalValue={modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default ResetPassword