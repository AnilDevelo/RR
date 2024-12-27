export const AUTH_LOGIN = 'auth/login';
export const AUTH_CHANGE_PASSWORD = 'auth/changePassword';
export const AUTH_FORGOT_PASSWORD = 'auth/forgotPassword';
export const AUTH_RESET_PASSWORD = 'auth/resetPassword';

//======================================= Admin User Module =========================================
export const ADMIN_USER_GET_PERMISSIONS = 'adminUsers/getPermissions';
export const ADD_ADMIN_USER_LIST = 'adminUsers';
export const GET_ADMIN_USER_LIST = 'adminUsers/getAdminUsers';
export const UPDATE_ADMIN_USER_LIST = 'adminUsers';
export const DELETE_ADMIN_USER_LIST = 'adminUsers/delete';
export const UPDATE_STATUS_ADMIN_USER_LIST = 'adminUsers/blockUnblock';

//================================== Sub Admin Module ===============================================
export const ADD_SUB_ADMIN_USER_LIST = 'subAdminUser';
export const GET_SUB_ADMIN_USER_LIST = 'subAdminUser/getSubAdminUser';
export const UPDATE_SUB_ADMIN_USER_LIST = 'subAdminUser';
export const DELETE_SUB_ADMIN_USER_LIST = 'subAdminUser';
export const UPDATE_STATUS_SUB_ADMIN_USER_LIST = 'subAdminUser/activeDeactive';

//======================================== User Module ======================================================
export const GET_ALL_USER_LIST = 'users';
export const BLOCK_ALL_USER_LIST = 'users/block';
export const GET_USER_PROFILE = 'users/getUserProfile';
export const UPDATE_BONUS_USER_PROFILE = 'users/userDetails/updateUserBonus';
export const UPDATE_WINNING_CASH_USER_PROFILE = 'users/userDetails/updateUserWinCash';
export const UPDATE_DEPOSIT_USER_PROFILE = 'users/userDetails/updateUserCash';
export const UPDATE_COIN_USER_PROFILE = 'userDetails/updateUserCoins';
export const UPDATE_USER_PROFILE = 'users/userDetails/updateUserPersonalInfo';
export const GET_USER_GAME_STATISTICS = 'users/getGameStatistics';
export const GET_USER_TRANSACTION_HISTORY = 'transactionHistory/getTransactionHistory';
export const GET_USER_NOTE = 'userNote/getUsersNote';
export const ADD_USER_NOTE = 'userNote';
export const UPDATE_USER_NOTE = 'userNote';
export const DELETE_USER_NOTE = 'userNote';
export const GET_USER_KYC_LIST = 'users/getKYC';
export const UPDATE_USER_KYC_LIST = 'userKYC';
export const ACTIVE_DEACTIVATE_USER_KYC_LIST = 'userKYC/aadharCard/approveReject';
export const GET_USER_KYC_REQUEST_LIST = 'userKYCUpdateRequest/getUpdateRequests';
export const GET_USER_KYC_VIEW_REQUEST_LIST = 'userKYCUpdateRequest/viewUpdateRequest';
export const APPROVED_REJECT_USER_KYC_REQUEST = 'userKYCUpdateRequest/approveReject';
export const GET_USER_PAYMENT_HISTORY = 'paymentHistory/getUserPaymentHistory';
export const GET_USER_DEPOSITE_HISTORY = 'paymentHistory/getUserPaymentDepositeHistory';
export const GET_USER_WITHDRAWAL_HISTORY = 'paymentHistory/getUserPaymentWithdrawlHistory';


export const GET_USER_REPORTED_LIST = 'userReported/getReportedUser';
export const VIEW_USER_REPORTED_LIST = 'userReported/getReportedList';
export const GET_USER_BLOCKED_LIST = 'blockUser/getList';
export const VIEW_USER_BLOCKED_LIST = 'blockUser/getList/view';
export const BLOCK_USER_BLOCKED_LIST = 'blockUser';
export const GET_USER_PLAYED_GAME_LIST = 'playedGames/getUserPlayedGames';
export const VIEW_USER_PLAYED_GAME_LIST = 'playedGames/getUserPlayedGames/view';
export const GET_USER_WISE_KYC_LIST = 'users/getSingleUserKYC';
export const GET_USER_WITHDRAW_REQUEST = 'users/getWithdrawRequests';
export const APPROVE_REJECT_USER_WITHDRAW_REQUEST = 'paymentHistory/approveRejectUserWithdrawalRequest';
export const GET_USER_MOBILE_NUMBER_UPDATE_REQUEST_LIST = 'phoneNumberUpdateRequest/getPhoneNumberUpdateRequest';
export const GET_USER_OLD_MOBILE_NUMBER_UPDATE_REQUEST_LIST = 'phoneNumberUpdateRequest/getUserOldPhoneNumber';
export const APPROVE_REJECT_USER_OLD_MOBILE_NUMBER_UPDATE_REQUEST = 'phoneNumberUpdateRequest/approveReject';
export const GET_USER_WISE_GST_REPORT = 'userGSTAmount/getUserGSTReport';
export const GET_USER_EARNING_REPORT = 'users/getUserEarning';
export const GET_INACTIVE_USER_LIST = 'users/getInactiveUsers';

