let PopComponent = {};

PopComponent["CommonPop"] = require("../Components/Modal/CustomPopup").default;
PopComponent["DeleteCommonModal"] = require("../Components/Modal/DeleteCommonModal").default;
PopComponent["ForgotPassword"] = require("../Components/Modal/ForgotPassword").default;

//============================================= Admin Module Popup ================================================
PopComponent["AddAdminUserList"] = require("../Components/Modal/AdminUser/AddAdminUserList").default;
PopComponent["ActiveUserModal"] = require("../Components/Modal/AdminUser/ActiveUserModal").default;
PopComponent["AddSubAdminPopup"] = require("../Pages/SubAdminUser/AddSubAdminPopup").default;
PopComponent["EditSubAdminPopup"] = require("../Pages/SubAdminUser/EditSubAdminPopup").default;
PopComponent["ActivateDeactivateSubAdmin"] = require("../Pages/SubAdminUser/ActivateDeactivateSubAdmin").default;

//============================================= User Module Popup ================================================
PopComponent["AddTraderUser"] = require("../Components/Modal/TraderUser/AddAdminUserList").default;
PopComponent["BlockUser"] = require("../Components/Modal/User/BlockUser").default;
PopComponent["ViewTransitionHistory"] = require("../Components/Modal/User/ViewTransitionHistory").default;
// PopComponent["ViewGamePlayedHistory"] = require("../Components/Modal/User/ViewGamePlayedHistory").default;
PopComponent["UpdateCashAndBonus"] = require("../Components/Modal/User/UpdateCashAndBonus").default;
PopComponent["ViewKYCDetailsPopup"] = require("../Pages/Users/UserKYC/UserKYCRequest/ViewKYCDetailsPopup").default;
PopComponent["ApproveUserKYCRequest"] = require("../Pages/Users/UserKYC/UserKYCRequest/ApproveUserKYCRequest").default;
PopComponent["RejectUserKYCRequest"] = require("../Pages/Users/UserKYC/UserKYCRequest/RejectUserKYCRequest").default;
PopComponent["AddConfig"] = require("../Pages/Users/ReportedUser/ReportConfig/AddConfig").default;
PopComponent["UpdateUserKYCPopup"] = require("../Pages/Users/UserKYC/UpdateUserKYCPopup").default;
PopComponent["ViewReportedUserList"] = require("../Components/Modal/User/ViewReportedUserList").default;
PopComponent["DocumentOpenPopup"] = require("../Pages/Users/UserKYC/DocumentOpenPopup").default;
PopComponent["RejectedKYCPopup"] = require("../Pages/Users/UserKYC/RejectedKYCPopup").default;
PopComponent["ApprovedKYCPopup"] = require("../Pages/Users/UserKYC/ApprovedKYCPopup").default;
PopComponent["UserBlockListView"] = require("../Pages/Users/BlockUserList/UserBlockListView").default;
PopComponent["UnblockUserPopup"] = require("../Pages/Users/BlockUserList/UnblockUserPopup").default;
PopComponent["ViewOldUserMobileNumber"] = require("../Pages/Users/UpdateUserMobileNumber/ViewOldUserMobileNumber").default;
PopComponent["ApprovedMobileNumber"] = require("../Pages/Users/UpdateUserMobileNumber/ApprovedMobileNumber").default;
PopComponent["RejectUserMobileNumber"] = require("../Pages/Users/UpdateUserMobileNumber/RejectUserMobileNumber").default;
PopComponent['ExportFilePopup'] = require('../Pages/Users/AllUserList/ExportFilePopup').default;
PopComponent['ViewInvoicePopup'] = require('../Pages/Users/UserTab/PaymentHistory/DepositHistory/ViewInvoicePopup').default;


