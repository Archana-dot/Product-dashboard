import React from 'react';
import Image from '../../assets/images/login_bg.jpg';
import logo from '../../assets/images/logo.jpg';
import '../../assets/css/hoc.css';

function HOC(Comp) {
    function BackgroundImage(props) {
        return (
            <>
                <div className="right-section">
                    <img src={Image} alt="login_bg" />
                </div>
                <Comp {...props} image={logo} />
            </>
        );
    }
    return BackgroundImage;
}
export default HOC;