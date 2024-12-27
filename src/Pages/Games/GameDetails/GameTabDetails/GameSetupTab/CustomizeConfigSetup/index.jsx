import React from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import successIcon from "../../../../../../assets/images/right-sucss-icon.svg";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CustomizeConfigSetup = ({ setValue, rowData, gameDetails, tabChangeArray }) => {
    const navigate = useNavigate();

    const changeRouteHandler = (name) => {
        let temp = [...tabChangeArray];
        switch (name) {
            case 'Game Config':{
                setValue(temp.findIndex(item => item.label === name));
                break;
            }
            case 'Lobby' :{
                setValue(temp.findIndex(item => item.label === name));
                break;
            }
            case 'Game builds':{
                setValue(temp.findIndex(item => item.label === name));
                break;
            }
        }
    }

    const TdsConfigTab = () => {
        navigate('/TDS-report')
        localStorage.setItem('TDSConfig', true)
    }

    return (
        <Box>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'configuration-customization'}>
                    <div className={'game_tab_overView head_to_head_gameTab game-play '}>
                        <div className={'game_tab_overView_title'}>
                            <h2 className={'fontFamily'}>Customize Config</h2>
                        </div>
                        <div className={'basic_step_info'}>
                            <div className={'basic_step_info'} >
                                <div className={'optimize_set_content'}>
                                    <div className={'optimize_set_box'} onClick={()=>changeRouteHandler('Game Config')}>
                                        <div className={'box_information'}>
                                            <div className={'box_title'}>
                                                <h3 className={'fontFamily'}>Game Config</h3>
                                                {
                                                    rowData?.isGameConfigCreated ?
                                                        <p className={'success_class fontFamily'}> <img src={successIcon} alt={'successIcon'} /> <span>Complete</span></p>
                                                        :
                                                        <p className={'fontFamily unSuccess_class'}><HighlightOffIcon /> <span>Incomplete</span></p>
                                                }
                                            </div>
                                            <p className={'note_description fontFamily'}>Create the Customize configurations of your game here</p>
                                        </div>
                                        <div className={'box_arrow'}>
                                            <ArrowForwardIosIcon />
                                        </div>
                                    </div>
                                    {/*<div className={'optimize_set_box optimize_disable_box'} >*/}
                                    {/*    <div className={'box_information'}>*/}
                                    {/*        <div className={'box_title'}>*/}
                                    {/*            <h3>Tournament </h3>*/}
                                    {/*            <p><HighlightOffIcon /> <span>Incomplete</span></p>*/}
                                    {/*        </div>*/}
                                    {/*        <p className={'note_description'}>Create the basic configurations of your game here</p>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={'box_arrow'}>*/}
                                    {/*        <ArrowForwardIosIcon />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'game_tab_overView head_to_head_gameTab config'}>
                        <div className={'game_tab_overView_title'}>
                            <h2 className={'fontFamily'}>Customize Gameplay</h2>
                        </div>
                        <div className={'basic_step_info'}>
                            <div className={'basic_step_info'} >
                                <div className={'optimize_set_content'}>
                                    <div className={'optimize_set_box'} onClick={()=>changeRouteHandler('Lobby')}>
                                        <div className={'box_information'}>
                                            <div className={'box_title'}>
                                                <h3 className={'fontFamily'}>Lobbies</h3>
                                                {
                                                    rowData?.isHeadToHeadCreated ?
                                                        <p className={'success_class fontFamily'}> <img src={successIcon} alt={'successIcon'} /> <span>Complete</span></p>
                                                        :
                                                        <p className={'fontFamily unSuccess_class'}><HighlightOffIcon /> <span>Incomplete</span></p>
                                                }
                                            </div>
                                            <p className={'note_description fontFamily'}>Create the Customize Gameplay configurations of your game here</p>
                                        </div>
                                        <div className={'box_arrow'}>
                                            <ArrowForwardIosIcon />
                                        </div>
                                    </div>
                                    {/*<div className={'optimize_set_box optimize_disable_box'} >*/}
                                    {/*    <div className={'box_information'}>*/}
                                    {/*        <div className={'box_title'}>*/}
                                    {/*            <h3>Tournament </h3>*/}
                                    {/*            <p><HighlightOffIcon /> <span>Incomplete</span></p>*/}
                                    {/*        </div>*/}
                                    {/*        <p className={'note_description'}>Create the basic configurations of your game here</p>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={'box_arrow'}>*/}
                                    {/*        <ArrowForwardIosIcon />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'configuration-customization mt_2'}>
                    <div className={'game_tab_overView head_to_head_gameTab game-play '}>

                        <div className={'basic_step_info'}>
                            <div className={'basic_step_info'} >
                                <div className={'optimize_set_content'}>
                                    <div className={'optimize_set_box'} onClick={()=>TdsConfigTab()}>
                                        <div className={'box_information'}>
                                            <div className={'box_title'}>
                                                <h3 className={'fontFamily'}>TDS Config</h3>
                                                {
                                                    rowData?.isTdsConfigCreated ?
                                                        <p className={'success_class fontFamily'}> <img src={successIcon} alt={'successIcon'} /> <span>Complete</span></p>
                                                        :
                                                        <p className={'fontFamily unSuccess_class'}><HighlightOffIcon /> <span>Incomplete</span></p>
                                                }
                                            </div>
                                            <p className={'note_description fontFamily'}>Create the Customize configurations of your game here</p>
                                        </div>
                                        <div className={'box_arrow'}>
                                            <ArrowForwardIosIcon />
                                        </div>
                                    </div>
                                    {/*<div className={'optimize_set_box optimize_disable_box'} >*/}
                                    {/*    <div className={'box_information'}>*/}
                                    {/*        <div className={'box_title'}>*/}
                                    {/*            <h3>Tournament </h3>*/}
                                    {/*            <p><HighlightOffIcon /> <span>Incomplete</span></p>*/}
                                    {/*        </div>*/}
                                    {/*        <p className={'note_description'}>Create the basic configurations of your game here</p>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={'box_arrow'}>*/}
                                    {/*        <ArrowForwardIosIcon />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'game_tab_overView head_to_head_gameTab config'}>
                        <div className={'basic_step_info'}>
                            <div className={'basic_step_info'} >
                                <div className={'optimize_set_content'}>
                                    <div className={'optimize_set_box'} onClick={() => changeRouteHandler('Game builds')}>
                                        <div className={'box_information'}>
                                            <div className={'box_title'}>
                                                <h3 className={'fontFamily'}>Game Build</h3>
                                                {
                                                    rowData?.isGameBuildCreated ?
                                                        <p className={'success_class fontFamily'}> <img src={successIcon} alt={'successIcon'} /> <span>Complete</span></p>
                                                        :
                                                        <p className={'fontFamily unSuccess_class'}><HighlightOffIcon /> <span>Incomplete</span></p>
                                                }
                                            </div>
                                            <p className={'note_description fontFamily'}>Create the Customize Gameplay configurations of your game here</p>
                                        </div>
                                        <div className={'box_arrow'}>
                                            <ArrowForwardIosIcon />
                                        </div>
                                    </div>
                                    {/*<div className={'optimize_set_box optimize_disable_box'} >*/}
                                    {/*    <div className={'box_information'}>*/}
                                    {/*        <div className={'box_title'}>*/}
                                    {/*            <h3>Tournament </h3>*/}
                                    {/*            <p><HighlightOffIcon /> <span>Incomplete</span></p>*/}
                                    {/*        </div>*/}
                                    {/*        <p className={'note_description'}>Create the basic configurations of your game here</p>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={'box_arrow'}>*/}
                                    {/*        <ArrowForwardIosIcon />*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Paper>
        </Box>
    )
}
export default CustomizeConfigSetup