import React from "react";
import {ActionFunction, dotGenerator, hideActionFunc} from "../../../../../../utils";
import CustomTable from "../../../../../../hoc/CommonTable";
import Paper from "@material-ui/core/Paper";
import {useSelector} from "react-redux";
import TableCell from "@material-ui/core/TableCell";
import {deleteGameBuildsList} from "../../../../../../Redux/games/action";
import {useParams} from "react-router-dom";

const ModeWiseGameBuild = ({ rowData, pagination, setPagination, loader, handleOpenModal }) => {
    const { id } = useParams(); // Extracts the 'id' parameter from the URL
    const gameDetails = useSelector(state => state?.gameReducer?.gameDetails);


    const handleCopyURL = (url) => {
        navigator.clipboard.writeText(url).then(res => {
            handleOpenModal('CommonPop', { header: "Success", body: 'Code URL is Copy Successfully ' })
        });
    };

    const columns = [
        {
            id: 'releaseVersion',
            label: 'MPG Version ',
            type: 'custom',
            render: (row) => {
                return <TableCell >{row?.mgpReleaseId?.releaseNumber} </TableCell>
            }
        },
        {
            id: 'releaseVersion',
            label: 'Release Version ',
            type: 'custom',
            render: (row) => {
                return <TableCell >{ dotGenerator(row?.releaseVersion, handleOpenModal, 'Reported Description') || '-'}</TableCell>
            }
        },
        // {
        //     id: 'buildScript',
        //     label: 'Script(code)',
        //     twoLineText: true,
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell ><a href={row?.buildScript} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> </TableCell>
        //     }
        // },
        // {
        //     id: 'buildPlugging',
        //     label: 'Plugging',
        //     twoLineText: true,
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell ><a href={row?.buildPlugging} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> </TableCell>
        //     }
        // },
        {
            id: 'buildScene',
            label: 'Scene .unity ',
            type: 'custom',
            render: (row) => {
                return <TableCell ><a href={row?.buildScene} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> </TableCell>
            }
        },
        {
            id: 'buildAndroidAssets',
            label: 'Asset Build  Android ',
            type: 'custom',
            render: (row) => {
                return <TableCell > {(gameDetails?.platform === "Android" || gameDetails?.platform === 'Cross-Platform') && row?.buildAndroidAssets ? <a href={row?.buildAndroidAssets} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> : '-'}  </TableCell>
            }
        },
        {
            id: 'buildIosAssets',
            label: 'Asset Build  IOS ',
            type: 'custom',
            render: (row) => {
                return <TableCell >  {(gameDetails?.platform === "Ios" || gameDetails?.platform === 'Cross-Platform') && row?.buildIosAssets ? <a href={row?.buildIosAssets} className={'edit_btn edit-btn-action'} target={'_blank'} >Download</a> : '-'} </TableCell>
            }
        },
        // {
        //     id: 'codeUrl',
        //     label: 'Code URL',
        //     twoLineText: true,
        //     type: 'custom',
        //     render: (row) => {
        //         return <TableCell >{row?.codeUrl ? <span className='edit_btn edit-btn-action' onClick={() => handleCopyURL(row?.codeUrl)}>Copy</span> : '-'}   </TableCell>
        //     }
        // },
        // {
        //     id: 'releaseGuideLink',
        //     label: 'Release Guide </br>  Link ',
        //     type: 'custom',
        //     twoLineText: true,
        //     render: (row) => {
        //         return <TableCell > {row?.releaseGuideLink ? <span className='edit_btn edit-btn-action' onClick={() => handleOpenModal('ViewReleaseGuide', row)}>View</span> : '-'}  </TableCell>
        //     }
        // },
        {
            id: 'releaseNotes',
            label: 'Release Note',
            twoLineText: true,
            type: 'custom',
            render: (row) => {
                let text = new DOMParser().parseFromString(row?.releaseNotes, "text/html").documentElement.textContent
                return <TableCell >{dotGenerator(text, handleOpenModal, 'Release Notes')}</TableCell>
            }
        },
        ActionFunction('game', {
            id: 'action',
            label: 'Action',
            type: 'custom',
            twoLineText: true,
            render: (row) => {
                const latestBuild = rowData?.list?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))[0];
                // Only show the edit button for the latest uploaded build
                const showEditButton = latestBuild?._id === row?._id;
                return <TableCell className={'role_field_id'}>
                    {showEditButton && (
                        <span className='edit_btn edit-btn-action u_border' onClick={() => handleOpenModal('UpdateGameBuild', row)}>Edit</span>
                    )}
                    <span className='edit_btn edit-btn-action  prTab'
                          onClick={() => handleOpenModal('DeleteCommonModal',
                              { deleteListApiHandler: deleteGameBuildsList({ gameId: id, gameBuildId: row?._id }), title: 'Do you want to delete this data?' })}
                    >Delete</span>
                </TableCell>
            }
        })
    ];


    return (
        <React.Fragment>
            <CustomTable
                headCells={columns}
                rowData={rowData?.list}
                totalDocs={rowData?.totalDocs}
                pagination={pagination}
                setPagination={setPagination}
                loading={loader}
            />
        </React.Fragment>
    )
}
export default ModeWiseGameBuild