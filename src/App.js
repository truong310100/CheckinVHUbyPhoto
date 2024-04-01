import React from 'react'
import Checking from './components/Checking'
import './App.css'
import logo from './images/logoVHU.png'
import Line37 from './images/line37.png'
import bg from './images/bg.webp'

export default function App() {
  return (
  <div className='' style={{
    backgroundImage: `url(${bg})`,
    minHeight:"100vh",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }}>
    <div className="text-xl font-bold flex">
      <div 
      // style={{border: '3px solid #1e3a8a', borderRadius: '0.25rem',}} 
      className='flex bg- justify-center items-center w-full mt-2 mx-2 mb-1 py-2 font-bold'>
          <img className='mx-2' src={logo} style={{height:30,width:30}}/>
          <p className="text-xl font-bold text-center text-blue-900">CHECK IN MYU</p>
        </div>
    </div>
    <Checking />
    <div className='fixed bottom-0 w-full'>
      <img src={Line37} className='w-full h-3'/>
    </div>
  </div>
  )
}