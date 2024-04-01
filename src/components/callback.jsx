import React,{useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

function CallbackPage(params) {
  const [searchParams, setSearchParams] = useSearchParams();
  const href = localStorage.getItem("href")
  const navigate = useNavigate()
  useEffect(() => {
    const code = searchParams.get("code")
    if(code){
      localStorage.setItem("code", code);
      navigate(href)
    }}, [])
  
  return(
    <>
    </>
  )}
export default CallbackPage