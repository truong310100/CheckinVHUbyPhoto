import React, { useState,useEffect } from 'react';
import Webcam from 'react-webcam';
import TextField from '@mui/material/TextField';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function WebcamCapture() {
  const [imageData, setImageData] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [mssv, setMSSV] = useState('');
  const [locationMap, setLocationMap] = useState({ lat: 0, lng: 0});
  const [locationName, setLocationName] = useState('');
  const [minhchung,setMinhChung] = useState(false);

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
    const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  
    // Lấy thông tin ngày, tháng, năm
    const dayOfWeek = daysOfWeek[now.getDay()];
    const day = now.getDate();
    const month = now.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = now.getFullYear();
  
    // Lấy thông tin giờ, phút, giây
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    // const amOrPm = hours >= 12 ? 'PM' : 'AM';
    // hours = hours % 12 || 12; // Đổi giờ từ 24h sang 12h
  
    // Định dạng các giá trị để có thể hiển thị dạng số 2 chữ số
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  
    const formattedTime = `${dayOfWeek}, ${formattedDay}/${formattedMonth}/${year},${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  
    // Cập nhật state với giá trị đã định dạng
    setTimestamp(formattedTime);
  };
  
  const handleLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        setLocationMap({lat:latitude,lng:longitude})
        if (!data.error) {
          const locationName = data.display_name;
          setLocationName(locationName);
        } else {
          console.error('Error:', data.error);
          setLocationName('Cannot fetch location');
        }
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      setLocationName('Geolocation is not supported by this browser.');
    }
  };

  const postData = async () => {
    console.log(mssv,imageData.slice(0,20),timestamp,locationName,locationMap.lat,locationMap.lng);
    setMinhChung(true)
  };

  const handleMSSV = (e) => {
    const mssvs = e.target.value.slice(0,10).toUpperCase();
    setMSSV(mssvs);
  };

  const handleSubmit = () => {
    if(!mssv || mssv.length < 10 || !mssv.includes('A')){
      alert('Vui lòng nhập mã số sinh viên')
    }else{
      captureImage();
      getCurrentTime();
      handleLocation();
      postData();
    }
  };

  useEffect(() => {
      handleLocation();
      getCurrentTime();
    const intervalId = setInterval(getCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='pb-10'>
      <div className='bg-white/70 m-2 pt-2 rounded'>
        <div className='text-center p-1'>
          <p className='font-bold text-gray-700 '>{timestamp.slice(0,18)}</p>
          <p className='text-3xl text-blue-500 font-bold'>{timestamp.slice(19,30)}</p>
        </div>
        <div className='text-center px-1 rounded'>
          {/* <MapContainer center={locationMap} zoom={18} style={{ height: '400px', width: '100%'}}>
              <TileLayer
                url={`https://www.openstreetmap.org/18/${locationMap.lat}/${locationMap.lng}`}
              />
              <Marker position={locationMap}>
                <Popup>Your Location</Popup>
              </Marker>
            </MapContainer> */}
            <iframe src={`https://www.openstreetmap.org/export/embed.html?bbox=${locationMap.lng-0.01}%2C${locationMap.lat-0.01}%2C${locationMap.lng+0.01}%2C${locationMap.lat+0.01}&layer=mapnik&zoom=19`} className='w-full'></iframe>

        </div>
        <div className="p-1">
          <TextField id="outlined-basic" autoFocus label="MSSV" value={mssv} onChange={handleMSSV} className="w-full bg-white/70 rounded shadow" />
        </div>

      </div>
      <div className="rounded m-2 p-1 bg-white/70">
        <Webcam
          mirrored={true}
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: '100%' }}
          videoConstraints={videoConstraints}
          className="rounded"
        />
        <div className="w-full pt-2">
            <button onClick={handleSubmit} className="border border-green-500 w-full text-green-500 rounded p-3 text-xl shadow">Checkin</button>
        </div>
      </div>
      <div>
        {minhchung &&
          <div className='p-1 bg-white/70 rounded m-2'>
            <p className='text-gray-700'>Thời gian: {timestamp}</p>
            <p className='text-gray-700'>Địa điểm: {locationName}</p>
            <p className='text-gray-700'>Tọa độ Map: {locationMap.lat},{locationMap.lng}</p>
            <p className='text-gray-700'>MSSV: {mssv}</p>
            <img src={imageData} className='w-full rounded' />
            <p className='text-blue-500 italic text-center'>*Lưu ý: đây là demo</p>
          </div>}
      </div>
    </div>
  );
}