export const ADD_REPORT_CONFIG = 'reportConfig';
export const DELETE_REPORT_CONFIG = 'reportConfig';
export const GET_REPORT_CONFIG = 'reportConfig/getReportConfig';
export const UPDATE_REPORT_CONFIG = 'reportConfig';
//============================================================== Game Module ========================================================================
export const GET_GAME_LIST = 'game/games';
export const ADD_GAME_LIST = 'game';
export const UPDATE_GAME_LIST = 'game';
export const UPDATE_GAME_STATUS_LIST = 'game/approveReject';
export const ACTIVE_DEACTIVATE_GAME_STATUS = 'game/activeDeactive';
export const ARCHIVED_GAME_STATUS = 'game/archiveUnarchive';
export const SINGLE_GAME_DETAILS_LIST = 'game/getGameDetails';
export const ADD_GAME_LOBBY = 'headTohead';
export const UPDATE_GAME_LOBBY = 'headTohead';
export const GET_GAME_LOBBY = 'headTohead/getHeadToHeads';
export const DELETE_GAME_LOBBY = 'headTohead';
export const ACTIVE_DEACTIVATE_GAME_LOBBY = 'headTohead/activeDeactive';
export const GET_GAME_OVERVIEW_DETAIL = 'game/overview';
export const UPDATE_GAME_SETUP_INFO = 'game/optimize/updateGameInfo';
export const GET_GAME_SETUP_STATUS = 'game/optimize/getStatus';
export const GET_ALL_GAME_NAME = 'game/getGameNames';
export const UPLOAD_GAME_BUILD = 'gameBuild/upload';
export const GET_GAME_BUILD_LIST = 'gameBuild/getGameBuilds';
export const DELETE_GAME_BUILD_LIST = 'gameBuild';
export const UPDATE_GAME_BUILD_LIST = 'gameBuild';
export const GET_UNIQUE_MGP_RELEASE = 'gameBuild/getUniqueMgpReleases';
export const GET_GAME_RELEASE_LIST = 'gameRelease/getGameRelease';
export const ADD_GAME_RELEASE_LIST = 'gameRelease';
export const UPDATE_GAME_RELEASE_LIST = 'gameRelease';
export const GET_GAME_MODE_LIST = 'gameMode/getGameModes';
export const ADD_GAME_MODE_LIST = 'gameMode';
export const UPDATE_GAME_MODE_LIST = 'gameMode';
export const DELETE_GAME_MODE_LIST = 'gameMode';
export const ADD_IMAGE_SLIDER_HOW_TO_PLAY = 'howToPlay/uploadSliderImage';
export const DELETE_IMAGE_SLIDER_HOW_TO_PLAY = 'howToPlay/deleteSliderImage';
export const ADD_HOW_TO_PLAY_LIST = 'howToPlay';
export const GET_HOW_TO_PLAY_LIST = 'howToPlay/getHowToPlay';
export const DELETE_HOW_TO_PLAY_LIST = 'howToPlay';
export const ADD_NUMBER_OF_DECK_LIST = 'gameNumberOfDeck';
export const GET_NUMBER_OF_DECK_LIST = 'gameNumberOfDeck/getGameNumberOfDeck';
export const ADD_NUMBER_OF_PLAYER_LIST = 'gameNumberOfPlayer';
export const UPDATE_NUMBER_OF_PLAYER_LIST = 'gameNumberOfPlayer';
export const DELETE_NUMBER_OF_PLAYER_LIST = 'gameNumberOfPlayer';

export const GET_NUMBER_OF_PLAYER_LIST = 'gameNumberOfPlayer/getGameNumberOfPlayer';

export const ACTIVE_DEACTIVATE_NUMBER_OF_PLAYER_LIST = 'gameNumberOfPlayer/activeDeactive';
export const SWAP_POSITION_NUMBER_OF_PLAYER_LIST = 'gameNumberOfPlayer/swapPosition';
export const SWAP_POSITION_GAME_MODE_LIST = 'gameMode/swapPosition';
export const GET_GAME_CONFIG_LIST = 'gameConfig/getGameConfig';
export const ADD_GAME_CONFIG_LIST = 'gameConfig';
export const GET_GAME_MODE_DESIGN_LIST_CONFIG = 'gameModeDesignConfig/getGameModeDesignConfig';
export const ADD_GAME_MODE_DESIGN_LIST_CONFIG = 'gameModeDesignConfig';
export const ADD_GAME_RADIUS_LOCATION_LIST = 'gameRadiusLocation';
export const GET_GAME_RADIUS_LOCATION_LIST = 'gameRadiusLocation/getGameRadiusLocation';
export const ADD_GAME_DUMMY_PLAYER_LIST = 'dummyPlayer';
export const GET_GAME_DUMMY_PLAYER_LIST = 'dummyPlayer/getDummyPlayer';
export const ADD_IMAGE_SLIDER_MGP_HOW_TO_PLAY = 'mgpHowToPlay/uploadSliderImage';
export const DELETE_IMAGE_SLIDER_MGP_HOW_TO_PLAY = 'mgpHowToPlay/deleteSliderImage';
export const ADD_MGP_HOW_TO_PLAY= 'mgpHowToPlay';
export const DELETE_MGP_HOW_TO_PLAY= 'mgpHowToPlay';
export const ADD_GAME_PLAYING_TRACKING_LIST = 'playingTracking';
export const GET_GAME_PLAYING_TRACKING_LIST = 'playingTracking/getPlayingTracking';
export const ACTIVE_GAME_DROPDOWN = 'game/getActiveGameDropdown';
export const GET_GAME_MONTHLY_LEADERBOARD_RANK = 'gameMonthlyLeaderboardRank/getRanks';
export const ADD_GAME_MONTHLY_LEADERBOARD_MAX_BONUS_AMOUNT = 'gameMonthlyleaderboardBonusConfig/updateMaxMonthlyBonusLimit';
export const ADD_GAME_MONTHLY_LEADERBOARD_RELEASE_DATE = 'gameMonthlyLeaderboardBonusConfig/updateBonusReleaseDate';
export const ADD_GAME_MONTHLY_LEADERBOARD_RANK = 'gameMonthlyLeaderboardRank';
export const UPDATE_GAME_MONTHLY_LEADERBOARD_RANK = 'gameMonthlyLeaderboardRank';
export const DELETE_GAME_MONTHLY_LEADERBOARD_RANK = 'gameMonthlyLeaderboardRank';

export const GET_GAME_MODE_WISE_GAME_SERVER_LINK = 'gameServerLinkModeWise/getGameServerLinkModeWise';
export const ADD_GAME_MODE_WISE_GAME_SERVER_LINK = 'gameServerLinkModeWise';
export const UPDATE_GAME_MODE_WISE_GAME_SERVER_LINK = 'gameServerLinkModeWise';

//addGameLeaderboardConfig
export const ADD_GAME_MONTHLY_LEADERBOARD_CONFIG = 'gameMonthlyLeaderboardBonusConfig/updateIsLeaderboardBonusOn';
export const GET_GENRE_NAME = 'genre/getGenreNames';
export const GET_GENRE_LIST = 'genre/getGenres';
export const DELETE_GENRE_LIST = 'genre';
export const ACTIVE_DEACTIVATE_GENRE_LIST = 'genre';
export const ADD_GENRE_LIST = 'genre';
export const UPDATE_GENRE_LIST = 'genre';
//tournament

//game history
export const GET_GAME_HISTORY = 'transactionHistory/getGameTransactionHistory';
export const REFUND_GAME_HISTORY = 'transactionHistory/refundGameStuckEntryFees';
//Player Record
export const GET_PLAYER_RECORD_LIST = 'playedGames/getGameHistory';
export const VIEW_PLAYER_RECORD_LIST = 'playedGames/getGameHistoryView';
//============================================================== ANALYTICS Module ========================================================================
export const ADD_ANALYTICS_REPORT = 'analytics';
export const GET_ANALYTICS_APP_INSTALL_USER_REPORT = 'userInstalledMGPApp/getUserInstalledGame';
export const GET_ANALYTICS_APP_UNINSTALL_USER_REPORT = 'userUninstalledMgpApp/getUserUninstalledMgpApp';
export const GET_ANALYTICS_DAILY_REPORT = 'analytics/getDailyReport';

