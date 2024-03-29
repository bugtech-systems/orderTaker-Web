import React, { useContext, useEffect, useState } from 'react';

import { Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import CmtCard from '../../../../../@coremat/CmtCard';
import CmtCardHeader from '../../../../../@coremat/CmtCard/CmtCardHeader';
import CmtGridView from '../../../../../@coremat/CmtGridView';
import CmtImage from '../../../../../@coremat/CmtImage';
import { SectionLegend } from '../../../CorematDemosComponents';
import AppSwitch from '../../../Common/formElements/AppSwitch';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';

import {
  FLAT_COLOR_OPTIONS,
  GRADIENTS_COLOR_OPTIONS,
  SIDEBAR_BG_IMAGE_OPTIONS,
} from '../../../../constants/CustomizerOptions';
import SidebarThemeContext from '../../../../../@coremat/CmtLayouts/SidebarThemeContext/SidebarThemeContext';
import AppContext from '../../../contextProvider/AppContextProvider/AppContext';
import themeSidebarColor from '../../../../../@coremat/CmtLayouts/SidebarThemeContext/sidebarThemeColors';

import commonData from '../../../../../utils/commonData';


const useStyles = makeStyles(theme => ({
  cardRoot: {
    '& .Cmt-header-root': {
      padding: '4px 16px',
    },
    '& .Cmt-card-content': {
      padding: 16,
    },
  },
  checkIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fill: theme.palette.success.main,
  },
}));

const SidebarOption = () => {
  const classes = useStyles();
  let bg = localStorage.getItem('backgroundImg')

  const { sidebarTheme, setSidebarTheme } = useContext(SidebarThemeContext);
  const { themeType } = useContext(AppContext);
  const [imageOptionsVisibility, setImageOptionsVisibility] = useState(!bg ? !!sidebarTheme.backgroundImage : bg);

  const sidebarOptions = SIDEBAR_BG_IMAGE_OPTIONS.map(a => {
    return {...a, image: commonData.staticUrl + a.image, fullImage: commonData.staticUrl + a.fullImage }
  })

  const resetOption = () => {
    setSidebarTheme({
      ...sidebarTheme,
      ...themeSidebarColor[themeType],
      backgroundColor: '',
      backgroundImage: '',
    });

    localStorage.setItem('backgroundImg', false);
    setImageOptionsVisibility(false);
  };

  const toggleImageOptionsVisibility = () => {
    setImageOptionsVisibility(!imageOptionsVisibility);
    localStorage.setItem('backgroundImg', !imageOptionsVisibility);

  };

  const changeSidebarImage = option => {
    let opt = localStorage.getItem('defaultTheme');
    let current = opt ? JSON.parse(opt) : {};
    setSidebarTheme(sidebarTheme => ({
      ...sidebarTheme,
      backgroundImage: option.fullImage,
    }));
    current.backgroundImage = option.fullImage;
    localStorage.setItem('defaultTheme', JSON.stringify(current))
  };

  const applySidebarStyle = newSidebarTheme => {
    setSidebarTheme({
      ...sidebarTheme,
      ...newSidebarTheme,
    });
  };

  useEffect(() => {
    let sbopt = SIDEBAR_BG_IMAGE_OPTIONS.map(a => {
      return {...a, image: commonData.staticUrl + a.image, fullImage: commonData.staticUrl + a.fullImage }
    });
    let opt = localStorage.getItem('defaultTheme');
    let current = opt ? JSON.parse(opt) : {};
    if (!imageOptionsVisibility) {
      setSidebarTheme(sidebarTheme => ({
        ...sidebarTheme,
        backgroundImage: '',
      }));
      current.backgroundImage = '';

    } else {
      setSidebarTheme(sidebarTheme => ({
        ...sidebarTheme,
        backgroundImage: current.backgroundImage ? current.backgroundImage : sbopt[0].fullImage
      }));
    }

  }, [imageOptionsVisibility, setSidebarTheme]);
  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader title="Sidebar Option">
        <Button onClick={resetOption}>RESET</Button>
      </CmtCardHeader>
      <CmtCardContent>
        <div className="mb-6">
          <Box className="mb-4" color="text.secondary">
            Flat Style
          </Box>
          <CmtGridView
            itemPadding={14}
            responsive={{
              xs: 4,
              sm: 6,
              md: 6,
              lg: 6,
              xl: 6,
            }}
            data={FLAT_COLOR_OPTIONS}
            renderRow={(color, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <div
                  className="pointer"
                  onClick={() => {
                    applySidebarStyle(color);
                  }}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: color.backgroundColor,
                  }}
                />
                {sidebarTheme.backgroundColor === color.backgroundColor && <CheckCircleIcon className={classes.checkIcon} />}
              </div>
            )}
          />
        </div>
        <div className="mb-6">
          <Box mb={4} color="text.secondary">
            Gradient
          </Box>
          <CmtGridView
            itemPadding={14}
            responsive={{
              xs: 4,
              sm: 6,
              md: 6,
              lg: 6,
              xl: 6,
            }}
            data={GRADIENTS_COLOR_OPTIONS}
            renderRow={(color, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <div
                  className="pointer"
                  onClick={() => applySidebarStyle(color)}
                  style={{
                    background: `linear-gradient(180deg, ${color.backgroundColor.join(', ')})`,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                  }}
                />
                {sidebarTheme.backgroundColor === color.backgroundColor && <CheckCircleIcon className={classes.checkIcon} />}
              </div>
            )}
          />
        </div>
        <SectionLegend mb={4}>
          <AppSwitch label="Apply Sidebar Image" checked={imageOptionsVisibility} onChange={toggleImageOptionsVisibility} />
        </SectionLegend>
        {imageOptionsVisibility && (
          <CmtGridView
            itemPadding={14}
            column={6}
            data={sidebarOptions}
            renderRow={(item, index) => (
              <div key={index} style={{ position: 'relative' }} className="pointer" onClick={() => changeSidebarImage(item)}>
                <CmtImage src={item.image} alt={item.name} />
                {sidebarTheme.backgroundImage === item.fullImage && <CheckCircleIcon className={classes.checkIcon} />}
              </div>
            )}
          />
        )}
      </CmtCardContent>
    </CmtCard>
  );
};

export default SidebarOption;
