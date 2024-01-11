import Webcam from "react-webcam";
import { useRef, useState } from "react";
import axios from 'axios';
import "./Camera.scss";

const Camera = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [mirrored, setMirrored] = useState(false);
    const [detectedLabels, setDetectedLabels] = useState([]);
  
    // image capture function
    async function capture () {
        const imageSrc = webcamRef.current.getScreenshot();
    
        try {
            const response = await axios.post('http://localhost:4000/image-captured', { image: imageSrc });
          console.log('Image sent to server.');
          setImgSrc(imageSrc);

          // Assuming the server sends back an array of detected labels
          setDetectedLabels(response.data);

        } catch (error) {
          console.error('Error sending image to server:', error);
        }
      };

    // image retake function
    const retake = () => {
        setImgSrc(null);
        setDetectedLabels([]);
      };

  
    return (
        <div className="camera__container">
            <div className="camera__title-cont">
                <h1 className="camera__title">Prescription, meet scanner from the future</h1>
            </div>
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
                    <label></label>
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
            <div className="camera__detect-cont">
                <h2 className="camera__detect">Detected Labels</h2>
                <ul className="camera__detect-para">
                    {detectedLabels.map((label, index) => (
                        <li className="camera__detect-li"key={index}>{label.description}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Camera;