//============================================= Game Module Popup ================================================
PopComponent["RejectedPopup"] = require("../Components/Modal/GamePopup/RejectedPopup").default;
PopComponent["ApprovedPendingPopup"] = require("../Components/Modal/GamePopup/ApprovedPendingPopup").default;
PopComponent["ActiveDeactivatedPopup"] = require("../Components/Modal/GamePopup/ActiveDeactivatedPopup").default;
PopComponent["ViewRejectedComment"] = require("../Components/Modal/GamePopup/ViewRejectedComment").default;
PopComponent["UpdateGame"] = require("../Components/Modal/GamePopup/UpdateGame").default;
PopComponent["ArchivedGamePopup"] = require("../Components/Modal/GamePopup/ArchivedGamePopup").default;
PopComponent["AddGameMode"] = require("../Pages/Games/GameDetails/GameTabDetails/GameModeTab/AddGameMode").default;
PopComponent["PokerViewPlayerRecord"] = require('../Pages/Games/GameDetails/GameTabDetails/PlayerRecord/PokerViewPlayerRecord').default;
PopComponent["CreateLobby"] = require("../Pages/Games/GameDetails/GameTabDetails/LobbyTab/CreateLobby").default;
PopComponent['UpdateLobby'] = require('../Pages/Games/GameDetails/GameTabDetails/LobbyTab/UpdateLobby').default;
PopComponent["ActiveDeactivateLobby"] = require("../Pages/Games/GameDetails/GameTabDetails/LobbyTab/ActiveDeactivateLobby").default;
PopComponent["DeleteLobby"] = require("../Pages/Games/GameDetails/GameTabDetails/LobbyTab/DeleteLobby").default;
PopComponent["ViewLobbyDetails"] = require("../Pages/Games/GameDetails/GameTabDetails/LobbyTab/ViewLobbyDetails").default;
PopComponent["CreateRecurringTournament"] = require("../Pages/Games/GameDetails/GameTabDetails/TournamentTab/RecurringTournament/CreateRecurringTournament").default;
PopComponent["CreateGameRelease"] = require("../Pages/Games/GameDetails/GameTabDetails/GameReleaseTab/CreateGameRelease").default;
PopComponent["CountryReleasePop"] = require("../Pages/Games/GameDetails/GameTabDetails/GameReleaseTab/CountryReleasePop").default;
PopComponent["AddGameBuilds"] = require("../Pages/Games/GameDetails/GameTabDetails/GameBuildsTab/AddGameBuilds").default;
PopComponent["ViewReleaseGuide"] = require("../Pages/Games/GameDetails/GameTabDetails/GameBuildsTab/ViewReleaseGuide").default;
PopComponent["UpdateGameBuild"] = require("../Pages/Games/GameDetails/GameTabDetails/GameBuildsTab/UpdateGameBuild").default;
PopComponent["DeleteHowToPlay"] = require("../Pages/Games/GameDetails/GameTabDetails/HowToPlayGameTab/DeleteHowToPlay").default;
PopComponent["AddNumberOfDecksPopup"] = require("../Pages/Games/GameDetails/GameTabDetails/GameNumberOfDecksTab/AddNumberOfDecksPopup").default;
PopComponent["AddNumberOfPlayerPopup"] = require("../Pages/Games/GameDetails/GameTabDetails/GameNumberOfPlayer/AddNumberOfPlayerPopup").default;
PopComponent["AddGameModeConfigList"] = require("../Pages/Games/GameDetails/GameTabDetails/GameModeTab/GameModeConfig/AddGameModeConfigList").default;
PopComponent["AddDummyPlayer"] = require("../Pages/Games/GameDetails/GameTabDetails/GameDummyPlayerTab/AddDummyPlayer").default;
PopComponent["ViewHowToPlayPopup"] = require("../Pages/Games/GameDetails/GameTabDetails/HowToPlayGameTab/ViewHowToPlayPopup").default;
PopComponent["viewPlayingScoreBoardPopup"] = require("../Pages/Games/GameDetails/GameTabDetails/PlayingTracking/ViewPlayingScoreBoardPopup").default;
PopComponent["activeDeactivateNumberOfPlayer"] = require("../Pages/Games/GameDetails/GameTabDetails/GameNumberOfPlayer/ActiveDeactivateNumberOfPlayer").default;
PopComponent["createHowToPlayGame"] = require("../Pages/Games/GameDetails/GameTabDetails/HowToPlayGameTab/CreateHowToPlayGame").default;
PopComponent["editHowToPlayRules"] = require("../Pages/Games/GameDetails/GameTabDetails/HowToPlayGameTab/EditHowToPlayRules").default;

