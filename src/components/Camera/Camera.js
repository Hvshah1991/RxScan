import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";
import axios from 'axios';

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
        <div className="container">
        {imgSrc ? (
          <img src={imgSrc} alt="webcam" />
        ) : (
          <Webcam 
            height={600}
            width={600}
            ref={webcamRef}
            mirrored={mirrored}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            />
        )}
        <div className="controls">
        <div>
          <input
            type="checkbox"
            checked={mirrored}
            onChange={(e) => setMirrored(e.target.checked)}
          />
          <label>Mirror</label>
        </div>
        </div>
        <div className="btn-container">
          {imgSrc ? (
            <button onClick={retake}>Retake photo</button>
          ) : (
            <button onClick={capture}>Capture photo</button>
          )}
        </div>
        </div>
    );
};

export default Camera;