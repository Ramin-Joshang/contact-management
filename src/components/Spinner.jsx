import React from 'react';
import SpinnerGif from "../assets/Infinity.gif";

const Spinner = () => {
    return (
        <>
            <img src={SpinnerGif}
                alt="spinner"
                className='d-block m-auto'
                style={{ width: 200, height: 200, borderRadius: "50%" }}
            />
        </>
    );
};
export default Spinner;