PopComponent['AddGameLeaderboardRules'] = require('../Pages/Games/GameDetails/GameTabDetails/GameLeaderboard/MonthlyGameLeaderboardConfigTab/GameLeaderboardRules/AddGameLeaderboardRules').default;
PopComponent['AddMonthlyGameLeaderboardRank'] = require('../Pages/Games/GameDetails/GameTabDetails/GameLeaderboard/MonthlyGameLeaderboardConfigTab/MonthlyGameLeaderboardRankTab/AddMonthlyGameLeaderboardRank').default;
PopComponent['AddGameLeaderboardBonusAmount'] = require('../Pages/Games/GameDetails/GameTabDetails/GameLeaderboard/MonthlyGameLeaderboardConfigTab/MonthlyGameLeaderboardRankTab/GameLeaderboardBonusAmount/AddGameLeaderboardBonusAmount').default;
PopComponent['AddGameLeaderboardBonusReleaseDate'] = require('../Pages/Games/GameDetails/GameTabDetails/GameLeaderboard/MonthlyGameLeaderboardConfigTab/MonthlyGameLeaderboardRankTab/GameLeaderboardBonusReleaseDate/AddGameLeaderboardBonusReleaseDate').default;

PopComponent['ViewGameHistoryPopup'] = require('../Pages/Games/GameHistory/ViewGameHistoryPopup').default;
PopComponent['RefundGameHistory'] = require('../Pages/Games/GameHistory/RefundGameHistory').default;
PopComponent['ViewDeductedEntryFee'] = require('../Pages/Games/GameHistory/ViewDeductedEntryFee').default;
PopComponent['ViewPlayerRecord'] = require('../Pages/Games/GameDetails/GameTabDetails/PlayerRecord/ViewPlayerRecord').default;
PopComponent['AddModeWiseGameSeverLink'] = require('../Pages/Games/GameDetails/GameTabDetails/GameSetupTab/BasicStepsSetup/GameInfoDetails/GameModeWiseGameSeverLink/AddModeWiseGameSeverLink').default;
//============================================= Bonus Module Popup ================================================
PopComponent["ViewReferAndEarnList"] = require("../Pages/Bonus/ReferAndEarn/ReferAndEarnTab/ViewReferAndEarnList").default;
PopComponent["AddReferAndEarnList"] = require("../Pages/Bonus/ReferAndEarn/ReferAndEarnTab/AddReferAndEarnList").default;
PopComponent["AddLeaderboardBonus"] = require("../Pages/Bonus/Leaderboard/LeaderBoardBonusTab/AddLeaderboardBonus").default;
PopComponent["AddDailyWheelBonusConfig"] = require("../Pages/Bonus/DailyWheelBonus/DailyWheelBonusConfig/AddDailyWheelBonusConfig").default;
PopComponent["AddDailyWheelBonusType"] = require("../Pages/Bonus/DailyWheelBonus/DailyWheelBonusConfigTab/DailyWheelBonusType/AddDailyWheelBonusType").default;
PopComponent["AddDailyWheelBonusPop"] = require("../Pages/Bonus/DailyWheelBonus/AddDailyWheelBonusPop").default;
//AddReferAndEarnShareConfig
PopComponent["AddReferAndEarnShareConfig"] = require("../Pages/Bonus/ReferAndEarn/ReferAndEarnShareConfig/AddReferAndEarnShareConfig").default;
PopComponent["AddCouponCode"] = require("../Pages/Bonus/CouponCode/AddCouponCode").default;
PopComponent["AddReferAndEarnMonthly"] = require("../Pages/Bonus/ReferAndEarn/ReferAndEarnMonthlyTab/AddReferAndEarnMonthly").default;
PopComponent["AddMonthlyReferAndEarnConfigPopup"] = require("../Pages/Bonus/ReferAndEarn/ReferAndEarnMonthlyConfig/AddMonthlyReferAndEarnConfigPopup").default;
PopComponent["AddBonusReleaseDate"] = require("../Pages/Bonus/ReferAndEarn/ReferAndEarnMonthlyTab/BonusReleaseDate/AddBonusReleaseDate").default;
PopComponent["AddMonthlyBonusAmount"] = require("../Pages/Bonus/ReferAndEarn/ReferAndEarnMonthlyTab/MonthlyBonusAmount/AddMonthlyBonusAmount").default;
PopComponent["AddLeaderboardMonthlyBonusAmount"] = require("../Pages/Bonus/Leaderboard/LeaderBoardRankConfig/MonthlyBonusAmount/AddLeaderboardMonthlyBonusAmount").default;
PopComponent["AddBonusReleaseLeaderboardDate"] = require("../Pages/Bonus/Leaderboard/LeaderBoardRankConfig/BonusReleaseDate/AddBonusReleaseLeaderboardDate").default;
PopComponent["AddLeaderBoardRankConfig"] = require("../Pages/Bonus/Leaderboard/LeaderBoardRankConfig/AddLeaderBoardRankConfig").default;

