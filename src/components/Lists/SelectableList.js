import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CheckboxList({data, onClick}) {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {data.map((values, index) => {
        const labelId = `checkbox-list-label-${values._id}`;

        return (
          <ListItem
            key={values._id}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" onClick={() => onClick(values)}>
                <DeleteIcon />
              </IconButton>
            }
            disablePadding
            role={undefined} 
          >
            {/* <ListItemButton  dense> */}
              {/* <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(values._id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon> */}
              <ListItemText id={labelId} primary={`${values._id}`} secondary={`${values.notes ? values.notes : ''}`} />
            {/* </ListItemButton> */}
          </ListItem>
        );
      })}
    </List>
  );
}
