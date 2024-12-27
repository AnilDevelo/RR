import React from "react";
import { Box } from "@mui/material";
import Slider from "react-slick";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 950,
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

const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    autoplay: false,
    slidesToShow: 3,
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

const ViewGameDetails = ({ modalValue }) => {

    return (
        <Box sx={style}>
            <div className={'game_details_view add_admin_user_popup  modal_main_popup'}>
                <div className={'modal_popup_title'}>
                    <h2>Game Details</h2>
                </div>
            </div>
            <div className={'game_details_slider'}>
                <section className='ag_gameSection'>
                    <div className='ag_inner_container'>
                        <div className='ag_main'>
                            <div className='ag_GameData'>

                                <div className='ag_gameSlick'>
                                    <Slider {...settings}>
                                        {modalValue?.screenShots?.map((item, i) => {
                                            return (
                                                <div className="sd_logo_sec_game " key={i}>
                                                    <img src={item} alt="home" />
                                                </div>
                                            )
                                        })}
                                    </Slider>
                                </div>
                            </div>
                            <div className='ag_gameDescription '>
                                <div className=' ag_flex ag_flexwrap'>
                                    <div className='ag_content'>
                                        <div className='ag_desc'>
                                            <p dangerouslySetInnerHTML={{ __html: modalValue?.description }} />
                                        </div>
                                        <div className='ag_feature'>
                                            <div className='ag_header '>
                                                <h3>Bunch of Exciting Fetures:</h3>
                                            </div>
                                            <div className='ag_featureList'>
                                                <ul>
                                                    {
                                                        modalValue?.features?.map((item) => {
                                                            return    <li><div>{item}</div></li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Box>
    )
}
export default ViewGameDetails;

