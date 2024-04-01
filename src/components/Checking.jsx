import React, { useState } from 'react';
import Webcam from 'react-webcam';
import TextField from '@mui/material/TextField';

export default function WebcamCapture() {
  const [imageData, setImageData] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [mssv, setMSSV] = useState('');
  const [location, setLocation] = useState('');
  const webcamRef = React.useRef(null);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageData(imageSrc);
  };

  const videoConstraints = {
    facingMode: 'user'
  };

  const getCurrentTime = () => {
    const now = new Date();
    setTimestamp(now.toLocaleString());
  };

  const handleLocation = async () => {
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=10.784165,106.641308&key=AIzaSyDJw4YBhyKaoLAtuAyVRW6XW6fHIrDRrcg

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = 'AIzaSyDiVHlUBip2Tw1yWwCSSm3K4Zr6gJtVCdM';
        const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=?key=${apiKey}`);
        console.log(`https://www.googleapis.com/geolocation/v1/geolocate?key=?key=${apiKey}`)
        const data = await response.json();
        if (data.status === 'OK') {
          const locationName = data.results[0].formatted_address;
          setLocation(locationName);
          console.log("location",location);
          console.log("locationName",locationName);
          console.log('data',data)
        } else {
          console.error('Error:', data.status);
          setLocation('Cannot fetch location');
        }
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocation('Geolocation is not supported by this browser.');
    }
  };

  const handleMSSV = (e) => {
    const mssvx = e.target.value;
    setMSSV(mssvx);
  };

  const handleSubmit = async () => {
    captureImage();
    getCurrentTime();
    handleLocation();
  };

  return (
    <div className='pb-10'>
      <div className="p-2">
        <TextField id="outlined-basic" label="MSSV" value={mssv} onChange={handleMSSV} className="w-full bg-white/70 rounded" />
      </div>
      <div className="rounded-lg m-2 p-1 bg-blue-900/90">
        <Webcam
          mirrored={true}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%' }}
          videoConstraints={videoConstraints}
          className="rounded-lg"
        />
        <div className="w-full flex justify-center items-center pt-2">
          <div className="border-4 rounded-full h-16 w-16 flex justify-center items-center">
            <button onClick={handleSubmit} className="rounded-full h-14 w-14 bg-white/90"></button>
          </div>
        </div>
      </div>
      {imageData && <img src={imageData} alt="Captured" className="w-full" />}
      {mssv && <p>MSSV: {mssv}</p>}
      {timestamp && <p>Thời gian: {timestamp}</p>}
      {location && <p>location: {location}</p>}
    </div>
  );
}
