import React from "react";
import Paper from "@mui/material/Paper";
import successIcon from "../../../../../../assets/images/right-sucss-icon.svg";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const BasicStepsSetup =  ({ setSteps, steps, rowData, setValue, gameDetails, tabChangeArray }) => {

    const changeRouteHandler = (name) => {
        let temp = [...tabChangeArray];
        switch (name) {
            case 'Mode':{
                setValue(temp.findIndex(item => item.label === name));
                break;
            }
            case 'Decks' :{
                setValue(temp.findIndex(item => item.label === name));
                break;
            }
            case 'Number of Players':{
                setValue(temp.findIndex(item => item.label === name));
                break;
            }
        }
    };

    return (
        <>
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'game_tab_overView head_to_head_gameTab'}>
                    <div className={'game_tab_overView_title'}>
                        <h2 className={'fontFamily'}>Basic Steps</h2>
                    </div>
                    <div className={'basic_step_info'}>
                        <div className={'optimize_set_content'}>
                            <div className={ gameDetails?.isGameModeOption ? 'optimize_set_box margin_Right' : 'optimize_set_box'} onClick={() => setSteps({
                                ...steps,
                                setupModal: true,
                                basicStep: { ...steps.basicStep, gameInfo: true }
                            })}>
                                <div className={'box_information'}>
                                    <div className={'box_title'}>
                                        <h3 className={'fontFamily'}>Game Info </h3>
                                        {
                                            rowData?.gameInfoStatus ?
                                                <p className={'success_class fontFamily'}> <img src={successIcon} alt={'successIcon'} /> <span>Complete</span></p>
                                                :
                                                <p className={'unSuccess_class fontFamily'}><HighlightOffIcon /> <span>Incomplete</span></p>
                                        }
                                    </div>
                                    <p className={'note_description fontFamily'}>Create the basic configurations of your game here</p>
                                </div>
                                <div className={'box_arrow'} >
                                    <ArrowForwardIosIcon />
                                </div>
                            </div>
                            {
                                gameDetails?.isGameModeOption &&
                                <div className={'optimize_set_box margin_Left'} onClick={() => changeRouteHandler('Mode')}>
                                    <div className={'box_information'}>
                                        <div className={'box_title'}>
                                            <h3 className={'fontFamily'}>Mode </h3>
                                            {
                                                rowData?.isTwoGameModeCreated ?
                                                    <p className={'success_class fontFamily'}> <img src={successIcon} alt={'successIcon'} /> <span>Complete</span></p>
                                                    :
                                                    <p className={'unSuccess_class fontFamily'}><HighlightOffIcon /> <span>Incomplete</span></p>
                                            }
                                        </div>
                                        <p className={'note_description fontFamily'}>Create the basic configurations of your game here</p>
                                    </div>
                                    <div className={'box_arrow'} >
                                        <ArrowForwardIosIcon />
                                    </div>
                                </div>
                            }
                        </div>

                        <div className={'optimize_set_content'}>
                            {
                                gameDetails?.isMultipleDeck &&
                                <div className={ (gameDetails?.isNoOfPlayer &&  gameDetails?.isMultipleDeck) ? 'optimize_set_box margin_Right' :'optimize_set_box'}
                                     onClick={() => changeRouteHandler('Decks')}>
                                    <div className={'box_information'}>
                                        <div className={'box_title'}>
                                            <h3 className={'fontFamily'}>Decks </h3>
                                            {
                                                rowData?.isNumberOfDeckCreated ?
                                                    <p className={'success_class fontFamily'}> <img src={successIcon} alt={'successIcon'} /> <span>Complete</span></p>
                                                    :
                                                    <p className={'unSuccess_class fontFamily'}><HighlightOffIcon /> <span>Incomplete</span></p>
                                            }
                                        </div>
                                        <p className={'note_description fontFamily'}>Create the basic configurations of your game here</p>
                                    </div>
                                    <div className={'box_arrow'} >
                                        <ArrowForwardIosIcon />
                                    </div>
                                </div>
                            }
                            {
                                <div className={ ((gameDetails?.isNoOfPlayer || !gameDetails?.isNoOfPlayer) &&  gameDetails?.isMultipleDeck) ? 'optimize_set_box margin_Left' : 'optimize_set_box'}
                                     onClick={() => changeRouteHandler('Number of Players')}>
                                    <div className={'box_information'}>
                                        <div className={'box_title'}>
                                            <h3 className={'fontFamily'}>Number Of Players </h3>
                                            {
                                                rowData?.isDefaultNumberOfPlayerCreated ?
                                                    <p className={'success_class fontFamily'}> <img src={successIcon} alt={'successIcon'} /> <span>Complete</span></p>
                                                    :
                                                    <p className={'unSuccess_class fontFamily'}><HighlightOffIcon /> <span>Incomplete</span></p>
                                            }
                                        </div>
                                        <p className={'note_description fontFamily'}>Create the basic configurations of your game here</p>
                                    </div>
                                    <div className={'box_arrow'} >
                                        <ArrowForwardIosIcon />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    )
}
export default BasicStepsSetup