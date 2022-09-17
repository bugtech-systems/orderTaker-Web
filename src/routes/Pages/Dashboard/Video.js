import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import './vid.css';

import { Box, Button } from '@material-ui/core';

import Sample from './sample.mp4';
import Sample1 from './sample1.mp4';
import Sample2 from './sample2.mp4';

let vidList = [
  {
    title: 'Sample 1',
    video: Sample1
  },
  {
    title: 'Sample 2',
    video: Sample2
  },
  {
    title: 'Sample La',
    video: Sample
  }
]



function ResponsivePlayer () {
  const [isPlay, setPlay] = useState(false);
  const [vid, setVid] = useState(null);



let vids = vidList.map(a => {
  return (
    <Box >
      <Button onClick={() => setVid(a.video)} >{a.title}</Button>
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