import React, {useEffect, useRef} from "react";
import ReactPlayer from 'react-player'

function Clip({ url }) {
    const videoRef = useRef();

    useEffect(() => {
        if(videoRef?.current){
            videoRef?.current?.load();
            videoRef?.current.play();
        }

    }, [url]);

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length === 11)? match[7] : false;
    }

    return (
        <>
            {
                youtube_parser(url) ?
                    <ReactPlayer url={url}  width="100%" height="100%" />
                    :
                    <video ref={videoRef} width="100%" height="240" controls muted>
                        <source src={url} />
                    </video>
            }
            </>
    );
}
export default Clip