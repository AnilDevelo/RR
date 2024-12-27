import React from "react";

const Loader = (props) => {
    return (
        <span className={`ant-spin-dot ant-spin-dot-spin ${props.className}`}>
                <i className="ant-spin-dot-item"/>
                <i className="ant-spin-dot-item"/>
                <i className="ant-spin-dot-item"/>
                <i className="ant-spin-dot-item"/>
        </span>);
}

export default Loader;