import DropdownMode from "../../../../LobbyTab/CreateLobby/DropdownMode";
import React, {useEffect, useState} from "react";
import CustomTable from "../../../../../../../../hoc/CommonTable";

const ShowLevels = ({formData, setFormData, simpleValidator, gameDetails, handleChange, handleOpenErrorModal, setNumberOfRank, numberOfRank}) => {
    const [ showLevels, setShowLevels ] =useState(false);
    const [wrongPlayer, setWrongPlayer] = useState(false)
    useEffect(() => {
        if (formData?.maxPlayer && formData?.noOfPlayer) {
            let totalPlayer = formData?.maxPlayer;
            let noOfPlayer = formData?.noOfPlayer;
            let ans = totalPlayer;
            let totalLeval = [];
            let level = 0;
            let players = totalPlayer;
            do {
                ans = ans / noOfPlayer;
                level += 1;
                if (!Number.isInteger(ans)) {
                    setShowLevels(false);
                    setWrongPlayer(true)
                    setFormData({ ...formData, levelInfo: [] });
                    return false;
                }
                totalLeval.push({
                    level: level,
                    tables: ans,
                    players: players,
                    promoted: ans,
                });
                players = ans;
            } while (ans > 1);
            setWrongPlayer(false)
            setFormData({
                ...formData,
                levelInfo: totalLeval,
            });
        }
    }, [formData?.maxPlayer, formData?.noOfPlayer]);
    const columns = [
        {
            id: "level",
            label: "LEVEL",
            type: "level",
        },
        {
            id: "tables",
            label: "TABLES",
        },
        {
            id: "players",
            label: "PLAYERS ",
        },
        {
            id: "promoted",
            label: "PROMOTED",
        },
    ];


    useEffect(()=>{
        if(formData?.noOfPlayer){
            setNumberOfRank(Array.from(Array(+formData?.noOfPlayer)).fill(''))
        }
    },[formData?.noOfPlayer]);

    const addFormRankFields = (type, index) => {
        if (type === "add") {
            setNumberOfRank([...numberOfRank, ""]);
        } else {
            let temp = [...numberOfRank];
            temp.splice(index, 1);
            setNumberOfRank(temp);
        }
    }

    const handleChangeRange = (e, index, type) => {
        const { value, name } = e.target;
        let temp = [...numberOfRank];
        temp[index] = {
            ...temp[index],
            [name]: /^0/.test(value) ? value.replace(/^0/, "") : value,
        };
        setNumberOfRank(temp);
    };

    return(
        <>
            <div className={'d_flex w_100  formData '}>
                <div className="w_100 form_amount_tab01 number_of_player">
                    <label>Number Of Players<span className={"validation-star"}>*</span>
                    </label>
                    <div className="emailWrap">
                        <DropdownMode options={gameDetails?.numberOfPlayer} isNumberOfPlayer={true} name={"noOfPlayer"} className={'isNumberOfPlayer'} formData={formData} setFormData={setFormData} />
                    </div>
                    {simpleValidator.current.message("noOfPlayer", formData?.noOfPlayer, "required")}
                </div>
                <div className="form_amount_tab02  tab02_inner_class w_100 ">
                    <label>Total Players<span className={"validation-star"}>*</span></label>
                    <div className="emailWrap">
                        <input type="text" name="maxPlayer" maxLength={10} value={formData?.maxPlayer} placeholder={"Total Players"} className={"w_100"} onChange={(e) => handleChange(e)}/>
                    </div>
                    {simpleValidator.current.message("totalPlayers", formData?.maxPlayer, "required|maxPlayer")}
                    {wrongPlayer && <div className={'srv-validation-message'}>Please Enter right Total Player</div>}
                </div>
                <div className={'w_100 form_amount_tab02 form_amount_tab01 mt_2  tab02_inner_class'}>
                    <div  className={'btn'} onClick={()=> {
                        if(formData?.noOfPlayer && formData?.maxPlayer){
                            if(formData?.levelInfo?.length <= 0){
                                setShowLevels(false)
                                handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please add right Total Player.' })
                            }else {
                                setShowLevels(true)
                            }
                        }else {
                            setShowLevels(false)
                            handleOpenErrorModal('CommonPop', { header: "Error", body: 'Please Add number Of Player and Total Player before show Levels.' })
                        }
                    }}>Show Levels</div>
                </div>
            </div>
            {
                (showLevels && formData?.levelInfo?.length > 0) &&
                <div className="table">
                    <CustomTable
                        headCells={columns}
                        rowData={formData?.levelInfo}
                        totalDocs={formData?.levelInfo?.length}
                        isWinnerTitle={true}
                    />
                </div>
            }

            <div className={'w_100'}>
                {numberOfRank?.map((element, index) => {
                    return (
                        <div className="form_tabledata  formData">
                            <div className="Start mr_margin w_100">
                                <label> Start Rank<span className={"validation-star"}>*</span></label>
                                <input value={element?.rankStart} type={"text"} placeholder={"Enter Start Rank"} name={"rankStart"} onChange={(e) => handleChangeRange(e, index)}/>
                                {simpleValidator.current.message("rankStart", element?.rankStart, "required")}
                            </div>
                            <div className="Start mr_margin  w_100">
                                <label> End Rank<span className={"validation-star"}>*</span></label>
                                <input value={element?.rankEnd} type={"text"} placeholder={"Enter End Rank"} name={"rankEnd"} onChange={(e) => handleChangeRange(e, index, "rankEnd")}/>
                                {simpleValidator.current.message("rankEnd", element?.rankEnd, "required")}
                            </div>
                            <div className="Start w_100">
                                <label>Point<span className={"validation-star"}>*</span></label>
                                <input value={element.point} type={"text"} placeholder={"Enter Point"} name={"point"} onChange={(e) => handleChangeRange(e, index)}/>
                                {simpleValidator.current.message("price", element?.point, "required")}
                            </div>
                            {/*{numberOfRank?.length - 1 === index ? (*/}
                            {/*    <>*/}
                            {/*        {numberOfRank?.length !== 1 && (<span className="cursor_pointer  remove_field" onClick={() => addFormRankFields("remove", index)}>-</span>)}*/}
                            {/*        { (<span className="cursor_pointer  add_field" onClick={() => addFormRankFields("add")}>+</span>)}*/}
                            {/*    </>*/}
                            {/*) : (*/}
                            {/*    numberOfRank?.length !== 1 && (<span className="cursor_pointer remove_field" onClick={() => addFormRankFields("remove", index)}>-</span>)*/}
                            {/*)}*/}
                        </div>
                    );
                })}
            </div>
        </>
    )
}
export default ShowLevels