//============================================== Popular Game ============================================
export const ADD_POPULAR_GAME = 'popularGame';
export const GET_POPULAR_GAME = 'popularGame/getPopularGames';
export const ADD_UPCOMING_GAME = 'upcomingGame';
export const GET_UPCOMING_GAME = 'upcomingGame/getUpcomingGame';
export const SWAP_POSITION_UPCOMING_GAME = 'upcomingGame/swapPosition';
export const UPDATE_UPCOMING_GAME = 'upcomingGame';
export const DELETE_UPCOMING_GAME = 'upcomingGame';
export const GET_LOGIN_SCREEN_PRIVACY_POLICY = 'mgpAppScreen/loginScreen/getLoginScreenPrivacyPolicy';
// live game
export const LIVE_GAME = 'LiveGames';
export const GET_LIVE_GAME = 'liveGames/getLiveGames';
//============================================== Bonus Module ============================================

export const GET_OFFER = 'offer/getOffer';
export const ADD_OFFER = 'offer';
export const UPDATE_OFFER = 'offer';
export const DELETE_OFFER = 'offer';

export const GET_COUPON_CODE = 'couponCode/getCouponCode';
export const ADD_COUPON_CODE = 'couponCode';
export const UPDATE_COUPON_CODE = 'couponCode';
export const DELETE_COUPON_CODE = 'couponCode';

export const GET_DAILY_WHEEL_BONUS_TYPE_LIST = 'getDailyWheelBonusType';
export const ADD_DAILY_WHEEL_BONUS_TYPE_LIST = 'dailyWheelBonusType';
export const GET_DAILY_WHEEL_BONUS_TYPE = 'dailyWheelBonus/getDailyWheelBonusType';
export const GET_DAILY_SPIN_DIVISION_ROW = 'dailyWheelBonusConfig/getDailyWheelBonusConfig';
export const GET_DAILY_SPIN_DIVISION_CONFIG = 'dailyWheelBonusConfig';
export const GET_DAILY_WHEEL_BONUS = 'dailyWheelBonus/getDailyWheelBonus';
export const ADD_DAILY_WHEEL_BONUS = 'dailyWheelBonus';
export const UPDATE_DAILY_WHEEL_BONUS = 'dailyWheelBonus';
export const GET_DAY_DAILY_WHEEL_BONUS = 'dailyWheelBonus/getDay';
export const DELETE_REFER_AND_EARN_SHARE_CONFIG = 'referAndEarnShareConfig/deleteReferAndEarnShareConfig';
export const GET_REFER_AND_EARN_SHARE_CONFIG = 'referAndEarnShareConfig/getReferAndEarnShareConfig';
export const ADD_REFER_AND_EARN_SHARE_CONFIG = 'referAndEarnShareConfig';
export const UPDATE_REFER_AND_EARN_SHARE_CONFIG = 'referAndEarnShareConfig';




export const GET_REFER_AND_EARN = 'referAndEarn/getReferAndEarn';
export const ADD_REFER_AND_EARN = 'referAndEarn';
export const ACTIVE_DEACTIVATE_REFER_AND_EARN = 'referAndEarn/activeDeactive';
export const GET_REFER_AND_EARN_DETAIL = 'referDetails/getReferralDetail';
export const VIEW_REFER_AND_EARN = 'referDetails/getUsersReferrals';
export const VIEW_LEADERBOARD_LIST = 'leaderboard/getOldHistory';
export const GET_LEADERBOARD_LIST = 'leaderboard/getList';
export const GET_LEADERBOARD_GAME_NAME = 'game/getGameNames';
export const GET_CURRENT_REFER_AND_EARN_LEADERBOARD = 'referAndEarnleaderboard/getList';
export const GET_PREVIOUS_REFER_AND_EARN_LEADERBOARD = 'referAndEarnLeaderboard/getOldHistory';
export const ADD_MONTHLY_MAX_BONUS_LIMIT_REFER_AND_EARN = 'referAndEarnMonthlyBonusConfig/updateMaxMonthlyBonusLimit';
export const ADD_MONTHLY_BONUS_RELEASE_DATE_REFER_AND_EARN = 'referAndEarnMonthlyBonusConfig/updateBonusReleaseDate';
export const ADD_REFER_AND_EARN_CONFIG = 'referAndEarnRankConfig';
export const UPDATE_REFER_AND_EARN_CONFIG = 'referAndEarnRankConfig';
export const DELETE_REFER_AND_EARN_CONFIG = 'referAndEarnRankConfig';
export const GET_REFER_AND_EARN_CONFIG = 'referAndEarnRankConfig/getRanks';
export const ADD_REFER_AND_EARN_POINT_CONFIG = 'referAndEarnPointsConfig';
export const GET_REFER_AND_EARN_POINT_CONFIG = 'referAndEarnPointsConfig/getPointsConfig';
export const UPDATE_REFER_AND_EARN_POINT_CONFIG = 'referAndEarnPointsConfig';
export const DELETE_REFER_AND_EARN_POINT_CONFIG = 'referAndEarnPointsConfig';

export const ADD_LEADER_BOARD_BONUS_CONFIG = 'leaderboardBonusConfig';
export const GET_LEADER_BOARD_BONUS_CONFIG = 'gameMonthlyleaderboardBonusConfig/getLeaderboardBonusConfig';

//============================================== Revenue Module ============================================
export const GET_GAME_WISE_REVENUE_REPORT = 'revenue/getGameWiseRevenueReport';
export const GET_OVER_ALL_REVENUE_REPORT = 'revenue/getOverAllRevenueReport';
export const GET_GST_REPORT = 'userGSTAmount/getGSTReport';
export const GET_GST_CONFIG = 'gstConfig/getGstConfig';
export const ADD_GST_CONFIG = 'gstConfig';
export const UPDATE_GST_CONFIG = 'gstConfig';
export const DELETE_GST_CONFIG = 'gstConfig';
export const GET_MGP_WALLETS_HISTORY_REPORT = 'mgpWalletHistory/getMgpWalletReport';
export const GET_MGP_WALLETS_HISTORY = 'mgpWalletHistory/getMgpWalletHistory';
export const GET_TRANSACTION_TYPE_PLATFORM_REPORT = 'mgpWalletHistory/getTransactionType';
export const GET_MONTHLY_GST_HISTORY = 'gstConfig/getMonthlyGstHistory';
export const GET_MGP_WALLET_WITHDRAWAL_AND_DEPOSIT = 'mgpWalletHistory/getmgpWalletWithdrawalAndDeposit';

