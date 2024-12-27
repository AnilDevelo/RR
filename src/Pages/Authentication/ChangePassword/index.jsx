import React, { useRef, useState } from 'react';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SimpleReactValidator from "simple-react-validator";
import { useDispatch } from "react-redux";
import CommonModal from "../../../hoc/CommonModal";
import PopComponent from "../../../hoc/PopContent";
import { changePasswordHandle } from "../../../Redux/auth/action";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";


const ChangePassword = () => {
    const [, updateState] = useState();
    const dispatch = useDispatch();
    const [modalValue, setModalValue] = useState('')
    const [modalName, setModalName] = useState('')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    let Modal = PopComponent[modalName]
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        oldPassword: false,
        confirmPassword: false
    });
    const [passwordState, setPasswordState] = useState({
        oldPassword: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid() && simpleValidator.current.check(passwordState.password, 'eightCharacter') &&
            simpleValidator.current.check(passwordState.password, 'oneDigit') &&
            simpleValidator.current.check(passwordState.password, 'character') && simpleValidator.current.check(passwordState.password, 'upLowercase')) {
            let payload = {
                ...passwordState
            }
            delete payload.confirmPassword;
            dispatch(changePasswordHandle(payload)).then(res => {
                if (res.data.success) {
                    setPasswordState({ ...passwordState, oldPassword: '', password: '', confirmPassword: '' });
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message })
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
        <Box className={'change-password-details'}>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <form className={'change-password-section'} method={'post'} onSubmit={(e) => handleSubmit(e)}>
                    <div className="formData">
                        <label>Current Password</label>
                        <div className="passWrap">
                            <div className="passInput">
                                <input type={showPassword.currentPassword ? "text" : "password"} value={passwordState?.oldPassword} name="oldPassword" onChange={handleLoginInputChange} />
                                <button type="button" className="sd_passoword_toggle" onClick={() => setShowPassword({ ...showPassword, currentPassword: !showPassword.currentPassword })} >
                                    {
                                        !showPassword?.currentPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
                                    }
                                    {/*<img src={showPassword.currentPassword ? eye_open_icon : eye_close_icon} alt="Password" title="Password"*/}
                                    {/*    className="sd_password_eye_open" onClick={() => setShowPassword({ ...showPassword, currentPassword: !showPassword.currentPassword })} />*/}
                                </button>
                            </div>
                        </div>
                        <div className="invalid-feedback pl-4 d-block errorMsg">
                            {simpleValidator.current.message('CurrentPassword', passwordState.oldPassword, 'required')}
                        </div>
                    </div>
                    <div className="formData">
                        <label>New Password</label>
                        <div className="passWrap">
                            <div className="passInput">
                                <input type={showPassword.oldPassword ? "text" : "password"} value={passwordState?.password} name="password" onChange={handleLoginInputChange} />
                                <button type="button" className="sd_passoword_toggle" onClick={() => setShowPassword({ ...showPassword, oldPassword: !showPassword.oldPassword })} >
                                    {
                                        !showPassword?.oldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
                                    }
                                    {/*<img src={showPassword.oldPassword ? eye_open_icon : eye_close_icon} alt="Password" title="Password"*/}
                                    {/*    className="sd_password_eye_open" onClick={() => setShowPassword({ ...showPassword, oldPassword: !showPassword.oldPassword })} />*/}
                                </button>
                            </div>
                        </div>
                        <div style={{marginLeft:"1rem"}}>
                        {
                            passwordState.password !== '' &&
                            <ul className="norms-details">
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
                        </div>
                        <div className="invalid-feedback pl-4 d-block errorMsg">
                            {simpleValidator.current.message('NewPassword', passwordState.password, 'required')}
                        </div>
                    </div>
                    <div className="formData">
                        <label>Confirm New Password</label>
                        <div className="passWrap">
                            <div className="passInput">
                                <input type={showPassword?.confirmPassword ? "text" : "password"} value={passwordState?.confirmPassword} name="confirmPassword" onChange={handleLoginInputChange} />
                                <button type="button" className="sd_passoword_toggle" onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}>
                                    {
                                        !showPassword?.confirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
                                    }
                                    {/*<img src={showPassword.confirmPassword ? eye_open_icon : eye_close_icon} alt="Password" title="Password"*/}
                                    {/*    className="sd_password_eye_open" onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })} />*/}
                                </button>
                            </div>
                        </div>
                        <div className="invalid-feedback pl-4 d-block errorMsg">
                        {simpleValidator.current.message('ConfirmNewPassword', passwordState.confirmPassword, `required|in:${passwordState.password}`, { messages: { in: 'Confirm Password  Does not Match!' } })}
                        </div>
                        </div>
                    <div className={'btn-change-password'}>
                        <button type={'submit'}>Change Password</button>
                    </div>
                </form>
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalIsOpen} handleOpenModal={handleOpenModal} >
                <Modal modalValue={modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalIsOpen} />
            </CommonModal>
        </Box>
    )
}
export default ChangePassword