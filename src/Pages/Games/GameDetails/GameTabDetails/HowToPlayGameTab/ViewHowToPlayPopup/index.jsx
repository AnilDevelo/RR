import React from "react";
import {Box} from "@mui/material";
import Slider from "react-slick";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Clip from "../../../../../HelpAndSupport/TicketsVideoTab/AddTicketsVideo/VideoPlayer";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
};
const PreviousBtn = (props) => {
    const { className, onClick } = props;
    return (
        <>

            <div className={className} onClick={onClick}>
                <ArrowBackIcon style={{ color: 'black', fontSize: '28px' }} />
            </div>

        </>
    );
};

const NextBtn = (props) => {
    const { className, onClick } = props;

    return (
        <>

            <div className={className} onClick={onClick}>
                <ArrowForwardIcon style={{ color: 'black', fontSize: '28px' }} />
            </div>

        </>
    );
};

const ViewHowToPlayPopup = ({modalValue,handleOpenModal}) => {
    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
        responsive: [
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1,

                },
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,

                },
            },
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 3,
                    dots: true
                },
            },
        ],
    };

    
    return(
        <Box sx={style} className={'how-to-play-section'}>
            <p className={'custom_close_btn'} onClick={()=>handleOpenModal()}>
                <svg viewBox="0 0 24 24" x="1008" y="432" fit="" height="28" width="25"
                     preserveAspectRatio="xMidYMid meet" focusable="false">
                    <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                        fill="#64748b" />
                </svg>
            </p>
            <div className={'game_details_view add_admin_user_popup modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>View {(modalValue?.type === "ImageSlider" || modalValue?.type === "Image" || modalValue?.type === "Logo" || modalValue?.isImage) ? "Image Slider" : 'Video'} </h2>
                </div>
            </div>
            {
               ( modalValue?.type === "ImageSlider" || modalValue?.type === "Image" || modalValue?.isImage || modalValue?.type === "Logo") &&
                <div className={'game_details_slider'}>
                    <section className='ag_gameSection'>
                        <div className='ag_inner_container'>
                            <div className='ag_main'>
                                <div className='ag_GameData'>
                                    <div className='ag_gameSlick'>
                                        <Slider {...settings}>
                                            {(modalValue?.howToPlay?.value || modalValue?.splashScreen?.value || modalValue?.ticketVideoImage || modalValue?.companyLogoImage)?.map((item, i) => {
                                                return (
                                                    <div className="sd_logo_sec_game " key={i}>
                                                        <img src={item} alt="home" />
                                                    </div>
                                                )
                                            })}
                                        </Slider>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            }
            {   modalValue?.type ===  'VideoLink' &&
                <div className={'video-preview mt_15'}>
                    <Clip url={ typeof modalValue?.howToPlay?.value === 'string' ?  modalValue?.howToPlay?.value : modalValue?.splashScreen?.value ? modalValue?.splashScreen?.value  : URL.createObjectURL(modalValue?.howToPlay?.value)}/>
                </div>
            }
        </Box>
    )
}
export default ViewHowToPlayPopup