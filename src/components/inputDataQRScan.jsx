import React from 'react';

export default function InputDataQRScan( onClose ) {
  return (
    <div className='w-full h-full fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-gray-300/60'>
      <div className='fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2'>
        <div className="bg-white p-3 rounded border border-blue-900">
          <p className='text-center text-blue-900 font-bold'>THÔNG BÁO</p><hr/>
          <input placeholder='HỌ và tên'/>
          <div className='flex justify-end'>
            <button className='bg-blue-900 hover:bg-blue-900/80 text-white rounded py-1 px-5 justify-items-end font' onClick={onClose}>Đóng</button>
          </div>  
        </div>
      </div>
    </div>
  );
}