//============================================= Marketing Module Popup ================================================
PopComponent['AddOffer'] = require('../Pages/Marketing/Offer/AddOffer').default;
PopComponent['AddUserTypeNotification'] = require('../Pages/Marketing/NotificationModule/UserTypeNotification/AddUserTypeNotification').default;
PopComponent['CreateAds'] = require('../Pages/Marketing/InternalAdsList/CreateAds').default;
PopComponent['ActiveDeactivatePopup'] = require('../Pages/Marketing/InternalAdsList/ActiveDeactivatePopup').default;
PopComponent['AddNotificationPopup'] = require('../Pages/Marketing/NotificationModule/AllTypeNotification/AddNotificationPopup').default;

//============================================= Master Module Popup ================================================
PopComponent["AddGenrePopup"] = require("../Components/Modal/GamePopup/AddGenrePopup").default;
PopComponent["ActiveDeactivateCategory"] = require("../Pages/Master/GenreCategory/ActiveDeactiveCategory").default;
PopComponent["AddLobbyLabel"] = require("../Pages/Master/LobbyLabel/AddLobbyLabel").default;
PopComponent["AddMGPOnlinePlayers"] = require("../Pages/Master/MGPOnlinePlayer/AddMGPOnlinePlayers").default;
PopComponent["AddGenreTypePopup"] = require("../Pages/Master/GenreCategory/GenreTypeListTab/AddGenreTypePopup").default;
PopComponent["AddGameModeDesignConfig"] = require("../Pages/Master/GameModeDesignConfig/AddGameModeDesignConfig").default;
PopComponent["AddSplashScreen"] = require("../Pages/Master/SplashScreen/AddSplashScreen").default;
PopComponent["AddBot"] = require("../Pages/Master/BotModule/AddBot").default;
PopComponent["AddAvatarPopup"] = require("../Pages/Master/Avatar/AddAvatarPopup").default;
PopComponent["UpdateRefundPolicy"] = require("../Pages/Master/Document/RefundPolicy/UpdateRefundPolicy").default;
PopComponent["AddTagLineSplashScreen"] = require("../Pages/Master/SplashScreen/TagLineTable/AddTagLineSplashScreen").default;
PopComponent["UpdateUserDeleteAccountPolicy"] = require("../Pages/Master/Document/DeleteUserPolicy/UpdateUserDeleteAccountPolicy").default;
PopComponent["AddDeleteUserAccountTermsCondition"] = require("../Pages/Master/Document/DeleteUserPolicy/DeleteTermCondition/AddDeleteUserAccountTermsCondition").default;
PopComponent["UpdateWithdrawalTermAndCondition"] = require("../Pages/Master/Document/WithdrawalTermAndCondition/UpdateWithdrawalTermAndCondition").default;
PopComponent['AddSplashScreenPopUp'] = require('../Pages/Master/SplashScreen/SplashScreenImage/AddSplashScreenPopUp').default;
//Documentation
PopComponent["UpdateFairPlayPolicy"] = require("../Pages/Master/Document/FairPlayPolicy/UpdateFairPlayPolicy").default;
PopComponent["UpdateLegalPolicyPop"] = require("../Pages/Master/Document/LegalPolicy/UpdateLegalPolicyPop").default;
PopComponent["UpdatePrivacyPolicy"] = require("../Pages/Master/Document/PrivacyPolicy/UpdatePrivacyPolicy").default;
PopComponent['UpdateLeaderboardRules'] = require('../Pages/Games/GameDetails/GameTabDetails/GameLeaderboard/MonthlyGameLeaderboardConfigTab/GameLeaderboardRules/UpdateLeaderboardRules').default;
PopComponent["UpdateReferAndEarnRules"] = require("../Pages/Master/Document/ReferAndEarnRules/UpdateReferAndEarnRules").default;
PopComponent["UpdateTermsAndCondition"] = require("../Pages/Master/Document/TermsAndConditionsPolicy/UpdateTermsAndCondition").default;
//ReportReason page
PopComponent['AddReportReason'] = require('../Pages/Master/ReportReason/AddReportReason').default;