//New GST
export const ADD_NEW_GST = 'gstConfigNew';
export const UPDATE_NEW_GST = 'gstConfigNew';
export const GET_NEW_GST = 'gstConfigNew/getGstConfigNew';
export const GET_NEW_GST_HISTORY = 'gstConfigNewHistory/getUserGSTConfigNewHistoryReport';
export const GET_NEW_GST_TOTEL_REVENUE = 'gstConfigNewHistory/getGSTConfigNewHistoryTotal';
export const GET_NEW_GST_MONTHLY_HISTORY = 'gstConfigNewHistory/getMonthlyGstNewHistory';

//============================================== Master Module ============================================

export const ADD_PROMOTION_ADS_CONFIG = 'internalAdsConfig';
export const GET_PROMOTION_ADS_CONFIG = 'internalAdsConfig/getInternalAdsConfig';
export const GET_PROMOTION_ADS = 'internalAds/getInaternalAds';
export const ADD_PROMOTION_ADS = 'internalAds';
export const UPDATE_PROMOTION_ADS = 'internalAds';
export const DELETE_PROMOTION_ADS = 'internalAds';
export const ACTIVE_DEACTIVATE_PROMOTION_ADS = 'internalAds/activeDactive';
export const GET_LOBBY_TYPE = 'lobbyType/getLobbyType';
export const ADD_LOBBY_TYPE = 'lobbyType';
export const UPDATE_LOBBY_TYPE = 'lobbyType';
export const DELETE_LOBBY_TYPE = 'lobbyType';
export const GET_UPI_LIST = 'bankAndUPI/getUPIList';
export const ADD_UPI_LIST = 'bankAndUPI/addUPI';
export const UPDATE_UPI_LIST = 'bankAndUPI/updateUPI';
export const DELETE_UPI_LIST = 'bankAndUPI/deleteUPI';
export const GET_BANK_LIST = 'bankAndUPI/getBankList';
export const ADD_BANK_LIST = 'bankAndUPI/addBank';
export const UPDATE_BANK_LIST = 'bankAndUPI/updateBank';
export const DELETE_BANK_LIST = 'bankAndUPI/deleteBank';
export const ADD_GAME_MODE_DESIGN_LIST = 'gameModeDesign';
export const GET_GAME_MODE_DESIGN_LIST = 'gameModeDesign/getGameModeDesign';
export const UPDATE_GAME_MODE_DESIGN_LIST = 'gameModeDesign';
export const DELETE_GAME_MODE_DESIGN_LIST = 'gameModeDesign';
export const ADD_SPLASH_SCREEN_LIST = 'SplashScreenVideo';
export const ADD_TAGLINE_SPLASH_SCREEN_LIST = 'SplashScreenVideo/tagline';
export const GET_SPLASH_SCREEN_LIST = 'splashScreenVideo/getsplashScreenVideo';
export const UPLOAD_IMAGE_SLIDER_SPLASH_SCREEN_LIST = 'splashScreenVideo/uploadImage';
export const DELETE_IMAGE_SLIDER_SPLASH_SCREEN_LIST = 'splashScreenVideo/deleteImage';
export const ADD_BOT_LIST = 'bot';
export const GET_BOT_LIST = 'bot/getBots';
export const UPDATE_BOT_LIST = 'bot';
export const DELETE_BOT_LIST = 'bot';
export const ADD_MGP_ONLINE_PLAYER = 'MgpDummyPlayer';
export const GET_MGP_ONLINE_PLAYER = 'MgpDummyPlayer/getDummyPlayer';
export const ADD_NOTIFICATION_LIST = 'notification';
export const GET_NOTIFICATION_LIST = 'notification/getNotification';
export const UPDATE_NOTIFICATION_LIST = 'notification';
export const DELETE_NOTIFICATION_LIST = 'notification';
export const ADD_NOTIFICATION_TYPE = 'notificationUserType';
export const GET_NOTIFICATION_TYPE = 'notificationUserType/getNotificationUserType';
export const GET_NOTIFICATION_USER_TYPE_DROPDOWN = 'notificationUserType/getNotificationType';
export const GET_NOTIFICATION_OFFER_DROPDOWN = 'offer/getOfferDropDown';
export const DELETE_NOTIFICATION_TYPE = 'notificationUserType';
export const ADD_WITHDRAWAL_PROCESSING_FEES = 'withdrawalProcessingFees';
export const GET_WITHDRAWAL_PROCESSING_FEES = 'withdrawalProcessingFees/getWithdrawalProcessingFees';
export const UPDATE_WITHDRAWAL_PROCESSING_FEES = 'withdrawalProcessingFees/updateWithdrawalProcessingFees';
export const DELETE_WITHDRAWAL_PROCESSING_FEES = 'withdrawalProcessingFees/deleteWithdrawalProcessingFees';
export const DELETE_WITHDRAWAL_PROCESSING_FEES_REPORT = 'withdrawalReport/userWithdrawalReport';
export const GET_AVATAR = 'avatar/getAvatars';
export const ADD_AVATAR = 'avatar';
export const UPDATE_AVATAR = 'avatar';
export const DELETE_AVATAR = 'avatar';

export const GET_LEVEL = 'level/getLevels';
export const ADD_LEVEL = 'level';
export const UPDATE_LEVEL = 'level';
export const DELETE_LEVEL = 'level';

export const GET_PAYMENT_GATEWAY_SETTINGS = 'paymentGateway/getPaymentGateway';
export const ADD_PAYMENT_GATEWAY_SETTINGS = 'paymentGateway';
export const UPDATE_PAYMENT_GATEWAY_SETTINGS = 'paymentGateway';

export const ADD_REASON_REPORT = 'reportReason';
export const GET_REASON_REPORT = 'reportReason/getReportReason';
export const UPDATE_REASON_REPORT = 'reportReason';
export const DELETE_REASON_REPORT = 'reportReason/deleteReportReason';
//getLevels
//Splash screen Image
export const GET_SPLASH_SCREEN_IMAGES = "splashScreenImage/getSplashScreenImages";
export const ADD_SPLASH_SCREEN_IMAGE = "splashScreenImage ";
export const DELETE_SPLASH_SCREEN_IMAGE = "splashScreenImage";
export const EDIT_SPLASH_SCREEN_IMAGE = "splashScreenImage";
//============================================== Setting Module ============================================

