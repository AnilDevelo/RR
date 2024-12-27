import { Box } from "@mui/material";
import FilledButton from "../../../FileButton";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleReactValidator from "simple-react-validator";
import { updateCoins } from "../../../../Redux/user/action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const AddCoinPopup = ({ modalValue, handleOpenModal }) => {
    const dispatch = useDispatch();
    const [loader] = useState(false);
    const simpleValidator = useRef(new SimpleReactValidator());
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [formData, setFormData] = useState({
        userId: modalValue.id,
        coins: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            let payload = {
                ...formData,
            }
            dispatch(updateCoins(payload)).then(res => {
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
            <div className={'add_admin_user_popup'}>
                <div className={'add_admin_user_popup_title'}>
                    <h2>Add Coins</h2>
                </div>
                <div className={'add_admin_user_popup_content_pop'}>
                    <form method={'POST'} onSubmit={(e) => handleSubmit(e)}>
                        <div className="formData">
                            <label>Coins * </label>
                            <div className="emailWrap">
                                <input type="text" name='coins' value={formData?.coins} onChange={(e) => setFormData({ ...formData, coins: e.target.value })} />
                            </div>
                            {simpleValidator.current.message("cash", formData?.coins, "required")}
                        </div>
                        <div className={'formData_btn'}>
                            <button className={'cancel_btn'} onClick={() => handleOpenModal()}>Cancel</button>
                            <FilledButton type={'submit'} value={'Submit'} className={'submit_btn'} loading={loader} />
                        </div>
                    </form>
                </div>
            </div>
        </Box>
    )
}
export default AddCoinPopup