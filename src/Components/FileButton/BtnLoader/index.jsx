import React from "react";

const BtnLoader = () => {
    return(
        <div>
            <div className='spin_loder'>
                 <span className={`ant-spin-dot ant-spin-dot-spin data_load`}>
                <i className="ant-spin-dot-item"/>
                <i className="ant-spin-dot-item"/>
                <i className="ant-spin-dot-item"/>
                <i className="ant-spin-dot-item"/>
        </span>
            </div>
        </div>
    )
}
export default BtnLoader