import React, { useState } from 'react';
import ToggleHoverCard from '../../../../../@jumbo/components/Common/ToggleHoverCard';
import Box from '@material-ui/core/Box';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import VisitedChart from './VisitedChart';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import useStyles from './index.style';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { intranet } from '../../../../../@fake-db';
import { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



const AnalyticContent = ({ hovered, sales = {total: 0, xrate: ''} }) => {
  const { total, xrate } = sales;
  const classes = useStyles();



console.log(xrate)

return <Box className={classes.toggleAnalyticsContent}>
<Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
  <Box className={classes.toggleAnalyticsContentInner} mr={{ sm: 16 }}>
    {hovered ?  <Box display="flex" alignItems="center" style={{marginBottom: '5px'}}> <Typography className={classes.titleRoot} component="div" variant="h3">
    {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(total)}  </Typography> {xrate && <>|<Box display="flex" alignItems="center" component="p" color="text.secondary" whiteSpace="nowrap" fontSize={16}>
             <Box display="flex" alignItems="center" component="span" ml={2} color={'#6200EE'}>
               35%
               <Box component="span" ml={2}>
                 <TrendingUpIcon />
               </Box>
             </Box>
           </Box></>} </Box>: <Box display="flex" alignItems="center" style={{marginBottom: '5px'}}> <h3>******</h3>&nbsp;{xrate && <h3>***</h3> } </Box> }
  <Typography variant='subtitle2' >TOTAL</Typography>

  </Box>
</Box>
</Box>
  // return hovered ? (
  //   <Box className={classes.toggleAnalyticsContent}>
  //     <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
  //       <Box display="flex" className={classes.toggleAnalyticsContentInner} mr={{ sm: 16 }}>
  //           <Box component="span">Total Sales</Box>
  //         <Typography className={classes.titleRoot} component="div" variant="h1">
  //           963,35
  //         </Typography>
  //         <Box display="flex" alignItems="center" component="p" color="text.secondary" whiteSpace="nowrap" fontSize={16}>
  //           <Box display="flex" alignItems="center" component="span" ml={2} color={'#6200EE'}>
  //             35%
  //             <Box component="span" ml={2}>
  //               <TrendingUpIcon />
  //             </Box>
  //           </Box>
  //         </Box>
  //       </Box>
  //     </Box>
  //   </Box>
  // ) : (
  //   <Box className={classes.toggleAnalyticsContent}>
  //     <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
  //       <Box className={classes.toggleAnalyticsContentInner} mr={{ sm: 16 }}>
  //       <Box component="span">Total Sales</Box>
  //         <Typography className={classes.titleRoot} component="div" variant="h1">
  //           406,42
  //         </Typography>
  //         <Box display="flex" alignItems="center" component="p" color="text.secondary" whiteSpace="nowrap" fontSize={16}>
  //           <Box display="flex" alignItems="center" component="span" ml={2} color={'#ADDC4C'}>
  //             23%
  //             <Box component="span" ml={2}>
  //               <TrendingUpIcon />
  //             </Box>
  //           </Box>
  //         </Box>
  //       </Box>
  //     </Box>
  //   </Box>
  // );
};

const VisitedToggleAnalyticsCard = ({data}) => {
  const [hovered, setHovered] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [visible, setVisible] = useState(true);

  const classes = useStyles();


  useEffect(() => {
    let vis = localStorage.getItem('visible');
  
      setVisible(vis ? vis : false);
    }, [])

  return (
    <ToggleHoverCard
      className={clsx(classes.toggleCardRoot, classes.visitedDoubleToggle, toggled ? 'chart-active' : '')}
      title="DAILY SALES"
      isHovered={setHovered}
      isToggled={setToggled}
      hoverAction={
        <IconButton onClick={() => {
          setVisible(!visible)
          localStorage.setItem('visible', !visible)
          }}>
          {(hovered || visible) ? <VisibilityIcon/> : <VisibilityOffIcon/> }
        </IconButton>
        // <Box
        //   component="span"
        //   className={classes.toggleHoverBtn}
        //   style={{
        //     backgroundColor: hovered ? '#6200EE' : '#F2E7FE',
        //     color: hovered ? '#fff' : '#6200EE',
        //   }}>
        //   {hovered ? 'Yesterday' : 'Today'}
        // </Box>
      }
      toggleAction={<ShowChartIcon color={toggled ? 'primary' : 'action'} />}>
      <AnalyticContent hovered={(hovered || visible)} sales={data}/>

      {(toggled && data.today.length !== 0) && (
        <Box className={classes.dataChartRoot}>
          <VisitedChart
            data={data.today}
            color={hovered ? '#6200EE' : '#ADDC4C'}
            bgColor={hovered ? '#F2E7FE' : '#D7F5B1'}
          />
        </Box>
      )}
    </ToggleHoverCard>
  );
};

export default VisitedToggleAnalyticsCard;
