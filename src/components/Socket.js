import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import commonData from "../utils/commonData";




//Redux
import { useSelector, useDispatch } from "react-redux";
import { getAllNotifications } from "redux/actions/Notification";
import { SET_NOTIF_COUNT } from "redux/actions/types";

export default function Socket() {
  const dispatch = useDispatch();
    const { 
      authUser, 
      // isAdmin 
    } = useSelector(({auth}) => auth);
    let uiState = useSelector((state) => state.uiReducer);
    const [setNtfCount] = useState(0);








const handleNotification = (val) => {
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
// const audio = new Audio(`${commonData.staticUrl}/assets/notif1.mp3`);
// audio.play();
playSound();
playVibrate();

}

const playVibrate = (url) => {
  navigator.vibrate(20000); // vibrate for 200ms
// navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100])
}


const playSound = (url) => {
const audio = new Audio(`${commonData.staticUrl}assets/notif1.mp3`);
audio.play();
}

useEffect(() => {
  let socket  = null;
  let token = localStorage.getItem('idToken')

  if(authUser && authUser.id) {
  socket = socketIOClient(`${commonData.hostUrl}`, {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      },
      // path: "/app"
      // transports: ["websocket"]
    });

      socket.on("notification", val => {
        handleNotification(val);
        });


        socket.on("pdf-webhook", val => {
          let a = document.createElement('a');
          a.href = val.filePath;
          a.target = '_blank';
          a.download = val.filename;
          document.body.appendChild(a);
          a.click();
          a.parentNode.removeChild(a);
          });
}


return () => {
  if(socket){
    console.log("DISCONNTECT")
    socket.disconnect();
  }
  }

},);

useEffect(() => {
  setNtfCount(uiState.notifCount);
},)

  return (
    <div 
    style={{display: 'none'}}
    >
    <div>Socket</div>
    <button onClick={() => handleClick()}>PLAY</button>
    </div>
  )
}
