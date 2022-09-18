import React from 'react';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

import { crypto } from '../../../../../@fake-db';
import TableHeading from './TableHeading';
import TableItem from './TableItem';

const RecentPaymentsTable = ({data}) => {
  console.log(data)
  return (
    <div className="Cmt-table-responsive">
      <Table>
        <TableHead>
          <TableHeading />
        </TableHead>
        <TableBody>
          {data.length !== 0 && data.map(row => {
           return( <TableItem row={row} key={row.id} />)
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentPaymentsTable;
