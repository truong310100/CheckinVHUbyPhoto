import React, { useState } from 'react'

export default function SearchDonViKhac() {
    const [name, setName] = useState('');
    const [donvi, setDonVi] = useState('');
    const [note, setNote] = useState('');
    const [phone, setPhone] = useState('')
    ////////////////////////
    const postData = async () => {
        try {
          const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/application-0-mrrmn/endpoint/DangKyKhac";

          const getStaff = window.location.href;
          const staffSplit = getStaff.split('/');
          const staff = staffSplit[staffSplit.length - 1];

          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }, body: JSON.stringify({ name, donvi, phone, note, staff, loai:"Khách mời"})});
            if (response.ok) {
                const result = await response.json();
                console.log('Response:', result);
                alert(result);
            setName('');setDonVi('');setPhone('');setNote('');
          } else {
          console.error('Request failed:', response.status);
          alert('Đã xảy ra lỗi khi gửi, bạn kiểm tra lại kết nối mạng hoặc tải lại trang nhé');}
        } catch (error) {console.error('Lỗi:', error); }};
    ////////////////////////
    const handleName = (e) => {
        const name = e.target.value;
        const words = name.split(" ");
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        const capitalizedName = capitalizedWords.join(" ");
        setName(capitalizedName);
      };
      const handleDonVi = (e) => {    
        const donvi = e.target.value;
        const words = donvi.split(" ");
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        const capitalizedName = capitalizedWords.join(" ");
        setDonVi(capitalizedName);
      };
      const handlePhone = (e) => {
        const phoneNumber = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
        const formattedPhoneNumber = phoneNumber.replace(/(\d{4})(\d{4})/, '$1 $2');
        setPhone(formattedPhoneNumber);
      };
    
    const handleNote = (e) => { const note = e.target.value;setNote(note);};
    const handleSubmit = () => {
        if (!name) {
            alert('Vui lòng kiểm tra lại họ và tên.');
          return;
        }else if (!donvi) {
            alert('Vui lòng kiểm tra lại đơn vị công tác.');
        }else if (!phone || phone.length < 11){
            alert('Vui lòng kiểm tra lại số điện thoại.');
        }else {
            postData();
        }
      };
  return (
    <div>
        <div className='flex flex-col m-2'>
            <input value={name} onChange={handleName} type="text" placeholder='Họ và tên:' className='w-full text-blue-900 outline-none border border-gray-400 py-2 my-1 px-2 rounded-lg'/>
            <input value={donvi} onChange={handleDonVi} type="text" placeholder='Đơn vị:' className='w-full text-blue-900 outline-none border border-gray-400 py-2 my-1 px-2 rounded-lg'/>
            <input value={phone} onChange={handlePhone} type="tel" placeholder='Số điện thoại:' className='w-full text-blue-900 outline-none border border-gray-400 py-2 my-1 px-2 rounded-lg'/>
            <input value={note} onChange={handleNote} type="text" placeholder='Ghi chú khác:' className='w-full text-blue-900 outline-none border border-gray-400 py-2 my-1 px-2 rounded-lg'/>
        </div>
        <div className='flex justify-end mx-2' >
            <button onClick={handleSubmit} className='text-center text-white bg-blue-900 outline-none p-2 my-1 ml-2 rounded-lg border border-gray-400'>Đăng ký</button>
        </div>
    </div>
  )
}
