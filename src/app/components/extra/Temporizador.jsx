import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import { useDispatch } from '../../store/Provider/storeProvider';


const Timer = ({ expiryTimestamp }) => {
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
  } = useTimer({ expiryTimestamp, onExpire: () => { alert("Se termino esa monda") } });

  return (
    <h4 className='text-center'>
      {hours}:{minutes}:{seconds}
    </h4>
  );
}

export default Timer;