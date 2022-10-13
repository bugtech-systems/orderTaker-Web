import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import commonData from "../utils/commonData";




//Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllNotifications } from "redux/actions/Notification";
import { SET_NOTIFICATIONS, SET_NOTIF_COUNT } from "redux/actions/types";

export default function Socket() {
  const dispatch = useDispatch();
    const { 
      authUser, 
      // isAdmin 
    } = useSelector(({auth}) => auth);
    let uiState = useSelector((state) => state.uiReducer);
    const [ntfCount, setNtfCount] = useState(0);








const handleNotification = (val) => {
  console.log('Notif Receive');
  let notifications = uiState.notifications;
  notifications.unshift(val);
      handleClick()
      dispatch(getAllNotifications())
      .then(res => {
        dispatch({type: SET_NOTIF_COUNT})
      })
      .catch(err => {
        console.log(err)
      })
      // dispatch({type: SET_NOTIFICATIONS, payload: { notifications }})

  }



const handleClick = (url) => {
  console.log(`${commonData.staticUrl} `)
// const audio = new Audio(`${commonData.staticUrl}/assets/notif1.mp3`);
// audio.play();
playVibrate();
playSound();
}

const playVibrate = (url) => {
  navigator.vibrate(20000); // vibrate for 200ms
// navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100])
  // console.log(`${commonData.staticUrl} `)
// const audio = new Audio(`${commonData.staticUrl}/assets/notif1.mp3`);
// audio.play();
}


const playSound = (url) => {
  console.log(`${commonData.staticUrl} `)
const audio = new Audio(`${commonData.staticUrl}/assets/notif1.mp3`);
audio.play();
}

useEffect(() => {
  let socket  = null;


  if(authUser && authUser.id) {
  socket = socketIOClient(`${commonData.hostUrl}`, {
      extraHeaders: {
        Authorization: `Bearer ${authUser.id}`
      },
      // transports: ["websocket"]
    });

    console.log('SOCKET INIT')



      socket.on("notification", val => {
        handleNotification(val);
        });
}


return () => {
  if(socket){
    console.log("DISCONNTECT")
    socket.disconnect();
  }
  }

}, [authUser]);

useEffect(() => {
console.log(uiState.notifCount)
  setNtfCount(uiState.notifCount);
}, [uiState])

console.log(ntfCount);

  return (
    <div 
    style={{display: 'none'}}
    >
    <div>Socket</div>
    <button onClick={() => handleClick()}>PLAY</button>
    </div>
  )
}
