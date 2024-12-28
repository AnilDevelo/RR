import React from "react";

const Dashboard = React.lazy(() => import("Pages/Dashboard"));
//auth
const Login = React.lazy(() => import("Pages/Authentication/Login"));
const ResetPassword = React.lazy(() => import("../Pages/Authentication/ResetPassword"));
const ChangePassword = React.lazy(() => import("Pages/Authentication/ChangePassword"));

//Admin Users
const SubAdminUser = React.lazy(() => import("Pages/SubAdminUser"));
const AdminUser = React.lazy(() => import("Pages/AdminUser"));
const UserData = React.lazy(() => import("../Pages/Users/AllUserList"))
const InactiveUsersList = React.lazy(() => import("../Pages/Users/InactiveUsersList"))
const UsersTab = React.lazy(() => import("../Pages/Users/UserTab"));
const BlockUserList = React.lazy(() => import("../Pages/Users/BlockUserList"));
const ReportedUser = React.lazy(() => import("Pages/Users/ReportedUser"));
const UserKYC = React.lazy(() => import("../Pages/Users/UserKYC"));
const UpdateUserMobileNumber = React.lazy(() => import("../Pages/Users/UpdateUserMobileNumber"));
const ClientUser = React.lazy(() => import("../Pages/Users/ClientUser"));
const TraderUser = React.lazy(() => import("../Pages/Users/TraderUser"));

//Games
const AddNewGame = React.lazy(() => import("../Pages/Games/AddNewGame"))
const AllGameList = React.lazy(() => import("../Pages/Games/AllGameList"))
const ApprovedGameList = React.lazy(() => import("../Pages/Games/ApprovedGameList"))
const PendingGameList = React.lazy(() => import("../Pages/Games/PendingGameList"))
const RejectedGameList = React.lazy(() => import("../Pages/Games/RejectedGameList"))
const ArchiveGames = React.lazy(() => import("../Pages/Games/ArchiveGames"));
const GameDetails = React.lazy(() => import("../Pages/Games/GameDetails"));
const GameHistory = React.lazy(() => import("../Pages/Games/GameHistory"));

//Master
const SplashScreen = React.lazy(() => import("../Pages/Master/SplashScreen"));
const BotModule = React.lazy(() => import("../Pages/Master/BotModule"));
const Avatar = React.lazy(() => import("../Pages/Master/Avatar"));
const Document = React.lazy(() => import("../Pages/Master/Document"));
const LobbyLabel = React.lazy(() => import("../Pages/Master/LobbyLabel"));
const GenreCategory = React.lazy(() => import("../Pages/Master/GenreCategory"));
const MGPOnlinePlayer = React.lazy(() => import("../Pages/Master/MGPOnlinePlayer"));
// const InternalAdsList = React.lazy(() => import("../Pages/Master/InternalAdsList"));
const InternalAdsList = React.lazy(() => import("../Pages/Marketing/InternalAdsList"));
const GameModeDesignConfig = React.lazy(() => import("../Pages/Master/GameModeDesignConfig"));
const ReportReason = React.lazy(() => import("../Pages/Master/ReportReason"));

//Design
const LoginScreen = React.lazy(() => import("../Pages/Design/LoginScreen"));
const HomeScreen = React.lazy(() => import("../Pages/Design/HomeScreen"));
const ReferAndEarnDesign = React.lazy(() => import("../Pages/Design/ReferAndEarn"));
const PaymentSettings = React.lazy(() => import("../Pages/Design/PaymentSettings"));
const KYCScreen = React.lazy(() => import("../Pages/Design/KYCScreen"));
const WalletScreen = React.lazy(() => import("../Pages/Design/WalletScreen"));

const Config = React.lazy(() => import("../Pages/Settings/Config"));
const FlagConfig = React.lazy(() => import("../Pages/Settings/FlagConfig"));
const RestrictGeo = React.lazy(() => import("../Pages/Settings/RestrictGeo"));

//Withdrawal
const BankAndUPI = React.lazy(() => import("../Pages/Withdrawal/BankAndUPI"));
const UserWithdrawalRequests = React.lazy(() => import("../Pages/Withdrawal/UserWithdrawalRequests"));

