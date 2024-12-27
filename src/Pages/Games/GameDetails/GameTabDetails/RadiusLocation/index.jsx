import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import PopComponent from "../../../../../hoc/PopContent";
import Box from "@mui/material/Box";
import Loader from "../../../../../images/Loader";
import Paper from "@mui/material/Paper";
import CommonModal from "../../../../../hoc/CommonModal";
import Slider from "@material-ui/core/Slider";
import Switch from "@mui/material/Switch";
import FilledButton from "../../../../../Components/FileButton";
import { useParams } from "react-router-dom";
import {
    createGameRadiusLocation, getGameRadiusLocation,
} from "../../../../../Redux/games/action";
import {hideActionFunc} from "../../../../../utils";
import TableLoader from "hoc/CommonTable/TableLoader";


function valueLabelFormat(value) {
    return `${value} Km`;
}

const RadiusLocation = ({ handleOpenModal }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [loader, setLoader] = useState(false)
    const [modalDetails, setModalDetails] = useState({ modalValue: '', modalName: '', modalIsOpen: false });
    let Modal = PopComponent[modalDetails.modalName];
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [formData,setFormData]=useState({
        isGameRadiusLocationOn:false,
        LocationRange:0
    })

    const handleErrorOpenModal = (type, data) => {
        switch (type) {
            case 'CommonPop': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ViewReferAndEarnList': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'AddReferAndEarnList': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'DeleteCommonModal': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            case 'ActivateDeactivateEarnPopup': {
                setModalDetails({ ...modalDetails, modalValue: data, modalName: type, modalIsOpen: true });
                break;
            }
            default: {
                setModalDetails({ ...modalDetails, modalIsOpen: false })
            }
        }
    };

    useEffect(() => {
        getRadiusLocationList();
    }, []);

    const getRadiusLocationList = () => {
        dispatch(getGameRadiusLocation({gameId:id})).then(res => {
            setLoader(false)
            if (res?.data?.success) {
                setFormData({
                    ...formData,
                    isGameRadiusLocationOn: res?.data?.data?.isGameRadiusLocationOn,
                    LocationRange: +res?.data?.data?.LocationRange?.replace('km',''),
                })
            }
        })
    };

    const handleChange = (event, newValue) => {
        if (typeof newValue === 'number') {
                setFormData({
                    ...formData,
                    LocationRange: newValue
                })
        }
    };

    const handleChangeLocation = (event) => {
        setFormData({
            ...formData,
            isGameRadiusLocationOn: event.target.checked
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let payload = {
            ...formData,
            LocationRange: formData?.isGameRadiusLocationOn ? `${formData?.LocationRange}km` : '0km',
            gameId: id,
            isGameRadiusLocationOn: formData.isGameRadiusLocationOn === undefined ? false : formData.isGameRadiusLocationOn
        }
        setLoader(true)
        dispatch(createGameRadiusLocation(payload)).then(res => {
            if (res.data.success) {
                setLoader(false);
                getRadiusLocationList();
                handleOpenModal('CommonPop', {header: "Success", body: res?.data?.message});
            } else {
                setLoader(false)
                handleErrorOpenModal('CommonPop', {header: "Error", body: res?.data?.message || res?.data?.msg});
            }
        });
    }

    return (
        <Box>
            {loader ? <TableLoader /> : ""}
            <Paper sx={{ mb: 2 }} className="outer-box">
                <div className={'referAndEarn_title mb_1'}>
                    <h2>Radius Location</h2>
                </div>
               <form onSubmit={(e)=>handleSubmit(e)}>
                  <div className={'radius_location_form'}>
                      <div className={'radius-location'}>
                          <label>Radius Location On/Off</label>
                          <div>
                              <Switch {...label}  checked={formData?.isGameRadiusLocationOn}  onChange={handleChangeLocation}/>
                          </div>
                      </div>
                      {
                          formData?.isGameRadiusLocationOn &&
                          <div className={'radius-location-range '}>
                              <h2>Radius Location Range</h2>
                              <div className={'slider-location'}>
                                  <Slider
                                      value={formData?.LocationRange}
                                      min={0}
                                      step={1}
                                      max={100}
                                      getAriaValueText={valueLabelFormat}
                                      valueLabelFormat={valueLabelFormat}
                                      onChange={handleChange}
                                      valueLabelDisplay="auto"
                                      aria-labelledby="non-linear-slider"
                                  />
                              </div>
                          </div>
                      }
                  </div>
                   {
                        hideActionFunc('game') &&
                        <div className={'formData_btn mt_1'}>
                            <FilledButton type={'submit'} value={ 'Save'} className={'btn loader_css'} loading={''} />
                        </div>
                   }

               </form>
            </Paper>
            <CommonModal className={'Approved-reject-section'} modalIsOpen={modalDetails.modalIsOpen} handleOpenModal={handleErrorOpenModal}>
                <Modal modalValue={modalDetails.modalValue} handleOpenModal={handleErrorOpenModal} modalIsOpen={modalDetails.modalIsOpen} redirectApiHandler={getRadiusLocationList} />
            </CommonModal>
        </Box>
    )
}
export default RadiusLocation