export const GET_SETTING_CONFIG = 'settingConfig/getConfig';
export const ADD_SETTING_CONFIG = 'settingConfig';
export const UPDATE_SIGN_UP_CASH = 'settingConfig/updateSignupCash';
export const UPDATE_SIGN_UP_BONUS = 'settingConfig/updateSignupBonus';
export const UPDATE_MINIMUM_ADD_CASH = 'settingConfig/updateMinimumAddCash';
export const UPDATE_MINIMUM_WITHDRAWAL_CASH = 'settingConfig/updateMinimumWithdrawCash';
export const UPDATE_MAXIMUM_ADD_CASH = 'settingConfig/updateMaximumAddCash';
export const UPDATE_MAXIMUM_WITHDRAWAL_CASH = 'settingConfig/updateMaximumWithdrawCash';
export const MONTHLY_DEPOSIT_CASH = 'settingConfig/updateMonthlyDepositCash';
export const DEFAULT_USER_MONTHLY_DEPOSIT_CASH = 'settingConfig/updateDefaultUserMonthlyDepositLimit';
export const DEFAULT_USER_DAILY_DEPOSIT_LIMIT = 'settingConfig/updateDefaultUserDailyDepositLimit';
export const UPDATE_PLATFORM_COMMISSION_CASE = 'settingConfig/updatePlatformCommission';
export const UPDATE_BONUS_EXPIRE_DAYS_CASE = 'settingConfig/updateBonusExpireDays';

// Globle Config
export const UPDATE_GLOBLE_GAME_CASE = 'settingConfig/updateGameCashConfig';
export const GET_GLOBLE_CONFIG = 'settingConfig/getConfigForCash';

export const GET_COUNTRIES_RESTRICT_GEO_DROPDOWN = 'country/getAllCountryNames';
export const GET_ALL_COUNTRIES = 'country/getAllCountries';
export const GET_ALL_STATES = 'country/getAllStates';
export const ADD_RESTRICT_GEO = 'restrictGeo';
export const DELETE_RESTRICT_GEO = 'restrictGeo';
export const UPDATE_RESTRICT_GEO = 'restrictGeo';
export const GET_RESTRICT_GEO = 'restrictGeo/getRestrictGeo';
export const ADD_SETTING_FLAG_CONFIG = 'flagConfig';
export const GET_SETTING_FLAG_CONFIG = 'flagConfig/getFlagConfig';
export const ADD_MAINTENANCE = 'maintenance';
export const GET_MAINTENANCE = 'maintenance/getMaintenance';
export const DELETE_MAINTENANCE = 'maintenance';
export const GET_PAYMENT_GATEWAY = 'paymentGateway/getPaymentGateway';
export const CHOOSE_PAYMENT_GATEWAY = "paymentGateway";
export const GET_MAINTENANCE_HISTORY = "maintenance/getMaintenance";
export const GET_ACTIVE_MAINTENANCE = "maintenance/getActiveMaintenance";

//============================================== MGP Release Module ============================================
export const UPDATE_MGP_RELEASE = 'mgpRelease';
export const ADD_MGP_RELEASE = 'mgpRelease';
export const GET_MGP_RELEASE = 'mgpRelease/getMgpReleases';
export const MGP_RELEASE_HALF_ROLL_OUT = 'mgpRelease/haltRollout';
export const MGP_RELEASE_UPDATE_ROLL_OUT = 'mgpRelease/updateRollout';
export const ADD_DOWNLOAD_APPLICATION = 'downloadApplication';
export const GET_DOWNLOAD_APPLICATION = 'downloadApplication/getApplication';
export const UPDATE_DOWNLOAD_APPLICATION = 'downloadApplication';
export const DELETE_DOWNLOAD_APPLICATION = 'downloadApplication';
export const ACTIVE_DEACTIVATE_MGP_RELEASE = 'mgpRelease/activeDeactive';
export const DELETE_MGP_RELEASE = 'mgpRelease/deleteMgpReleaseValidation';


//============================================== TDS Report ============================================
export const GET_GAME_WISE_TDS_REPORT = 'tds/getGameWiseTdsReport';
export const GET_GAME_WISE_USER_TDS_REPORT = 'tds/getGameTdsReport';
export const GET_PARTICULAR_USER_WISE_TDS_REPORT = 'tds/getUserTdsReport';
export const GET_ALL_USER_WISE_TDS_REPORT = 'tds/getUserWiseTdsReport';
export const VIEW_ALL_USER_WISE_TDS_REPORT = 'tds/getUserWiseTdsReport/view';
export const ADD_TDS_CONFIG = 'tdsConfig';
export const GET_TDS_CONFIG = 'tdsConfig/getTdsConfig';

export const ADD_TDS_CHALLAN_DETAILS = 'TDSchallan/addTDSChallanDetails';
export const GET_TDS_CHALLAN_DETAILS = 'TDSchallan/getTDSChallanDetails';
export const UPDATE_TDS_CHALLAN_DETAILS = 'TDSchallan/updateTDSChallanDetails';
export const EXPORT_CHALAN_FILE = 'TDSchallan/exportTDSChallanDetails';
export const GET_TDS_CHALLAN = 'TDSchallan/getTotalPayableTDSChallanReport';
export const GET_TDS_FILLING = 'TDSfiling/getTDSPayerDetails';
export const GET_TDS_RESPONSIBLE_PERSON = 'TDSfiling/getTDSResponsiblePersonDetails';
export const ADD_TDS_FILLING = 'TDSfiling/addTDSPayerDetails';
export const ADD_TDS_RESPONSIBLE_PERSON = 'TDSfiling/addTDSResponsiblePersonDetails';

export const GET_TDS_FAQS = 'FAQ/getTDSFAQ';
export const GET_ALL_TDS_FAQ_TYPE = 'FAQType/getTDSFAQType';

//addSandboxPrepareTDSReturn
export const ADD_SANDBOX_PREPARE_TDS_RETURN = 'TDSfiling/sandboxPrepareTDSReturn';
export const GET_SANDBOX_PREPARE_TDS_RETURN = 'TDSfiling/getPrepareTDSReturn';
export const UPLOAD_SANDBOX_PREPARE_TDS_RETURN_EXCEL_FILE = 'TDSfiling/sandboxPrepareTDSReturn';
export const CHECK_STATUS_SANDBOX_PREPARE_TDS_RETURN = 'TDSfiling/getPreparedTDSReturnStatus';
export const UPLOAD_SANDBOX_E_FILE_TDS_RETURN_CSI_FILE = 'TDSfiling/sandboxEfileTDSReturnCSIPutRequest';
export const GET_SANDBOX_E_FILE_TDS_RETURN = 'TDSfiling/getEFileTDSReturn';
export const ADD_SANDBOX_E_FILE_TDS_RETURN = 'TDSfiling/sandboxEFileTDSReturn';
export const UPLOAD_SANDBOX_E_FILE_TDS_RETURN_TXT_FILE = 'TDSfiling/sandboxEfileTDSReturnPutRequest';

export const CHECK_STATUS_SANDBOX_E_FILE_TDS_RETURN = 'TDSfiling/getEFileTDSReturnStatus';

