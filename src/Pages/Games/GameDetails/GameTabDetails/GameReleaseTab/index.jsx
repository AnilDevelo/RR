import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Loader from "../../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CustomTable from "../../../../../hoc/CommonTable";
import TableCell from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameReleaseList, getOptimizeStatus } from "../../../../../Redux/games/action";
import moment from "moment";
import { getAllCountriesRestrictGeo } from "../../../../../Redux/settings/action";
import { ActionFunction, hideActionFunc } from "../../../../../utils";

const GameReleaseTab = ({ handleOpenModal }) => {
    const country = useSelector(state => state?.settingReducer?.restrictedGeo?.country);
    const { id } = useParams();
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState([])
    const [loader, setLoader] = useState(false);
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);
    const [stepDetailsVerify, setStepDetailsVerify] = useState({})
    const columns = [
        {
            id: 'gameRelaseVersion',
            label: 'Game Release Version',

        },
        {
            id: 'releasePercentage',
            label: 'Release Stage',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.releasePercentage}%</TableCell>
            }
        },
        {
            id: 'realeaseDate',
            label: 'Release Start Date',
            type: 'custom',
            render: (row) => {
                return <TableCell >{moment(row?.realeaseDate).format('MMM DD YYYY')}</TableCell>
            }
        },
        {
            id: '',
            label: 'Country Availability',
            isDisbanding: true,
            type: 'custom',
            render: (row) => {
                return <TableCell>
                    <span className={'edit_btn edit-btn-action'} onClick={() => handleOpenModal('CountryReleasePop', row)}> {row?.isAvailableAllCountry ? country?.length : row?.countryAvailability?.length} </span>
                </TableCell>
            }
        },
        ActionFunction('game', {
            id: 'Action',
            disablePadding: false,
            isDisbanding: true,
            label: 'Action',
            type: 'action',
            ActionContent: (row) => {
                return <TableCell >
                    <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('CreateGameRelease', { redirectApiProps: getGameRelease, isEdit: true, data: row })}>Edit</span>
                </TableCell>
            }
        })
    ];

    useEffect(() => {
        getGameRelease();
    }, []);

    const getGameRelease = () => {
        dispatch(getGameReleaseList({ gameId: id, publisherId: gameDetails?.publisherId?._id })).then(res => {
            if (res.data?.success) {
                setRowData([...res.data.data])
            } else {
                setRowData([]);
            }
        });
    };

    useEffect(() => {
        dispatch(getAllCountriesRestrictGeo({}));
        getOptimizeStatusHandler()
    }, []);

    const addErrorShow = (stepDetailsVerify) => {
        if (!stepDetailsVerify?.gameInfoStatus || !stepDetailsVerify?.isGameBuildCreated || !stepDetailsVerify?.isTwoGameModeCreated) {
            handleOpenModal('CommonPop', { header: " ", body: 'Please complete game info and Game Mode inside optimize section and complete game build section before Game Release.' })
        }
    };

    const getOptimizeStatusHandler = () => {
        dispatch(getOptimizeStatus({ gameId: id, publisherId: gameDetails?.publisherId?._id })).then(res => {
            setStepDetailsVerify(res.data.data);
        })
    }

    return (
        <React.Fragment>
            <Box>
                {/* {
                    loader &&
                    <Loader />
                } */}
                <Paper sx={{ mb: 2 }} className="outer-box">
                    <div className={'head_to_head_gameTab'}>
                        <div className={'d_flex_between'}>
                            <h2>Game Release</h2>
                            {
                              (  hideActionFunc('game') && rowData?.length <= 0)  &&
                                <button className={'btn'} onClick={() => handleOpenModal('CreateGameRelease', { redirectApiProps: getGameRelease, isEdit: false })}>+ Add Game Release</button>
                            }


                            {/*{hideActionFunc('game') &&*/}
                            {/*    (stepDetailsVerify?.gameInfoStatus && stepDetailsVerify?.isTwoGameModeCreated && stepDetailsVerify?.isGameBuildCreated && stepDetailsVerify?.isHeadToHeadCreated) ?*/}
                            {/*    <button className={'btn'} onClick={() => handleOpenModal('CreateGameRelease', { redirectApiProps: getGameRelease, isEdit: false })}>+ Add Game Release</button>*/}
                            {/*    : hideActionFunc('game') &&*/}
                            {/*    <button className={'btn'} onClick={() => addErrorShow(stepDetailsVerify)}>+ Add Game Release</button>*/}
                            {/*}*/}


                        </div>
                    </div>
                    <div className={'head_to_head_gameTab_table'}>
                        <CustomTable
                            headCells={columns}
                            rowData={rowData}
                            totalDocs={0}
                            isCurrency={true}
                            loading={loader}
                        />
                    </div>
                </Paper>
            </Box>
        </React.Fragment>
    )
}
export default GameReleaseTab