import React from 'react';

import "./About.scss";

import AboutCheck from "../../assets/images/rxscan_6.png";
import AboutScan from "../../assets/images/rxscan_7.png";
import AboutRemind from "../../assets/images/rxscan_8.png";
import AboutNIH from "../../assets/images/rxscan_9.png";
import AboutPres from "../../assets/images/rxscan_11.png";
import AboutIcon from "../../assets/images/icons/rxscan_12.png";


const About = () => {
    return (
        <div className='about'>
            <div className="about__border"></div>
            <div className='about__cont'>
            <h1 className='about__title'>About Us</h1>
            <img
                className="about__small-icon"
                src={AboutIcon}
                alt="about-Small-icon"
                />
            </div>
            <h2 className='about__subtitle2'>Scary Piece of Paper</h2>
            <div className='about__cont1'>
                <img
                className="about__icon"
                src={AboutPres}
                alt="about-Pres-icon"
                />
                <p className='about__text1'>Get your handwritten prescription ready to scan.</p>
            </div>
            <h2 className='about__subtitle1'>Scan it!</h2>
            <div className='about__cont2'>
                <img
                className="about__icon"
                src={AboutScan}
                alt="about-Scan-icon"
                />
                <p className='about__text2'>Scan your prescription with RxScan App for Optical Character Recognition (OCR)</p>
            </div>
            <h2 className='about__subtitle2'>Cross-check it!</h2>
            <div className='about__cont1'>
                <img
                className="about__icon"
                src={AboutCheck}
                alt="about-Check-icon"
                />
                <p className='about__text1'>Verified and ready for insights.</p>
            </div>
            <h2 className='about__subtitle1'>NIH database</h2>
            <div className='about__cont2'>
                <img
                className="about__icon"
                src={AboutNIH}
                alt="about-NIH-icon"
                />
                <p className='about__text2'>NIH’s National Library of Medicine utilised for verification.</p>
            </div>
            <h2 className='about__subtitle2'>Remind yourself!</h2>
            <div className='about__cont1'>
                <img
                className="about__icon"
                src={AboutRemind}
                alt="about-Remind-icon"
                />
                <p className='about__text1'>Add reminders for medication at the same time. All in one solution, transcribe, verify and set reminders.</p>
            </div>
        </div>
    );
};

export default About;