export const GET_SANDBOX_TDS_FORM_16A = 'TDSfiling/getTDSDownloadForm16A';
export const ADD_SANDBOX_TDS_FORM_16A = 'TDSfiling/sandboxTRACESAuthenticate';
export const DOWNLOAD_SANDBOX_TDS_FORM_16A = 'TDSfiling/TDSDownloadForm16A';
export const DOWNLOAD_SANDBOX_TDS_FORM_16A_STATUS = 'TDSfiling/downloadTDSForm16AJobStatus';

//DistributionUploadForm16APDF

export const DISTRIBUTION_UPLOAD_FORM_16A_PDF = 'distributeForm16A/uploadForm16AUserWise';
export const GET_DISTRIBUTION_UPLOAD_FORM_16A_PDF = 'distributeForm16A/getform16A';
//============================================== Help and Support ============================================

export const MARK_AS_READ = '/helpTicketType/helpAndSupportReadMessages';
export const GET_HELP_TICKET_TYPE = 'helpTicketType/getTicket';
export const ADD_HELP_TICKET_TYPE = 'helpTicketType';
export const UPDATE_HELP_TICKET_TYPE = 'helpTicketType';
export const DELETE_HELP_TICKET_TYPE = 'helpTicketType';
export const GET_HELP_AND_SUPPORT_LIST = 'helpTicketType/getHelpAndSupportList';
export const GET_HELP_AND_SUPPORT_TYPE_DROPDOWN = 'helpTicketType/getTicketForDropdown';
export const ADD_HELP_AND_SUPPORT_MESSAGE = 'helpTicketType/addHelpAndSupportMessage';
export const GET_SUPPORT_EMAIL = 'helpAndSupport/getEmail';
export const ADD_SUPPORT_EMAIL = 'helpAndSupport/email';
export const DELETE_SUPPORT_EMAIL = 'helpAndSupport/email';
export const GET_CUSTOMER_CARE = 'customerCare/getCustomerCare';
export const ADD_CUSTOMER_CARE = 'customerCare';
export const DELETE_CUSTOMER_CARE = 'customerCare';
export const UPDATE_CUSTOMER_CARE = 'customerCare';
export const GET_WHATS_APP_SUPPORT = 'whatsAppSupport/getWhatsAppSupport';
export const ADD_WHATS_APP_SUPPORT = 'whatsAppSupport';
export const ADD_TICKET_VIDEO = 'ticketVideo';
export const UPLOAD_IMAGE_SLIDER_TICKET_VIDEO = 'ticketVideo/uploadImage';
export const GET_TICKET_VIDEO = 'ticketVideo/getTicketVideo';
export const DELETE_IMAGE_SLIDER_TICKET_VIDEO = 'ticketVideo/deleteImage';
export const ADD_FAQ_TYPE = 'FAQType';
export const GET_FAQ_TYPE = 'FAQType/getFAQType';
export const DELETE_FAQ_TYPE = 'FAQType';
export const UPDATE_FAQ_TYPE = 'FAQType';
export const GET_ALL_FAQ_TYPE = 'FAQType/getAllFAQType';
export const ADD_FAQ_QUESTIONS = 'FAQ';
export const GET_FAQ_QUESTIONS = 'FAQ/getFAQ';
export const DELETE_FAQ_QUESTIONS = 'FAQ';
export const UPDATE_FAQ_QUESTIONS = 'FAQ';
export const ADD_FAQ_TITLE = 'FAQTitle';
export const GET_FAQ_TITLE = 'FAQTitle/getFAQTitle';

export const DELETE_HELP_DESK_IMAGE = 'ticketVideo';
export const GET_TICKET_TYPE_CONFIG = 'ticketVideoConfig/getTicketVideoConfig';
export const ADD_TICKET_TYPE_CONFIG = 'ticketVideoConfig';
export const ADD_HELP_DESK_HEADER = 'ticketVideo';
export const UPDATE_TICKET_VIDEO = 'ticketVideo';
export const UPDATE_HELP_DESK_HEADER = 'ticketVideo';
//============================================== Documentation Module ============================================

export const GET_LEGAL_POLICY = 'legal/getLegal';
export const ADD_LEGAL_POLICY = 'legal';
export const GET_PRIVACY_POLICY = 'privacyPolicy/getPrivacyPolicy';
export const ADD_PRIVACY_POLICY = 'privacyPolicy';
export const GET_TERMS_AND_CONDITIONS_POLICY = 'termsAndCondition/getTermsAndCondition';
export const ADD_TERMS_AND_CONDITIONS_POLICY = 'termsAndCondition';
export const DOCUMENTATION_UPLOAD_IMAGE = 'documentation/uploadImage';
export const GET_REFUND_POLICY = 'refundPolicy/getRefundPolicy';
export const ADD_REFUND_POLICY = 'refundPolicy';
export const GET_DELETE_USER_ACCOUNT_POLICY = 'userDeleteAccountRules/getuserDeleteAccountRules';
export const ADD_DELETE_USER_ACCOUNT_POLICY = 'userDeleteAccountRules';
export const ADD_DELETE_USER_ACCOUNT_TERMS_ADN_CONDITION_POLICY = 'userDeleteAccountRules/termsAndConditions';
export const GET_WALLET_POLICY = 'walletRules/getWalletRules';
export const ADD_WALLET_POLICY = 'walletRules';
export const GET_GST_POLICY = 'gstConfigNewRules/getGstConfigNewRules';
export const ADD_GST_POLICY = 'gstConfigNewRules';
export const GET_FAIR_POLICY = 'fairPlayPolicy';
export const ADD_FAIR_POLICY = 'fairPlayPolicy';
// export const GET_LEADERBOARD_RULES = 'leaderboardBonusRules/getLeaderboardBonusRules';
// export const ADD_LEADERBOARD_RULES = 'leaderboardBonusRules';
export const GET_LEADERBOARD_RULES = 'gameLeaderboardRules/getGameLeaderboardRules';
export const ADD_LEADERBOARD_RULES = 'gameLeaderboardRules';
export const GET_REFER_AND_EARN_RULES = 'referAndEarnBonusRules/getReferAndEarnBonusRules';
export const ADD_REFER_AND_EARN_RULES = 'referAndEarnBonusRules';
export const GET_WITHDRAWAL_TERM_AND_CONDITION = 'withdrawalTermAndCondition/getWithdrawalTermsAndCondition';
export const ADD_WITHDRAWAL_TERM_AND_CONDITION = 'withdrawalTermAndCondition';

//============================================== Design Module ============================================
export const GET_LOGIN_SCREEN_TYPE_CONFIG = "loginScreenConfig/getLoginScreenConfig";
export const ADD_LOGIN_SCREEN_TYPE_CONFIG = "loginScreenConfig";
export const DELETE_IMAGE = "mgpAppScreen/loginScreen";
export const UPDATE_LOGIN_SCREEN_LOGO = 'mgpAppScreen/loginScreen'; 

