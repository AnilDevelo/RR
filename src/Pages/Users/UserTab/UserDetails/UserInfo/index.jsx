import {
  currencyFormat,
  generateAvatar,
  hideActionFunc,
} from "../../../../../utils";
import React from "react";
import { useParams } from "react-router-dom";


const UserInfo = ({ userProfile, editUserDetailsHandler, handleOpenModal }) => {
  const { id } = useParams();
    return (
        <div className={'user_details_inner_section'}>
            <div className={'user_details_inner_profile'}>
                <div className={'profile'}>
                    <img src={userProfile?.profileImage ? userProfile?.profileImage : generateAvatar(`${userProfile?.fullName}`)} className={'fontFamily'} alt={'profile'} />
                    <h2 className={'fontFamily'}>{userProfile?.fullName}</h2>
                </div>
                {
                    hideActionFunc('user') &&
                    <div className={'last_section'}>
                        <button className={'btn'} onClick={() => editUserDetailsHandler()}>Edit</button>
                    </div>
                }
            </div>
            <div className={'user_details_section'}>
                <div className={'user_inner_div'}>
                    <div className={'let_section'}>
                        <div className={'personal_information_content'}>
                            <div className={'form_data_row'}>
                                <div className={'form_data'}>
                                    <h6>User Name</h6> :
                                    <p> {userProfile?.nickName}</p>
                                </div>
                                {/* <div className={'form_data'}>
                                    <h6>Email</h6> :
                                    <p>{userProfile?.email}</p>
                                </div> */}
                                <div className={'form_data'}>
                                    <h6>Phone Number</h6> :
                                    <p>{userProfile?.phoneNumber}</p>
                                </div>
                                <div className={'form_data'}>
                                    <h6>Country</h6> :
                                    <p>{userProfile?.country}</p>
                                </div>
                                <div className={'form_data'}>
                                    <h6>Device Type</h6> :
                                    <p>{userProfile?.deviceType}</p>
                                </div>
                                <div className={'form_data'}>
                                    <h6>State</h6> :
                                    <p>{userProfile?.state}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'let_section middle_section'}>
                        <div className={'personal_information_content'}>
                            <div className={'form_data_row'}>
                                <div className={'form_data'}>
                                    <h6>Pan Card Name</h6> :
                                    <p> {userProfile?.panName}</p>
                                </div>
                                <div className={'form_data'}>
                                    <h6>Pan Card Number</h6> :
                                    <p>{userProfile?.panCardNumber}</p>
                                </div>
                                <div className={'form_data'}>
                                    <h6>Aadhaar Card Name</h6> :
                                    <p>{userProfile?.aadharName}</p>
                                </div>
                                <div className={'form_data'}>
                                    <h6>Aadhaar Card Number</h6> :
                                    <p>{userProfile?.aadharCardNumber}</p>
                                </div>
                                {/*<div className={'form_data'}>*/}
                                {/*    <h6>Device Type</h6> :*/}
                                {/*    <p>{userProfile?.deviceType}</p>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={'right_section'}>
                        <div className={'personal_information_content'}>
                            <div className={'form_data_row'}>
                                {/*<div className={'form_data'}>*/}
                                {/*    <h6>Winning</h6> :*/}
                                {/*    <p>{currencyFormat(userProfile?.winCash)}</p>*/}
                                {/*</div>*/}
                                <div className={'form_data user_field_content_row'}>
                                    <div className={'user_field_content_flex'}>
                                        <h6>Winning</h6> :
                                        <p>{currencyFormat(parseFloat(userProfile?.winCash))}</p>
                                    </div>
                                    {
                                        hideActionFunc('user') &&
                                        <div className={'user_btn_details'}>
                                            <button className={'update_bonus_btn'} onClick={() => handleOpenModal('UpdateCashAndBonus', { isModalCash: false, isWinningModalCash: true, id: id })}>+ Add Winning Cash</button>
                                        </div>
                                    }

                                </div>
                                <div className={'form_data user_field_content_row'}>
                                    <div className={'user_field_content_flex'}>
                                        <h6>Deposit Cash</h6> :
                                        <p>{currencyFormat(userProfile?.cash)}</p>
                                    </div>
                                    {
                                        hideActionFunc('user') &&
                                        <div className={'user_btn_details'}>
                                            <button className={'update_bonus_btn'} onClick={() => handleOpenModal('UpdateCashAndBonus', { isModalCash: true, id: id })}>+ Add Deposit Cash</button>
                                        </div>
                                    }

                                </div>
                                <div className={'form_data user_field_content_row'}>
                                    <div className={'user_field_content_flex'}>
                                        <h6>Bonus</h6> :
                                        <p>
                                            <span>{currencyFormat(userProfile?.bonus)}</span>
                                        </p>
                                    </div>
                                    {
                                        hideActionFunc('user') &&
                                        <div className={'user_btn_details'}>
                                            <button className={'update_bonus_btn'} onClick={() => handleOpenModal('UpdateCashAndBonus', { isModalCash: false, id: id })}>+ Add Bonus</button>
                                        </div>
                                    }

                                </div>
                                <div className={'form_data'}>
                                    <h6>Total Cash</h6> :
                                    <p>{currencyFormat(userProfile?.totalCash)}</p>
                                </div>
                                <div className={'form_data'}>
                                    <h6>Total Deposits</h6> :
                                    <p> {currencyFormat(userProfile?.totalDeposits)} </p>
                                </div>
                                <div className={'form_data'}>
                                    <h6>Total Withdrawals</h6> :
                                    <p>{currencyFormat(userProfile?.totalWithdrawals)}</p>
                                </div>
                                {/*<div className={'form_data user_field_content_row'}>*/}
                                {/*    <div className={'user_field_content_flex'}>*/}
                                {/*        <h6>Total Coins </h6> :*/}
                                {/*        <p>{currencyFormat(userProfile?.coins)}</p>*/}
                                {/*    </div>*/}
                                {/*    {*/}
                                {/*        hideActionFunc( 'user') &&*/}
                                {/*        <div className={'user_btn_details'}>*/}
                                {/*            <button className={'update_bonus_btn'} onClick={() => handleOpenModal('AddCoinPopup', { id: userProfile?._id })}>+ Add Coins</button>*/}
                                {/*        </div>*/}
                                {/*    }*/}

                                {/*</div>*/}
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default UserInfo