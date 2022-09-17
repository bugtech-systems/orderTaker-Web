import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import './vid.css';

import { Box, Button, Typography } from '@material-ui/core';
import { staticUrl } from '../../../utils/commonData';


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
  const [isPlay, setPlay] = useState(false);
  const [vid, setVid] = useState(null);



let vids = vidList.map(a => {
  return (
    <Box>
      <Typography variant='body1'>{a.title}</Typography>
      <Button variant='outlined' size='small' color='primary' onClick={() => setVid(`${staticUrl}${a.video}`)} >PLAY</Button>
    </Box>
  )
})

    return (<>
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
    )
}

export default ResponsivePlayer