export const ADD_LOGIN_SCREEN_LOGO = 'mgpAppScreen/loginScreen';
export const UPLOAD_SLIDER_LOGIN_SCREEN_LOGO = 'mgpAppScreen/loginScreen/uploadImage';
export const ADD_LOGIN_SCREEN_PRIVACY_POLICY = 'mgpAppScreen/loginScreen/addLoginScreenPrivacyPolicy';
export const GET_LOGIN_SCREEN_LOGO = 'mgpAppScreen/loginScreen/getLoginScreen';

export const GET_FOOTER_ICONS = 'mgpAppScreen/loginScreen/footerIcon/getFooterIcons';
export const ADD_FOOTER_ICONS = 'mgpAppScreen/loginScreen/footerIcon';
export const EDIT_FOOTER_ICONS = 'mgpAppScreen/loginScreen/footerIcon';
export const DELETE_FOOTER_ICONS = 'mgpAppScreen/loginScreen/footerIcon';
export const GET_HOME_FOOTER_ICONS = 'mgpAppScreen/homeScreenFooterIcon/getHomeScreenFooterIcon';
export const ADD_HOME_FOOTER_ICONS = 'mgpAppScreen/homeScreenFooterIcon';
export const DELETE_HOME_FOOTER_ICONS = 'mgpAppScreen/homeScreenFooterIcon';
export const UPDATE_HOME_FOOTER_ICONS = 'mgpAppScreen/homeScreenFooterIcon';
export const GET_HOME_SCREEN_LOGO = 'mgpAppScreen/homeScreenFooterLogo/gethomeScreenFooterLogo';
export const ADD_HOME_SCREEN_LOGO = 'mgpAppScreen/homeScreenFooterLogo';
export const DELETE_HOME_SCREEN_LOGO = 'mgpAppScreen/homeScreenFooterLogo';
export const UPDATE_HOME_SCREEN_LOGO = 'mgpAppScreen/homeScreenFooterIcon';
export const GET_DESIGN_REFER_AND_EARN_TITLE = 'mgpAppScreen/referAndEarnScreen/referAndEarnTitle/getReferAndEarnTitle';
export const ADD_DESIGN_REFER_AND_EARN_TITLE = 'mgpAppScreen/referAndEarnScreen/referAndEarnTitle';
export const GET_REFER_AND_EARN_STEPS = 'mgpAppScreen/referAndEarnScreen/referAndEarnSteps/getReferAndEarnSteps';
export const ADD_REFER_AND_EARN_STEPS = 'mgpAppScreen/referAndEarnScreen/referAndEarnSteps';
export const DELETE_REFER_AND_EARN_STEPS = 'mgpAppScreen/referAndEarnScreen/referAndEarnSteps';
export const UPDATE_REFER_AND_EARN_STEPS = 'mgpAppScreen/referAndEarnScreen/referAndEarnSteps';
export const GET_PAYMENT_SETTINGS = 'mgpAppScreen/paymentSettingMode/getPaymentSettingModeIcons';
export const ADD_PAYMENT_SETTINGS = 'mgpAppScreen/paymentSettingMode';
export const DELETE_PAYMENT_SETTINGS = 'mgpAppScreen/paymentSettingMode';
export const UPDATE_PAYMENT_SETTINGS = 'mgpAppScreen/paymentSettingMode';
export const GET_KYC_HEADER_LOGO = 'mgpAppScreen/KYCScreen/KYCHeader/getKycHeaderIcons';
export const ADD_KYC_HEADER_LOGO = 'mgpAppScreen/KYCScreen/KYCHeader';
export const GET_KYC_SCREEN_ICON = 'mgpAppScreen/KYCScreen/getKycScreenIcons';
export const ADD_KYC_SCREEN_ICON = 'mgpAppScreen/KYCScreen';
export const DELETE_KYC_SCREEN_ICON = 'mgpAppScreen/KYCScreen';
export const UPDATE_KYC_SCREEN_ICON = 'mgpAppScreen/KYCScreen'
export const GET_WALLET_HELP_SCREEN_ICON = 'mgpAppScreen/walletScreen/walletHelpScreen/getWalletHelpScreenIcons';
export const ADD_WALLET_HELP_SCREEN_ICON = 'mgpAppScreen/walletScreen/walletHelpScreen';
export const DELETE_WALLET_HELP_SCREEN_ICON = 'mgpAppScreen/walletScreen/walletHelpScreen';
export const UPDATE_WALLET_HELP_SCREEN_ICON = 'mgpAppScreen/walletScreen/walletHelpScreen'
export const GET_WALLET_SCREEN_ICON = 'mgpAppScreen/walletScreen/getWalletScreenIcons';
export const ADD_WALLET_SCREEN_ICON = 'mgpAppScreen/walletScreen';
export const DELETE_WALLET_SCREEN_ICON = 'mgpAppScreen/walletScreen';
export const UPDATE_WALLET_SCREEN_ICON = 'mgpAppScreen/walletScreen'

export const SWAP_FOOTER_ICONS = 'mgpAppScreen/homeScreenFooterIcon/swapPosition';


//========================================== website Module ================================================

export const ADD_WEBSITE_HEADER = 'webSiteHeader';
export const GET_WEBSITE_HEADER = 'webSiteHeader/getWebsiteHeaders';
export const UPDATE_WEBSITE_HEADER = 'webSiteHeader'
export const DELETE_WEBSITE_HEADER = 'webSiteHeader';
export const SWAP_POSITION_WEBSITE_HEADER = 'webSiteHeader/swapPosition';
//swapPositionHeaderSlider


export const ADD_WEBSITE_GAME_LIST = 'webSiteGames';
export const GET_WEBSITE_GAME_LIST = 'webSiteGames/getWebsiteGames';
export const UPDATE_WEBSITE_GAME_LIST = 'webSiteGames'
export const DELETE_WEBSITE_GAME_LIST = 'webSiteGames';
export const ACTIVE_DEACTIVATE_WEBSITE_GAME_LIST = 'webSiteGames/activeDeactiveWebSiteGameStatus';

export const WEBSITE_GAME_UPDATE_SCREENSHOTS = 'webSiteGames/updateScreenshots';
export const WEBSITE_GAME_DELETE_SCREENSHOTS = 'webSiteGames/deleteScreenshots';

export const ADD_WEBSITE_WINNER_LIST = 'webSiteWinner';
export const GET_WEBSITE_WINNER_LIST = 'webSiteWinner/getWinners';
export const UPDATE_WEBSITE_WINNER_LIST = 'webSiteWinner'
export const DELETE_WEBSITE_WINNER_LIST = 'webSiteWinner';

