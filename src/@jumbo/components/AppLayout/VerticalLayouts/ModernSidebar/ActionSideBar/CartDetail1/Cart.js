import React, { useMemo, useState } from 'react';

import { Box, Button, makeStyles } from '@material-ui/core';

import CmtList from '../../../../../../../@coremat/CmtList';

import MessageItem from './CartItem';
import { intranet } from '../../../../../../../@fake-db';

import EmptyResult from '../EmptyResult';
import SearchBox from '../Search/SearchBox';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 10,
    color: theme.palette.text.secondary,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
}));

const Cart = () => {
  const classes = useStyles();
  const [messages, setCart] = useState(intranet.messages);
  const [searchKeyword, setSearchKeyword] = useState('');
  const totalCart = useMemo(() => messages.length, [messages]);

  const onSearchKeyword = event => {
    const newSearchKeyword = event.target.value;
    setSearchKeyword(newSearchKeyword);
    if (newSearchKeyword) {
      setCart(
        messages.filter(
          item =>
            item.user.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.message.toLowerCase().includes(searchKeyword.toLowerCase()),
        ),
      );
    } else {
      setCart(intranet.messages);
    }
  };

  return (
    <Box>
      <Box className={classes.header}>
        <Box fontSize={22} fontWeight={700}>
          Cart
        </Box>
        <Button color="primary">Save as Draft</Button>
      </Box>

      <SearchBox searchKeyword={searchKeyword} onSearch={onSearchKeyword} placeholder="Search in messages..." />

      <Box className={classes.sectionHeading}>Unread Cart</Box>
      {totalCart ? (
        <CmtList data={messages} renderRow={(item, index) => <MessageItem key={index} item={item} />} />
      ) : (
        <EmptyResult content="No record found" />
      )}
    </Box>
  );
};

export default Cart;
