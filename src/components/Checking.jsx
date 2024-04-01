import React, { useState,useEffect } from 'react';
import Webcam from 'react-webcam';
import TextField from '@mui/material/TextField';

export default function WebcamCapture() {
  const [imageData, setImageData] = useState(null);
  const [timestamp, setTimestamp] = useState('');
  const [mssv, setMSSV] = useState('');
  const [locationX, setLocationX] = useState('');
  const [locationY, setLocationY] = useState('');
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
  

  // const handleLocation = async () => {
  //   // https://maps.googleapis.com/maps/api/geocode/json?latlng=10.784165,106.641308&key=AIzaSyDJw4YBhyKaoLAtuAyVRW6XW6fHIrDRrcg
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(async (position) => {
  //       const { latitude, longitude } = position.coords;
  //       const apiKey = 'AIzaSyDiVHlUBip2Tw1yWwCSSm3K4Zr6gJtVCdM';
  //       const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
  //       console.log(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
  //       const data = await response.json();
  //       if (data.status === 'OK') {
  //         const locationName = data.results[0].formatted_address;
  //         setLocation(locationName);
  //       } else {
  //         console.error('Error:', data.status);
  //         setLocation('Cannot fetch location');
  //       }
  //     });
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //     setLocation('Geolocation is not supported by this browser.');
  //   }
  // };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocationX(latitude)
        setLocationY(longitude)
      });
  }

  const postData = async () => {
    console.log(mssv,imageData,timestamp,'X:',locationX,'Y:',locationY);
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
      <div className='bg-white/70 m-2 rounded'>
        <div className='text-center'>
          <p className='font-bold text-gray-700 '>{timestamp.slice(0,18)}</p>
          <p className='text-3xl text-blue-500 font-bold'>{timestamp.slice(19,30)}</p>
        </div>
        <div className='h-28 text-center m-2 rounded'>
          <div className='bg-yellow-500/50 h-28 rounded'>Google Map</div>
        </div>
        <div className="p-2">
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
          className="rounded-lg"
        />
        <div className="w-full pt-2">
            <button onClick={handleSubmit} className="border border-green-500 w-full text-green-500 rounded p-3 text-xl shadow">Checkin</button>
        </div>
      </div>
      <div>
        {minhchung&&<p>Đây là kết quả chấm công của bạn hãy chụp lại màng hình để làm minh chứng</p>}
      </div>
    </div>
  );
}