//============================================= Design Module Popup ================================================
PopComponent['AddTypeConfig'] = require('../Pages/Design/LoginScreen/LogoAndPrivacyPolicy/LogoAndImage/SelectLoginScreenTypeConfig/AddTypeConfig').default;
PopComponent['AddLogo'] = require('../Pages/Design/LoginScreen/LogoAndPrivacyPolicy/LogoAndImage/LogoType/AddLogo').default;
PopComponent['AddImages'] = require('../Pages/Design/LoginScreen/LogoAndPrivacyPolicy/LogoAndImage/ImageType/AddImages').default;
PopComponent['UpdateLobby'] = require('../Pages/Games/GameDetails/GameTabDetails/LobbyTab/UpdateLobby').default;
PopComponent["AddFooterPopup"] = require("../Pages/Design/LoginScreen/FooterIcon/AddFooterPopup").default;
PopComponent["TitleEditPopUp"] = require("../Pages/Design/ReferAndEarn/ReferAndEarnTitle/TitleEditPopUp").default;
PopComponent["AddReferAndEarnDetailPopUp"] = require("../Pages/Design/ReferAndEarn/ReferAndEarnSteps/AddReferAndEarnDetailPopUp").default;
PopComponent["AddHomeScreenFooterIconPopup"] = require("../Pages/Design/HomeScreen/HomeScreenFooterIcon/AddHomeScreenFooterIconPopup").default;
PopComponent["AddPaymentSettingPopUp"] = require("../Pages/Design/PaymentSettings/AddPaymentSettingPopUp").default;
PopComponent["AddKYCScreenIcon"] = require("../Pages/Design/KYCScreen/KYCScreenIconTab/AddKYCScreenIcon").default;
PopComponent["AddHomeScreenLogo"] = require("../Pages/Design/HomeScreen/HomeScreenLogo/AddHomeScreenLogo").default;
PopComponent["AddKYCScreenHeader"] = require("../Pages/Design/KYCScreen/KYCScreenHeaderIconTab/AddKYCScreenHeader").default;
PopComponent["AddWalletScreenIconPopUp"] = require("../Pages/Design/WalletScreen/WalletScreenHelp/AddWalletScreenIconPopUp").default;
PopComponent["AddWalletIconPopUp"] = require("../Pages/Design/WalletScreen/WalletScreenIcon/AddWalletIconPopUp").default;
//AddLogoAndImages
PopComponent["AddLogoPrivacyPolicy"] = require("../Pages/Design/LoginScreen/LogoAndPrivacyPolicy/LogoPrivacyPolicy/AddLogoPrivacyPolicy").default;



//============================================= MGP Release Module Popup ================================================
PopComponent["AddMGPRelease"] = require("../Pages/MGPRelease/AddMGPRelease").default;
PopComponent["HaltRollOutPopup"] = require("../Pages/MGPRelease/haltRollOutPopup").default;
PopComponent["UpdateRollOutPopup"] = require("../Pages/MGPRelease/MGPReleaseTab/UpdateRollOutPopup").default;
PopComponent['ActiveDeactivateMGPRelease'] = require('../Pages/MGPRelease/ActiveDeactivateMGPRelease').default;


