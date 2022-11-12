import React, { useState } from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

import { crypto } from '../../../../../@fake-db';
import TableHeading from './TableHeading';
import TableHeader from './UserTableHead/index';
import TableItem from './TableItem';
import useStyles from './index.style';
import { getComparator, stableSort } from '../../../../../@jumbo/utils/tableHelper';



const RecentPaymentsTable = ({data}) => {
  const classes = useStyles();
  const [order, setOrder] = useState('order_no');
  const [orderBy, setOrderBy] = useState('desc');


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };


  return (
    <div className="Cmt-table-responsive">
      <Table>
        {/* <TableHead> */}
          {/* <TableHeading /> */}
          <TableHeader
              classes={classes}
               order={order}
               orderBy={orderBy}
               onRequestSort={handleRequestSort}
          />
        {/* </TableHead> */}
        <TableBody>
          {data.length !== 0 && 
           (
            stableSort(data, getComparator(order, orderBy))
              .map(row => {
           return( <TableItem row={row} key={row.id} />)
          })) }

        </TableBody>
      
      </Table>
    </div>
  );
};

export default RecentPaymentsTable;
