//For expanding sidebar
  import { fetchError, fetchStart, fetchSuccess } from './Common';
  import axios from 'axios';
  import moment from 'moment';
  import commonData from 'utils/commonData';
  
  import { authHeader } from '../../services/auth-header';
  
  //For setting Filtertype
  export const setOrderReceipt = data => {
    console.log(data)
    return dispatch => {
        const { customers, business } = data;
        const customer = (!customers || customers.length === 0) ? '-' : customers[0].name;
        const amount_paid = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_paid)
        const amount_payable = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_payable)
        const amount_due = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_due)
        const order_date = moment(data.createdAt).format('LLL');

      

      



        const newData = {
          ...data,
            "report_type": "INVOICE-SUMMARY",
            "export_type": "pdf",
            "key": data.order_no,
            "parser": "invoice",
            "header": {
              business, bill_to: (!customers || customers.length === 0) ? {} : customers[0],
              invoice: { order_no: data.order_no, order_date }
            },
            "content": {
                ...data,
                name: customer,
                amount_paid,
                amount_payable,
                amount_due,
                order_date,
            },
            "page_options": {
              // "page_orientation": "portrait"
            }
          }
          


        dispatch(printReport(newData))

    };
  };

  export const setOrderReceipt1 = data => {
    return dispatch => {
        const { customers } = data;
        const customer = (!customers || customers.length === 0) ? '-' : customers[0].name;
        const amount_paid = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_paid)
        const amount_payable = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_payable)
        const amount_due = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'PHP' }).format(data.amount_due)
        const order_date = moment(data.createdAt).format('LLL');
        const newData = {
            "report_type": "PAYMENT-RECEIPT",
            "export_type": "pdf",
            "key": data.order_no,
            "parser": "invoice",
            "header": {
              
            },
            "content": {
                ...data,
                name: customer,
                amount_paid,
                amount_payable,
                amount_due,
                order_date
            }
          }
          


        dispatch(printReport(newData))

    };
  };
  
  //Generate Order Receipt Report
  export const printReport = (data) => {
    return dispatch => {
      dispatch(fetchStart());
      axios
        .post(`${commonData.apiUrl}/documents`, data, { headers: authHeader() })
        .then(data => {
          console.log(data)
          dispatch(fetchSuccess('Generation In Progress!'));
        })
        .catch(error => {
          dispatch(fetchError('Generation Faild, Something went wrong! '));
        });
    };
  };
  
 