//============================================= Help And Support Module Popup ================================================
PopComponent["AddTicketTypePop"] = require("../Pages/HelpAndSupport/Ticket/AddTicketTypePop").default;
PopComponent["AddEmailPopup"] = require("../Pages/HelpAndSupport/EmailModule/AddEmailPopup").default;
PopComponent["AddCustomerCare"] = require("../Pages/HelpAndSupport/CustomerCareTab/AddCustomerCare").default;
PopComponent["AddTicketsVideo"] = require("../Pages/HelpAndSupport/TicketsVideoTab/AddTicketsVideo").default;
PopComponent["ViewVideoImage"] = require("../Pages/HelpAndSupport/TicketsVideoTab/ViewVideoImage").default;
PopComponent["AddFAQPopup"] = require("../Pages/HelpAndSupport/FAQQuestionTab/AddFAQPopup").default;
PopComponent["AddFAQTypePopup"] = require("../Pages/HelpAndSupport/FAQQuestionTab/FAQType/AddFAQTypePopup").default;
PopComponent["AddFAQTitle"] = require("../Pages/HelpAndSupport/FAQQuestionTab/FAQTitle/AddFAQTitle").default;
PopComponent["AddWhatsAppMobileNumberPopup"] = require("../Pages/HelpAndSupport/WhatsAppSupportTab/AddWhatsAppMobileNumberPopup").default;
PopComponent['AddTicketTypeConfig'] = require('../Pages/HelpAndSupport/TicketsVideoTab/VideoAndImage/SelectTicketTypeConfig/AddTicketTypeConfig').default;
PopComponent['AddHelpDeskTicketVideo'] = require('../Pages/HelpAndSupport/TicketsVideoTab/VideoAndImage/VideoType/AddHelpDeskTicketVideo').default;
PopComponent['AddHelpDeskHeaderImage'] = require('../Pages/HelpAndSupport/TicketsVideoTab/VideoAndImage/ImageType/AddHelpDeskHeaderImage').default;

//============================================= Withdrawal Module Popup ================================================
PopComponent["AddWithdrawalProcessingFees"] = require("../Pages/Withdrawal/WithdrawalProcessingFees/WithdrawalProcessingFeesTab/AddWithdrawalProcessingFees").default;
PopComponent["ApproveUserDepositRequest"] = require("../Pages/Withdrawal/UserDepositRequest/ApproveUserDepositRequest").default;
PopComponent["RejectUserDepositRequest"] = require("../Pages/Withdrawal/UserDepositRequest/RejectUserDepositRequest").default;
PopComponent["AddBankAndUpi"] = require("../Pages/Withdrawal/BankAndUPI/AddBankAndUpi").default;
PopComponent["AddWithdrawalUPI"] = require("../Pages/Withdrawal/BankAndUPI/AddWithdrawalUPI").default;
PopComponent["ApprovedWithdrawalRequest"] = require("../Pages/Withdrawal/UserWithdrawalRequests/ApprovedWithdrawalRequest").default;
PopComponent["AddUPITransaction"] = require("../Pages/Withdrawal/UPITransaction/AddUPITransaction").default;
PopComponent["ActivateDeactivateUPITransaction"] = require("../Pages/Withdrawal/UPITransaction/ActivateDeactivateUPITransaction").default;
PopComponent["ActivateDeactivateUserDepositRequest"] = require("../Pages/Withdrawal/UserDepositRequest/ActivateDeactivateUserDepositRequest").default;
PopComponent['ViewWithdrawApproveDetails'] = require('../Pages/Withdrawal/UserWithdrawalRequests/ViewWithdrawApproveDetails').default;

//============================================= GST ================================================
PopComponent['ViewUserGSTReport'] = require('../Pages/GST/GSTReport/GSTUserReport/ViewUserGSTReport').default;

//============================================= PopularGames Module Popup ================================================
PopComponent["AddUpcomingGamesPopup"] = require("../Pages/PopularGames/UpcomingGames/AddUpcomingGamesPopup").default;
PopComponent["CreateCustomizeGameList"] = require("../Pages/PopularGames/PopularGameFirstDesign/CreateCustomizeGameList").default;
PopComponent["DeletePopularGame"] = require("../Pages/PopularGames/PopularGameFirstDesign/DeletePopularGame").default;
PopComponent['CreateCustomizeLiveGameList'] = require('../Pages/PopularGames/LiveGames/CreateCustomizeLiveGameList').default;
PopComponent['DeletePopularGame'] = require('../Pages/PopularGames/PopularGameFirstDesign/DeletePopularGame').default;

