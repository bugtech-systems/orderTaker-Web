import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import './vid.css';

import { Box, Button, Typography } from '@material-ui/core';
import commonData from '../../../utils/commonData';


let vidList = [
  {
    title: 'Sample 1',
    video: 'sample1.mp4'
  },
  {
    title: 'Sample 2',
    video: 'sample2.mp4'
  },
  {
    title: 'Sample La',
    video: 'sample.mp4'
  }
]



function ResponsivePlayer () {
  const [isPlay, setPlay] = useState(true);
  const [vid, setVid] = useState(`${commonData.staticUrl}${vidList[2].video}`);
  const isShowing = localStorage.getItem('extra');


let vids = vidList.map((a, index) => {
  return (
    <Box key={index}>
      <Typography variant='body1'>{a.title}</Typography>
      <Button variant='outlined' size='small' color='primary' onClick={() => setVid(`${commonData.staticUrl}${a.video}`)} >PLAY</Button>
    </Box>
  )
})

    return (<>
    {/* {isShowing && */}
    <>
      {vid &&  <Button onClick={() => setPlay(!isPlay)} >{ isPlay ? 'PAUSE' : 'PLAY' }</Button>}

      {vid &&  <div className='player-wrapper'>
       <ReactPlayer
          controls={true}
          playing={isPlay} 
          className='react-player'
          url={vid}
          width='100%'
          height='100%'
        />
        <br/>

      </div>}
        {vids}
        </>
      {/* } */}
      </>
    )
}

export default ResponsivePlayer