import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import PopComponent from "../../../../../hoc/PopContent";
import Paper from "@mui/material/Paper";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { hideActionFunc } from "../../../../../utils";
import CommonModal from "../../../../../hoc/CommonModal";
import { createGameConfigList, gameConfigList } from "../../../../../Redux/games/action";
import { useParams } from "react-router-dom";

const GameConfigTab = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [modalValue, setModalValue] = useState('');
    const [modalName, setModalName] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let Modal = PopComponent[modalName];
    const [config, setConfigList] = useState({
        configs: '{}'
    });

    useEffect(() => {
        configListData();
    }, []);

    const configListData = () => {
        dispatch(gameConfigList({ gameId: id })).then(res => {
            if (res.data.statusCode === 200) {
                setConfigList({
                    ...config,
                    configs: JSON.stringify(res.data.data ? res.data.data?.gameConfig : {}, null, 2)
                })
            }
        });
    };

    const handleChange = (e) => {
        setConfigList({
            ...config,
            configs: e.target.value
        })
    };

    const configHandler = () => {
        try {
            const configList = JSON.parse(config.configs);
            let payload = {
                gameConfig: configList,
                gameId: id
            }
            dispatch(createGameConfigList(payload)).then(res => {
                if (res.data.statusCode === 200) {
                    configListData();
                    handleOpenModal('CommonPop', { header: "Success", body: res.data.message });
                } else {
                    handleOpenModal('CommonPop', { header: "Error", body: res.data.message || res.data.msg });
                }
            })
        } catch {
            handleOpenModal('CommonPop', { header: "Error", body: 'Wrong JSON format' });
        }

    };

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
        <Paper sx={{ mb: 2 }} className="outer-box">
            <div className={'config-data'}>
                <TextareaAutosize
                    name={"config"}
                    value={config.configs}
                    minRows={30}
                    maxRows={30}
                    onChange={(e) => { handleChange(e) }}
                />
            </div>
            {
                hideActionFunc('game')  &&
                <div className={'game-play-rules'}>
                    <button className={'btn'} onClick={() => configHandler()}>Save</button>
                </div>
            }

            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalIsOpen} handleOpenModal={handleOpenModal}>
                <Modal modalValue={modalValue} handleOpenModal={handleOpenModal} modalIsOpen={modalIsOpen} YesNoText={{ yes: "Yes", no: "Cancel" }} />
            </CommonModal>
        </Paper>
    )
}
export default GameConfigTab