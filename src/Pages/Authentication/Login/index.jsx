import React, { useCallback, useRef, useState } from 'react';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from "../../../Redux/auth/action";
import PopComponent from "../../../hoc/PopContent";
import CommonModal from "../../../hoc/CommonModal";
import FilledButton from "../../../Components/FileButton";
import SimpleReactValidator from "simple-react-validator";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Logo from "../../../assets/images/logo.png";
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    const [otp, setOtp] = useState()
    let Modal = PopComponent[modalDetails?.modalName];
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({ email: '', password: '' });
    
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        if (name === 'email') {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(value)) {
                simpleValidator.current.showMessageFor('email', 'Invalid email format');
            } else {
                simpleValidator.current.hideMessages();
            }
            forceUpdate();
        }
    };

 
    const handleSubmitHandler = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setLoader(true);
            let payload = {
                email: formData?.email?.trim(),
                password: formData?.password
            }
            dispatch(loginUser(payload)).then(res => {
                if (res?.data?.success) { 
                    toast.success(res.data.message || res?.data?.msg);
                    navigate('/dashboard');
                    setLoader(false)
                } else {
                    // handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res?.data?.msg })
                    toast.error(res?.data?.message || res?.data?.msg);
                    setLoader(false)
                }
            })
            navigate('/dashboard');
        } else {
            simpleValidator.current.showMessages();
            forceUpdate();
        }

    };

    const handleOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ForgotPassword': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    return (
        <div className={'login_section'}>
            <Box className='bg_black' p={2} sx={{ textAlign: 'center' }}>
                {/*<SideLogo />*/}
                {/* <div className={'login_section_logo'}>
                    <img src={Logo} alt={"Logo"} className={"Logo"} height={68} />
                </div> */}
            </Box>
            <Box className='login_container'>
                <Box className='login_form' boxShadow={1} sx={{ borderRadius: 2 }}>
                    <form className="form_login" onSubmit={(e) => handleSubmitHandler(e)}>
                        <h1 className={"Login_Title"}>Super Admin Login</h1>
                        <div className="formData">
                            <label>Email address</label>
                            <div className="emailWrap">
                                <input type="email" name='email' value={formData.email} onChange={(e) => handleChange(e)} style={{marginBottom:"0px"}}/>
                                {simpleValidator.current.message("Email", formData?.email, ["required", "email"])}
                            </div>
                        </div>
                        <div className="formData">
                            <label>Password</label>
                            <div className="passWrap">
                                <div className="passInput">
                                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={(e) => handleChange(e)} />
                                    <button type="button" className="sd_passoword_toggle cursor_pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {
                                            !showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
                                        }
                                    </button>
                                </div>
                            </div>
                            {simpleValidator.current.message("Password", formData?.password, "required")}
                        </div>
                        <div className="forgetContainer">
                            <div className="rememberWrap">
                                <div className="checkWrap">
                                    {/*<input type="checkbox" /> <label>Remember me</label>*/}
                                </div>
                                <div className={'forgot-password'}>
                                    <button type="button" onClick={() => handleOpenModal('ForgotPassword')}>Forgot Password ?</button>
                                </div>
                            </div>
                        </div>
                        <FilledButton type={'submit'} value={'Log In'} className={'formloginBtn loader_css'} loading={loader} />
                    </form>
                </Box>
            </Box>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalDetails.modalIsOpen} />
            </CommonModal>
        </div>
    )
}

export default Login