//============================================= Settings Module Popup ================================================
PopComponent["AddMaintenancePopup"] = require("../Pages/Settings/Maintenance/AddMaintenancePopup").default;
PopComponent["countryDisplayPopup"] = require("../Pages/Settings/CountryDisplayPopup").default;
//AddRestrictGeo
PopComponent['AddRestrictGeo'] = require('../Pages/Settings/RestrictGeo/AddRestrictGeo').default;
PopComponent['UpdateGlobleConfig'] = require('../Pages/Settings/Config/GlobleConfig/UpdateGlobleConfig').default;

//============================================= TDS Module Popup ================================================
PopComponent["AddTDSConfigPopup"] = require("../Pages/TDS/TDSReport/TDSConfig/AddTDSConfigPopup").default;
PopComponent["ViewUserTDSReport"] = require("../Pages/TDS/TDSReport/TDSUserReport/ViewUserTDSReport").default;
PopComponent['AddTDSPayer'] = require('../Pages/TDS/TDSFile/PayerTab/PayerPerson/AddTDSPayer').default;
PopComponent['AddResponsiblePerson'] = require('../Pages/TDS/TDSFile/PayerTab/ResponsiblePerson/AddResponsiblePerson').default;
PopComponent['AddTDSChallan'] = require('../Pages/TDS/TDSFile/ChallanTab/AddTDSChallan').default;
PopComponent['ExportFileTDS'] = require('../Pages/TDS/TDSFile/ChallanTab/ExportFileTDS').default;
PopComponent['ViewPayeeData'] = require('../Pages/TDS/TDSFile/ChallanTab/ViewPayeeData').default;
PopComponent['UploadCSIFileTDSReturn'] = require('../Pages/TDS/TDSFile/SandboxTDSFilling/EFileTDSReturnTab/UploadCSIFileTDSReturn').default;
PopComponent['AddSandboxTDSForm16A'] = require('../Pages/TDS/TDSFile/SandboxTDSFilling/SandboxTDSForm16A/AddSandboxTDSForm16A').default;
PopComponent['DownloadTDSForm16A'] = require('../Pages/TDS/TDSFile/SandboxTDSFilling/SandboxTDSForm16A/DownloadTDSForm16A').default;
PopComponent['AddSandboxPrepareTDSReturn'] = require('../Pages/TDS/TDSFile/SandboxTDSFilling/PrepareTDSReturnTab/AddSandboxPrepareTDSReturn').default;
PopComponent['UploadExcelSandboxPrepareTDS'] = require('../Pages/TDS/TDSFile/SandboxTDSFilling/PrepareTDSReturnTab/UploadExcelSandboxPrepareTDS').default;
PopComponent['AddEFileTDSReturn'] = require('../Pages/TDS/TDSFile/SandboxTDSFilling/EFileTDSReturnTab/AddEFileTDSReturn').default;
PopComponent['UploadTxtFileTDSReturn'] = require('../Pages/TDS/TDSFile/SandboxTDSFilling/EFileTDSReturnTab/UploadTxtFileTDSReturn').default;
PopComponent['UploadForm16APDF'] = require('../Pages/TDS/TDSFile/SandboxTDSFilling/UserWiseForm16ADistribution/UploadForm16APDF').default;
//Website Module
PopComponent["AddHeaderSliderPop"] = require("../Components/Modal/WebsitePopup/AddHeaderSliderPop").default;
PopComponent["ViewGameDetails"] = require("../Pages/Website/TopGameList/ViewGameDetails").default;
PopComponent["AddGame"] = require("../Pages/Website/TopGameList/AddGame").default;
PopComponent["AddWinnerPopup"] = require("../Components/Modal/WebsitePopup/AddWinnerPopup").default;
PopComponent["ActivatedDeactivatedPop"] = require("../Components/Modal/WebsitePopup/ActivatedDeactivatedPop").default;
PopComponent["AddAboutPopup"] = require("../Components/Modal/WebsitePopup/AddAboutPopup").default;
PopComponent["AddSocialMediaLinkPopup"] = require("../Components/Modal/WebsitePopup/AddSocialMediaLinkPopup").default;
PopComponent["AddWinnerTitlePopup"] = require("../Components/Modal/WebsitePopup/AddWinnerTitlePopup").default;
PopComponent["AddFooterData"] = require("../Components/Modal/WebsitePopup/AddFooterData").default;
PopComponent["PdfFileFailedPopup"] = require("../Pages/TDS/TDSFile/SandboxTDSFilling/UserWiseForm16ADistribution/PdfFileFailedPopup").default;

