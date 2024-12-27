import React from "react";
import user from "../../../../../../../../assets/images/avatar.png";
import {dotGenerator, hideActionFunc} from "../../../../../../../../utils";

const DisplayGameInfoDetails = ({ gameProfile, editUserDetailsHandler, handleOpenModal }) => {
    return (
        <div className={'user_details_inner_section game_details_info_section'}>
            <div className={'user_details_inner_profile'}>
                <div className={'profile'}>
                    <img src={gameProfile?.gameIcon ? gameProfile?.gameIcon : user} alt={'profile'} />
                    <h2 className={'fontFamily'}>{gameProfile?.gameName}</h2>
                </div>
                {
                    hideActionFunc('game') &&
                    <div className={'d_flex_end'}>
                        <button className={'btn'} onClick={() => editUserDetailsHandler()}>Edit</button>
                    </div>
                }

            </div>
            <div className={'user_details_section game_details_setup'}>
                <div className={'user_inner_div'}>
                    <div className={'let_section'}>
                        <div className={'personal_information_content'}>
                            <div className={'form_data_row'}>
                                <div className={'form_data'}>
                                    <h6 className={'fontFamily'}>Game Title</h6> :
                                    <p> {gameProfile?.gameName}</p>
                                </div>
                                <div className={'form_data'}>
                                    <h6>Description</h6> :
                                    <p>{dotGenerator(gameProfile?.description, handleOpenModal, 'Game Description')}</p>
                                </div>
                                <div className={'form_data'}>
                                    <h6>Upload Game Mode Wise Game Server URL</h6> :
                                    <p>{gameProfile?.isModeWiseGameServerLink ? 'Yes' : 'No'}</p>
                                </div>
                                {
                                    !gameProfile?.isModeWiseGameServerLink &&
                                    <div className={'form_data'}>
                                        <h6>Game Server URL</h6> :
                                        <p>{gameProfile?.gameServerLink}</p>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DisplayGameInfoDetails