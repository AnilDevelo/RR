import React from 'react';
import { CircularProgress } from '@mui/material';
import BtnLoader from './BtnLoader';

const FilledButton = ({ type = "button", className = "btn btn_gray", value = "Clear", loading, disabledLoading, loader_class, ...rest }) => {
    return (
        <button disabled={loading} {...rest} type={type} className={className}>
            {(loading && !disabledLoading) ?
                <div className={loader_class ? `btn-loader ${loader_class}` : "btn-loader btn-loader-small"}>
                    {/* <CircularProgress /> */}
                    <BtnLoader/>
                </div> : value}
        </button>
    );
};

export default FilledButton;