PopComponent['AddTDSFAQsPopUp'] = require('../Pages/TDS/TDSReport/TDSFAQsTab/AddTDSFAQsPopUp').default;

//============================================= Withdrawal Module Popup ================================================
PopComponent["AddBankAndUpi"] = require("../Pages/Withdrawal/BankAndUPI/AddBankAndUpi").default;
PopComponent["AddWithdrawalUPI"] = require("../Pages/Withdrawal/BankAndUPI/AddWithdrawalUPI").default;
PopComponent["ApprovedWithdrawalRequest"] = require("../Pages/Withdrawal/UserWithdrawalRequests/ApprovedWithdrawalRequest").default;
PopComponent["AddUPITransaction"] = require("../Pages/Withdrawal/UPITransaction/AddUPITransaction").default;
PopComponent["ActivateDeactivateUPITransaction"] = require("../Pages/Withdrawal/UPITransaction/ActivateDeactivateUPITransaction").default;
PopComponent["ActivateDeactivateUserDepositRequest"] = require("../Pages/Withdrawal/UserDepositRequest/ActivateDeactivateUserDepositRequest").default;
PopComponent['ViewWithdrawalType'] = require('../Pages/Withdrawal/UserWithdrawalRequests/ViewWithdrawalType').default;


//============================================= Company Logo Module Popup ================================================
PopComponent["AddCompanyLogo"] = require("../Pages/CompanyLogo/AddCompanyLogo").default;


//============================================= Revenue Module Popup ================================================
PopComponent["AddGSTConfig"] = require("../Pages/Revenue/GSTRevenue/GSTConfigTab/AddGSTConfig").default;
PopComponent['UpdateWalletRules'] = require('../Pages/Master/Document/WalletRules/UpdateWalletRules').default;
PopComponent['UpdateGSTRules'] = require('../Pages/Master/Document/GSTRules/UpdateGSTRules').default;
PopComponent['AddPaymentGateWay'] = require('../Pages/Withdrawal/PaymentGateway/DepositPaymentGateway/AddPaymentGateWay').default;
PopComponent['AddWithdrawalPaymentGateway'] = require('../Pages/Withdrawal/PaymentGateway/WithdrawalPaymentGateway/AddWithdrawalPaymentGateway').default;
PopComponent['AddWithdrawalProcessingFees'] = require('../Pages/Withdrawal/WithdrawalProcessingFees/WithdrawalProcessingFeesTab/AddWithdrawalProcessingFees').default;
PopComponent['UpdateSettingConfig'] = require('../Pages/Settings/Config/UpdateSettingConfig').default;
PopComponent['AddNewGSTConfig'] = require('../Pages/Revenue/GSTRevenue/NewGSTConfigTab/NewGSTTable/AddNewGSTConfig').default;


//============================================= Turnament Module Popup ================================================
// PopComponent["CreateTournament"] = require("../Pages/Tournament/CreateTournament").default;
PopComponent["UpdateTurnament"] = require("../Components/Modal/TurnamentPopup/UpdateTurnament").default;
PopComponent["AddRegistration"] = require("../Pages/Tournament/TournamentTab/TournamentRegistration/AddRegistration").default;
PopComponent["CreateTournamentNotifications"] = require("../Pages/Tournament/TournamentTab/TournamentNotification/CreateTournamentNotifications").default;



export default PopComponent;
