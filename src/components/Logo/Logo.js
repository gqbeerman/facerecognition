import React from 'react';
import Tilt from 'react-tilt';
import logoTC from './logoTC.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25, axis: null, easing: "cubic-bezier(.03, .98, .52, .99)" }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner zindex pa3">
                    <img style={{paddingTop: '10px'}}alt='logo' src={logoTC}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;