//Revenue
const GameWiseRevenue = React.lazy(() => import("../Pages/Revenue/GameWiseRevenue"));
const OverallRevenue = React.lazy(() => import("../Pages/Revenue/OverallRevenue"));
const TimeOutReportRevenue = React.lazy(() => import("../Pages/Revenue/TimeOutReportRevenue"));
const GSTRevenue = React.lazy(() => import("../Pages/Revenue/GSTRevenue"));
const PlatformReport = React.lazy(() => import("../Pages/Revenue/PlatformReport"));

//Bonus
const DailyWheelBonus = React.lazy(() => import("../Pages/Bonus/DailyWheelBonus"));
const ReferAndEarn = React.lazy(() => import("../Pages/Bonus/ReferAndEarn"));
const CouponCode = React.lazy(() => import("../Pages/Bonus/CouponCode"));

const AnalyticsReport = React.lazy(() => import("../Pages/Analytics/AnalyticsReport"));
const AnalyticsOverviewReport = React.lazy(() => import("../Pages/Analytics/AnalyticsOverviewReport"));
const AnalyticsApplicationInstallReport = React.lazy(() => import("../Pages/Analytics/AnalyticsApplicationInstallReport"));
const DailyReport = React.lazy(() => import("../Pages/Analytics/DailyReport"));

// const Offer = React.lazy(() => import("../Pages/Master/NotificationModule/Offer"));
const Offer = React.lazy(() => import("../Pages/Marketing/Offer"));
const Leaderboard = React.lazy(() => import("../Pages/Bonus/Leaderboard"));
const Maintenance = React.lazy(() => import("../Pages/Settings/Maintenance"));

const HelpAndSupport = React.lazy(() => import("../Pages/HelpAndSupport"));
const TDSModule = React.lazy(() => import("../Pages/TDS/TDSReport"));
const TDSFile = React.lazy(() => import("../Pages/TDS/TDSFile"));
const PopularGames = React.lazy(() => import("../Pages/PopularGames"));
const MGPRelease = React.lazy(() => import("../Pages/MGPRelease"));

// const Analytics = React.lazy(() => import("../Pages/Analytics"));

const Website = React.lazy(() => import("../Pages/Website"));
const StorePack = React.lazy(() => import("../Pages/StorePack"));
const SDKManagement = React.lazy(() => import("../Pages/SDKManagement"));

const Levels = React.lazy(() => import("../Pages/Master/Levels"));
const GameWiseUserTDSReport = React.lazy(() => import("../Pages/TDS/TDSReport/AllGameTDSReportTab/GameWiseUserTDSReport"));
const ParticularUserWiseTDSReport = React.lazy(() => import("../Pages/TDS/TDSReport/AllGameTDSReportTab/ParticularUserWiseTDSReport"));
// const NotificationModule = React.lazy(() => import("../Pages/Master/NotificationModule"));
const NotificationModule = React.lazy(() => import("../Pages/Marketing/NotificationModule"));
const WithdrawalProcessingFees = React.lazy(() => import("../Pages/Withdrawal/WithdrawalProcessingFees"));

const CompanyLogo = React.lazy(() => import("../Pages/CompanyLogo"));

const PaymentGateway = React.lazy(() => import("../Pages/Withdrawal/PaymentGateway"));

//withdrawal
const UPITransaction = React.lazy(() => import("../Pages/Withdrawal/UPITransaction"));
const UserDepositRequest = React.lazy(() => import("../Pages/Withdrawal/UserDepositRequest"));
const WithdrawManually = React.lazy(() => import("../Pages/Withdrawal/WithdrawManually"));

//GST
const GSTFile = React.lazy(()=>import("../Pages/GST/GSTFiling"))
const GSTReport = React.lazy(() => import("../Pages/GST/GSTReport"))



//history
const History  = React.lazy(() => import("../Pages/History"));


//tournament
const Tournament = React.lazy(() => import("../Pages/Tournament/AddNewTurnament"));
const AllTournamentList = React.lazy(() => import("../Pages/Tournament/AllTurnamentList"));
const TournamentDocuments = React.lazy(() => import("../Pages/Tournament/TournamentDocuments"));
const TournamentTab = React.lazy(() => import("../Pages/Tournament/TournamentTab"));