export const ADD_WEBSITE_ABOUT_LIST = 'webSiteAbout';
export const GET_WEBSITE_ABOUT_LIST = 'webSiteAbout/getWebsiteAbout';
export const UPDATE_WEBSITE_ABOUT_LIST = 'webSiteAbout'
export const DELETE_WEBSITE_ABOUT_LIST = 'webSiteAbout';

export const ADD_WEBSITE_SOCIAL_MEDIA = 'webSiteSocialMedia';
export const GET_WEBSITE_SOCIAL_MEDIA = 'webSiteSocialMedia/getSocialMedia';
export const UPDATE_WEBSITE_SOCIAL_MEDIA = 'webSiteSocialMedia'
export const DELETE_WEBSITE_SOCIAL_MEDIA = 'webSiteSocialMedia';

export const GET_WEBSITE_DOWNLOAD_NUMBER = 'webSiteDownloadList/getDownloadList';

export const ADD_WEBSITE_WINNER_TITLE = 'webSiteWinnerTitle';
export const GET_WEBSITE_WINNER_TITLE = 'getWebsiteWinnerTitle';
export const DELETE_WEBSITE_WINNER_TITLE = 'webSiteWinnerTitle';

export const ADD_WEBSITE_FOOTER_TITLE = 'webSiteFooter';
export const GET_WEBSITE_FOOTER_TITLE = 'webSiteFooter/getFooter';
export const UPDATE_WEBSITE_FOOTER_TITLE = 'webSiteFooter'
export const DELETE_WEBSITE_FOOTER_TITLE = 'webSiteFooter';

//============================================== Company Logo Module ============================================

export const GET_COMPANY_LOGO = 'companyLogo/getCompanyLogo';
export const ADD_COMPANY_LOGO = 'companyLogo';
export const UPDATE_COMPANY_LOGO = '';
export const DELETE_COMPANY_LOGO = '';

//==============================================withdrawal ==============================================//

export const GET_UPI_TRANSACTION = 'upiQrCode/getUpiQrCode';
export const DELETE_USER_TRANSACTION_QR = 'upiQrCode/deleteUpiQrCodeNotPending'
export const GET_USER_DEPOSIT_REQUEST = 'getAddDepositCashList';
export const GET_WITHDRAW_MANUALLY_REQUEST = 'withdrawManually/getWithdrawWinCashRequest';
export const ACTIVATE_DEACTIVATE_UPI_TRANSACTION = 'upiQrCode/activeDeactive';
export const ADD_UPI_TRANSACTION = 'upiQrCode';
export const APPROVE_REJECT_USER_DEPOSIT_REQUEST = 'addDepositCash/approveReject';

//==============================================GST ==============================================//
export const GET_GAME_WISE_GST_REPORT = 'gstConfigNewHistory/getUserMonthWiseGSTReport';
export const GET_GAME_WISE_USER_GST_REPORT = 'gstConfigNewHistory/getGameGstReport';
export const GET_ALL_GST_REPORT = 'gstConfigNewHistory/getGSTUserReport';
export const VIEW_ALL_USER_WISE_GST_REPORT = 'gstConfigNewHistory/getUserWiseGstReport/view';
export const GET_GST_CONFIG_PERCENT = 'gstConfigwinning/getGsTConfig';
export const ADD_GST_CONFIG_PERCENT = 'gstConfigwinning';


// ================================ Super Admin Notification ============================
export const GET_UNREAD_NOTIFICATION_COUNT = 'adminNotification/getUnreadNotificationCount';
export const GET_NOTIFICATION = 'adminNotification/getNotifications';
export const ADD_MARK_AS_READ_ALL_NOTIFICATION = 'adminNotification/markAsReadAllNotification';
export const DELETE_NOTIFICATION = 'adminNotification/deleteAllNotification';
export const SINGLE_MARK_AS_READ_NOTIFICATION = 'adminNotification/markAsReadNotification';

// export const GET_PAYMENT_GATEWAY_SETTINGS = 'paymentGateway/getPaymentGateway';
// export const ADD_PAYMENT_GATEWAY_SETTINGS = 'paymentGateway';
// export const UPDATE_PAYMENT_GATEWAY_SETTINGS = 'paymentGateway';

//============================================== Tournament ============================================
export const GET_TOURNAMENT_GAMELIST = 'tournament/getGameListModeWise';
export const ADD_TOURNAMENT_LOBBY = 'tournament';
export const GET_TOURNAMENT_LOBBY = 'tournament/getTournaments';

// Tournament Documents Tab
export const ADD_TOURNAMENT_RULES = 'tournamentRules';
export const GET_TOURNAMENT_RULES = 'tournamentRules/getTournamentRules';
export const ADD_TERMSANDCONDITIONS_RULES = 'tournamentTermsAndCondition';
export const GET_TERMSANDCONDITIONS_RULES = 'tournamentTermsAndCondition/getTournamentTermsAndCondition';
export const ADD_REFUNDRULES_RULES = 'tournamentRefundRules';
export const GET_REFUNDRULES_RULES = 'tournamentRefundRules/getTournamentRefundRules';
export const ADD_TIMEBONUS_RULES = 'tournamentTimeBonusRules';
export const GET_TIMEBONUS_RULES = 'tournamentTimeBonusRules/getTournamentTimeBonusRules';
export const ADD_TOURNAMENT_LEADERBOARD_RULES = 'tournamentLeaderboardRules';
export const GET_TOURNAMENT_LEADERBOARD_RULES = 'tournamentLeaderboardRules/getTournamentLeaderboardRules';
export const UPDATE_TOURNAMENT = 'tournament ';
export const DELETE_TOURNAMENT = 'tournament ';
export const CREATE_TOURNAMENT_REGISTRATION = 'tournamentRegistration';
export const GET_TOURNAMENT_LIST = 'tournamentRegistration/getTournamentRegistration';
export const UPDATE_TOURNAMENT_REGISTRATION = 'tournamentRegistration';
export const DELETE_TOURNAMENT_LIST = 'tournamentRegistration';
export const GET_TOURNAMENT_DETAILS_LIST = 'tournament/getTournamentDetails';

export const CREATE_TOURNAMENT_NOTIFICATION_LIST = 'tournamentNotification';
export const GET_TOURNAMENT_DETAILS_OF_NOTIFICATIONS = 'tournamentRegistration/getLiveTournamentsDetails';
export const GET_TOURNAMENT_NOTIFICATION_LIST = 'tournamentNotification/getTournamentNotification';
export const DELETE_TOURNAMENT_NOTIFICATION_LIST = 'tournamentNotification';
export const UPDATE_TOURNAMENT_NOTIFICATION_LIST = 'tournamentNotification';
export const GET_LEADERBOARD_TOURNAMENT_LIST = 'tournamentLeaderboard/getList';

