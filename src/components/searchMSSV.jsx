import React, { useState } from "react";
import BeepMusic from './beep.mp3'
import useSound from 'use-sound';

export default function SearchMSSV() {
  const [ mssv, setMSSV ] = useState('')
    const [result, setResult] = useState();
    const [playBeep] = useSound(BeepMusic);

    async function postDataMSSV(mssv) {
        try {
          const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-mrrmn/endpoint/check_MSSV"
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ field: mssv }),
          });
      
          if (response.ok) {
            const result = await response.json();
            if (result) {
              if (result.mssv) {
                alert(`Dữ liệu đã sẵn sàn.Kiểm tra xem đã checkin chưa?`);
                setResult(result);
              }
            } else {
              alert("Không có dữ liệu trả về từ máy chủ.");
            }
          } else {
            console.error('Request failed:', response.status);
          }} catch (error) {console.error('Error:', error);}}
      

      async function postUpdateMSSV(mssv) {
        try {
          const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-mrrmn/endpoint/checkin_MSSV";
    
          const getStaff = window.location.href;
          const staffSplit = getStaff.split('/');
          const staff = staffSplit[staffSplit.length - 1];
    
          const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ field: mssv, staff: staff }),});
          if (response.ok) {
            const result = await response.json();
            alert(result)
            setResult('')
            setMSSV('')
          } else { console.error('Request failed:', response.status);}
          } catch (error) { console.error('Error:', error);}}

    const handleDataUpdateMSSV = async () => {
        if (result.DateTimeCheck ) {
        const checkAlert = window.confirm(`MSSV: ${result.mssv} đã checkin vào lúc \n${(result.DateTimeCheck)}\nBạn có muốn check in lại không?`);
        if (checkAlert) {
            await postUpdateMSSV(mssv, setResult(''));}} 
        else {await postUpdateMSSV(mssv);}};

    const handleMSSV = (e) => {
    const mssv = e.target.value.slice(0, 10).toUpperCase();
    setMSSV(mssv);};

    const handleSubmitMSSV = () => {
    if(!mssv || mssv.length < 10 || !mssv.includes('A')){
      alert("Kiểm tra lại Dữ liệu cần nhập")
    }else{
      postDataMSSV(mssv);
      playBeep();
        }
    }

  return (
    <div>
      <div className="flex my-1 mx-2">
        <input
          value={mssv}
          onChange={handleMSSV}
          type="text"
          placeholder="Thêm hoặc Tìm với MSSV"
          className="w-full text-center text-blue-900 outline-none border border-gray-400 py-2 my-1 px-2 rounded-lg"
        />
        <button
          onClick={handleSubmitMSSV}
          className="text-center w-2/3 text-white bg-blue-900 outline-none p-2 my-1 ml-2 rounded-lg border border-gray-400">
          Thêm/Tìm MSSV
        </button>
      </div>
      <div className={`my-1 bg-white ${result ? 'border border-gray-400 rounded-lg' : ''}`}>
          {result ? (<>
            <div className="mx-3 py-2">
                <table>
                  <tr>
                    <td className="pr-3 text-blue-900">MSSV: </td>
                    <td>{result.mssv}</td>
                  </tr>
                </table>
            </div>
            
            <button onClick={handleDataUpdateMSSV}
              className={`w-full py-2 text-white text-lg font-bold rounded-lg ${ result.DateTimeCheck? 'bg-green-500': 'bg-red-500'}`}>
              {result.DateTimeCheck ? (
                <div className="text-white">
                  Check In: {(result.DateTimeCheck)}
                </div>) : (<div className="text-white">Chưa Check in</div>)}
            </button>

          </>) : null}
        </div>
    </div>
  );
}
