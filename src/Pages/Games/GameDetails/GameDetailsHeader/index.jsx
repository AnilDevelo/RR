import React, { useEffect, useState } from "react";
import GameDropdown from "./GameDropdown";
import Loader from "../../../../images/Loader";
import { hideActionFunc } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { gameNumberOfPlayer, getAllGameList} from "../../../../Redux/games/action";
import {useParams} from "react-router-dom";
import Header from "../../../../Layout/Header";

const GameDetailsHeader = ({ handleOpenModal }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [rowData, setRowData] = useState([]);
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);
    const [formData, setFormData] = useState({ gameName: '' });

    // const copyUrlHandler = (url) => {
    //     navigator.clipboard.writeText(url).then(r => console.log(r));
    // };

    useEffect(() => {
        getGameList();
    }, [formData]);

    const getGameList = () => {
        setLoader(true);
        dispatch(getAllGameList({ publisherId: gameDetails?.publisherId?._id })).then(res => {
            setRowData(res.data.data);
            setLoader(false);
        });
    };

    return (
        <React.Fragment>
            {/* {loader ? <Loader /> : ""} */}
            <div className={'game-details_header'}>
                <div className={'game-details_header_content'}>
                    <div className={'game-details_header_content_left'}>
                        <div className={'game-details_header_content_left_profile'}>
                            <img src={gameDetails?.gameIcon} alt={'profile'} />
                        </div>
                        <div className={'game-details_header_content_left_content'}>
                            <div className={'game_dropdown'}>
                                <div className={'select_label game_details_header_dropdown '}>
                                    <p className={'game_details_name'}>{gameDetails?.gameName}</p>
                                    {/*<GameDropdown option={rowData} name={'gameName'} setFormData={setFormData} formData={formData} gameDetails={gameDetails} />*/}
                                </div>
                                <div className={'profile_info'}>
                                    <p>by {gameDetails?.publisherId?.fullName}</p>
                                    <p className={'game_id_copy'}><span className={'padding_left'}>Game ID :  {" "} {`GID000${gameDetails?.numericId}`}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                  <div className={'game_right_side'}>
                      <Header isGameHeader={true}/>
                      {/*<div className={'admin_user_bio'}>*/}
                      {/*    <p>Email: {JSON.parse(localStorage.getItem('userdata'))?.email}</p>*/}
                      {/*    <p>Role: {JSON.parse(localStorage.getItem('userdata'))?.role === 'AdminUser' ? 'Admin User'*/}
                      {/*        : JSON.parse(localStorage.getItem('userdata'))?.role === 'SubAdminUser' ? "Sub Admin User" : 'Super Admin'}</p>*/}
                      {/*</div>*/}
                      {
                          hideActionFunc('game') &&
                          <div className={'game-details_header_content_right mt_margin w_181'}>
                              <button onClick={() => handleOpenModal('UpdateGame', { redirectApiProps: getGameList, isGameHeader: true })}>Edit Game Info</button>
                          </div>
                      }
                  </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default GameDetailsHeader;