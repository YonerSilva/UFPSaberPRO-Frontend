import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import { useDispatch } from '../../store/Provider/storeProvider';


const Timer = ({ expiryTimestamp, sendByTempo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => { finalizarPresentacionSimulacro() } });

  const finalizarPresentacionSimulacro = ()=>{
    let button = document.getElementById("btn_presentar");
    toast('El tiempo del simulacro ha finalizado!', {
      icon: '⏲',
    });
    setTimeout(()=>{
      sendByTempo();
      button.click();
    },3000)
  }

  return (
    <h4 className='text-center'>
      {hours}:{minutes}:{seconds}
    </h4>
  );
}

export default Timer;