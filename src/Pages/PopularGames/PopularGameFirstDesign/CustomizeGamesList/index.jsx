import React from "react";
import {ActionFunction, hideActionFunc} from "../../../../utils";
import CustomTable from "../../../../hoc/CommonTable";
import TableCell from "@material-ui/core/TableCell";
import user from "../../../../assets/images/avatar.png";

const CustomizeGamesList = ({ formData, setFormData, handleOpenModal, getPopularGamesList }) => {

    let columns = [
        {
            id: "gameIcon",
            label: "Game Logo",
            isDisbanding: true,
            type: "custom",
            render: (row, i) => {
                return (
                    <TableCell className={"game_icon_img popular_game_icon"}>
                        <img src={row?.gameIcon || user} alt={""} />
                    </TableCell>
                );
            },
        },
        {
            id: "gameIcon",
            label: "Game Poster",
            isDisbanding: true,
            type: "custom",
            render: (row, i) => {
                return (
                    <TableCell className={"game_icon_img popular_game_icon"}>
                        <img src={row?.gamePoster || user} alt={""} />
                    </TableCell>
                );
            },
        },
        {
            id: "gameName",
            label: "Game Name",
        },
        {
            id: "totalPlayedCounter",
            label: "Total Played Counter",
        },
    ];
    if (formData?.popularGame?.length > 0 || !formData?.isDefaultGameList) {
        columns = [
            ...columns,
            ActionFunction("popularGame", {
                id: "action",
                label: "Action",
                isDisbanding: true,
                type: "custom",
                render: (row, i) => {
                    return (
                        <TableCell className={"game_icon_img"}>
                          <span className="edit_btn edit-btn-action" onClick={() => {handleOpenModal("DeletePopularGame", {gameId: row?.gameId, List: formData?.popularGame,});}}>Delete</span>
                        </TableCell>
                    );
                },
            }),
        ];
    }

    return(
        <>
            {hideActionFunc("popularGame") && (
                <div className={"d_flex_end"}>
                    <button className={"btn"} onClick={() => handleOpenModal("CreateCustomizeGameList", formData)}>Customize Games List</button>
                </div>
            )}
            <CustomTable
                headCells={columns}
                rowData={formData?.popularGame}
                isPopularGame={true}
            />
        </>
    )
}
export default CustomizeGamesList