// Deposit
const Deposit = React.lazy(()=>import("../Pages/Deposit/DepositRequests"))
const DepositTransactionsHistory = React.lazy(()=>import('../Pages/Deposit/DepositTransactionsHistory'))

export const PublicroutesArray = [
    { path: "/", exact: true, component: Login },
    { path: "/reset/:id/:id", component: ResetPassword, title:"Reset Password" },
];

export const PrivateroutesArray = [
    { path: "/dashboard", component: Dashboard, title: "Dashboard" },
    { path: "/change-password", component: ChangePassword, title: "Change Password" },
    { path: "/admin-users", component: AdminUser, title: "Users" },
    { path: "/user_list", component: ClientUser, title: "Client Users" },
    { path: "/trader_user", component: TraderUser, title: "Trader Users" },
    //User
    { path: "Users", component: UserData, title: "Users" },
    //InactiveUsersList
    { path: "/inactive-users", component: InactiveUsersList, title: "Inactive Users" },
    { path: "users-tab/:id", component: UsersTab, title: "Users Details" },
    { path: "/user-reported", component: ReportedUser, title: "Reported Users" },
    { path: "/user-kyc", component: UserKYC, title: "Users KYC" },
    { path: "/block-user", component: BlockUserList, title: "Blocked Users" },
    { path: "/user/update-mobile-number", component: UpdateUserMobileNumber, title: "Users Mobile Number Request" },
    //Game
    { path: "/games/all-games", component: AllGameList, title: "Games" },
    { path: "/games/approved-games", component: ApprovedGameList, title: "Approved Games" },
    { path: "/games/pending-games", component: PendingGameList, title: "Pending Games" },
    { path: "/games/rejected-games", component: RejectedGameList, title: "Rejected Games" },
    { path: "/games/archive-games", component: ArchiveGames, title: "Archive Games" },
    { path: "/games/add-game", component: AddNewGame, title: "Add New Game" },
    { path: "/game-tab/:id", component: GameDetails, title: "Game Details" },
    {path: '/game/game-history', component: GameHistory, title: "Game History"},
    //Master
    { path: "/avatars", component: Avatar, title: "Avatar" },
    { path: "/games/category", component: GenreCategory, title: "Game Category" },
    { path: "/online-players", component: MGPOnlinePlayer, title: "MGP Online Players" },
    { path: "/documentation", component: Document, title: "Documentation" },
    { path: "/ads-list", component: InternalAdsList, title: "Promotion Ads List" },
    { path: "/lobby-label", component: LobbyLabel, title: "Lobby Type" },
    { path: "/splash-screen", component: SplashScreen, title: "Splash Screen" },
    { path: "/bot", component: BotModule, title: "Bot" },
    { path: "/gameModeDesign", component: GameModeDesignConfig, title: "Game Mode Design" },

    //Design

    {path: "/LoginScreen", component: LoginScreen, title: "Login Screen" },
    {path: "/HomeScreen", component: HomeScreen, title: "Home Screen" },
    {path: "/referAndEarn", component: ReferAndEarnDesign, title: "Refer And Earn" },
    {path: "/PaymentSettings", component: PaymentSettings, title: "Payment Settings" },
    {path: "/KYCScreen", component: KYCScreen, title: "KYC Screen" },
    {path: "/WalletScreen", component: WalletScreen, title: "Wallet Screen" },
    //withdrawal
    { path: "/bank-and-upi", component: BankAndUPI, title: "Withdrawal Bank And UPI" },
    { path: "/user-withdrawal-requests", component: UserWithdrawalRequests, title: "Users Withdrawal Requests" },
    //setting
    { path: "/setting/config", component: Config, title: "Global Config"},
    { path: "/setting/restrict-geo", component: RestrictGeo, title: "Restrict Geo" },
    { path: "/setting/flag-config", component: FlagConfig, title: "Flag Config" },
    // { path: "/website", component: Website, title: "Website" },
    //revenue
    { path: "/notification", component: NotificationModule, title: "Notification" },
    { path: "/revenue/game-wise-revenue", component: GameWiseRevenue, title: "Game Revenue" },
    { path: "/revenue/overall-revenue", component: OverallRevenue, title: "Overall Revenue" },
    { path: "/revenue/time-out-report", component: TimeOutReportRevenue, title: "Time Out Report" },
    { path: "GST", component: GSTRevenue, title: "GST" },

    //bonus
    { path: "/leaderboard", component: Leaderboard, title: "Leaderboard" },
    { path: "/daily-wheel-bonus", component: DailyWheelBonus, title: "Daily Wheel Bonus" },
    { path: "/refer-and-earn", component: ReferAndEarn, title: "Refer & Earn" },
    { path: "/coupon-code", component: CouponCode, title: "Coupon Code" },
    { path: "/offer", component: Offer, title: "Offer" },

    { path: "/popular-games", component: PopularGames, title: "Popular Games" },
    { path: "/release", component: MGPRelease, title: "MGP Release" },
    { path: "/help-and-support", component: HelpAndSupport, title: "Help & Support" },

    // { path: "/analytics", component: Analytics, title: "Analytics" },
    {path: '/sub-adminUser', component: SubAdminUser, title: "Sub Admin User"},
    { path: "/levels", component: Levels, title:"Levels" },
    { path: "/website", component: Website, title:"Website" },
    { path: "/store-pack", component: StorePack, title:"StorePack" },
    { path: "/sdk-management", component: SDKManagement, title:"SDK Management" },


    { path: "/TDS-report", component: TDSModule, title: "TDS Report" },
    { path: "/tds-filing", component: TDSFile, title: "TDS Filing" },
    { path: "/game-user-tds-report/:id", component: GameWiseUserTDSReport, title: "TDS Report" },
    { path: "/tds-user-report/:id", component: ParticularUserWiseTDSReport, title: "TDS Report" },

    {path: '/withdrawalProcessingFee', component: WithdrawalProcessingFees, title: "Withdrawal Processing Fee"},
    { path: "/setting/maintenance", component: Maintenance, title: "Maintenance" },
     
    //AnalyticsApplicationInstallReport
    { path: "/analytics-report", component: AnalyticsReport, title: "Analytics Report" },
    { path: "/analytics-overview-report", component: AnalyticsOverviewReport, title: "Analytics Overview Report" },
    { path: "/analytics-application-install", component: AnalyticsApplicationInstallReport, title: "Application Install & Uninstall" },
    { path: "/daily-report", component: DailyReport, title: "Daily Report" },
    

     //CompanyLogo
     {path: '/company-logo', component: CompanyLogo, title: "Company Logo"},

     //settings
     { path: "payment-gateway", component: PaymentGateway, title: "Payment Gateway" },

     //withdrawal
    {path: '/user-deposit-request', component: UserDepositRequest, title: "User Deposit Manually"},
    {path: '/upi-qr-code', component: UPITransaction, title: "Add UPI QR Code"},
    {path: '/withdrawal-manually', component: WithdrawManually, title: "Withdraw Manually"},
    {path: '/platform-report', component: PlatformReport, title: "Platform Report"},


    // Deposit 
    {path: '/user-deposit-requests', component: Deposit, title: "Deposit"},
    {path: '/deposit-transactions-history', component: DepositTransactionsHistory, title: "Deposit Transactions History"},

    // GST
    { path: "/gst-filing", component: GSTFile, title: "GST Filing" },
    { path: "/gst-report", component: GSTReport, title: "GST Report" },


    //ReportReason
    { path: '/report-reason', component: ReportReason, title: "Report Reason" },
    
    //History 
    { path: '/history', component: History, title: "History" },
    
    //tournament
    { path: '/add-tournament', component: Tournament, title: "Create Tournament" },
    { path: '/all-tournament', component: AllTournamentList, title: "All Tournament" },
    { path: '/tournament-documents', component: TournamentDocuments, title: "Tournament Documents" },
    { path: "tournament-tab/:id", component: TournamentTab, title: "Tournament Details" },
];

//GameCategory