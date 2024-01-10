import Webcam from "react-webcam";
import { useRef, useState } from "react";
import axios from 'axios';
import "./Camera.scss";

const Camera = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [mirrored, setMirrored] = useState(false);
  
    // image capture function
    async function capture () {
        const imageSrc = webcamRef.current.getScreenshot();
    
        try {
          await axios.post('http://localhost:4000/image-captured', { image: imageSrc });
          console.log('Image sent to server.');
          setImgSrc(imageSrc);
        } catch (error) {
          console.error('Error sending image to server:', error);
        }
      };

    // image retake function
    const retake = () => {
        setImgSrc(null);
      };
  
    return (
        <div className="camera__container">
            <h1 className="camera__title">Prescription, meet scanner from the future</h1>
            <div className="camera__border"></div>
        {imgSrc ? (
          <img src={imgSrc} alt="webcam" />
        ) : (
          <Webcam 
            height={300}
            width={300}
            ref={webcamRef}
            mirrored={mirrored}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            />
        )}
        <div className="camera__mirror">
            <p className="camera__caption">Mirror</p>
            <div className="camera__controls">
                <div className="camera__block">
                    <input
                        data-index="0"
                        type="checkbox"
                        id="scan"
                        checked={mirrored}
                        onChange={(e) => setMirrored(e.target.checked)}
                    />
                    <label for="scan"></label>
                </div>
            </div>
        </div>
        <div className="camera__btn-container">
          {imgSrc ? (
            <button className="camera__btn" onClick={retake}>Retake photo</button>
          ) : (
            <button className="camera__btn" onClick={capture}>Capture photo</button>
          )}
        </div>
        <div className="camera__border"></div>
        </div>
    );
};

export default Camera;

