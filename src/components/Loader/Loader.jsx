import React from 'react';

//Particular Css
import './Loader.css';

const Loader = () => {
    return (
        <>
            <div className="loader-screen">
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>   
        </>
    )
}

export default Loader
