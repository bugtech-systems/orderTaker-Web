import React from 'react';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportContacts = ({ children, data }) => {
  const contacts = data.map(item => {
    return item;
  });
  return (
    <ExcelFile element={children}>
      <ExcelSheet data={contacts} name="Customers">
        <ExcelColumn label="Id" value="id" />
        <ExcelColumn label="Name" value="fullName" />
        <ExcelColumn label="Email" value="email_address" />
        <ExcelColumn label="Phones" value="phone" />
        <ExcelColumn label="Company" value="company" />
        <ExcelColumn label="Designation" value="designation" />
        <ExcelColumn label="Limit" value="limit" />
        <ExcelColumn label="Balance" value="balance" />
      </ExcelSheet>
    </ExcelFile>
  );
};

export default ExportContacts;
