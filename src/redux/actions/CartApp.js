import { UPDATE_CART, UPDATE_CART_ITEMS, SET_CART_ITEMS_COUNT } from './types';
import configureStore, { history } from '../store';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { authHeader } from '../../services/auth-header';

import commonData from '../../utils/commonData';
import axios from 'axios';
let store = configureStore();





//For expanding sidebar
export const handleCartItem = (qty, item)  => dispatch => {
  let { stocks } = item.product;
  let cart = store.getState().cartApp;

  let { cart_items } = cart;

  let cartItems = cart_items;
  let inds = cart_items.map(a => { return a.productId}).indexOf(item.productId);



  if(qty !== 0){

    let newStock = stocks > qty && qty > 0 ? stocks - qty : 0;

  if (inds !== -1) {

    cartItems = cartItems.map(a => {
      return a.productId == item.productId
        ? {
           ...item, 
            price: item.price,
            qty: qty,
            stocks: newStock,
            total: item.price * qty,
            productId: item.productId,
            name: item.name,
            description: item.description
          }
        : a;
    });

  } else {
    cartItems.push({
      ...item,
      price: item.price,
      qty: qty,
      stocks: newStock,
      total: item.price * qty,
      productId: item.id ? item.id : item.productId,
      name: item.name,
      description: item.description
    });
  }

} else {
  cartItems.splice(inds, 1);
}


  const newCart = { 
    ...cart,
    cart_items: cartItems
  }


  dispatch(handleCart(newCart));
 
};


export const handleCart = (cartItem)  => dispatch => {

  let { cart_items } = cartItem;
  let gross_total = 0;
  let amount_due = 0;
  let total_discounts = 0;
  let total_charges = 0;
  let tax_disc = [];


  for(let val of cart_items){
      //Gross Total
      let total = val.price * val.qty;
      gross_total += total;


      //Vatable
    let vats = val.other_amounts.filter(a => a.type === 'tax');
    console.log(vats)
    if(vats.length !== 0){
      vats.forEach(a => {
        console.log(a)
        let vatable = total / (1 + (a.value / 100));
        console.log(vatable)
        if(a.type === 'tax'){
          console.log(a)
          tax_disc.push({
            description: 'Vatables Sales',
            type: 'tax',
            total: Number(vatable).toFixed(2)
          });

          tax_disc.push({
            description: 'VAT - 12%',
            type: 'tax',
            total: Number(total - vatable).toFixed(2)
          })
        }
      })
    }
      //Vat


      //Discounts
      let discs = val.other_amounts.filter(a => a.type === 'discounts');
      if(discs.length !== 0){
        discs.forEach(a => {
              let inds = tax_disc.map(a => {return a.id}).indexOf(a.id);
                total_discounts += a.amount_type === 'rate' ? total * (a.value / 100) : val.qty * a.value;
                if(inds === -1){
                tax_disc.push({
                  id: a.id,
                  description: `${a.name}${a.amount_type === 'rate' ? ` - ${a.value}%` : ''}`,
                  total: a.amount_type === 'rate' ? total * (a.value / 100) : val.qty * a.value,
                  type: 'discounts'
                 }) 
                } else {
                  tax_disc[inds].total += a.amount_type === 'rate' ? total * (a.value / 100) :  val.qty * a.value
                }
              })
      }


   
      //Charges
      let chrgs = val.other_amounts.filter(a => a.type === 'charges');
      if(chrgs.length !== 0){
        chrgs.forEach(a => {
              let inds = tax_disc.map(a => {return a.id}).indexOf(a.id);
                total_charges +=  a.amount_type === 'rate' ? total * (a.value / 100) : val.qty * a.value;
                if(inds === -1){
                tax_disc.push({
                  id: a.id,
                  description: `${a.name}${a.amount_type === 'rate' ? ` - ${a.value}%` : ''}`,
                  total: a.amount_type === 'rate' ? total * (a.value / 100) : val.qty * a.value,
                  type: 'charges'
                 }) 
                } else {
                  tax_disc[inds].total += a.amount_type === 'rate' ? total * (a.value / 100) :  val.qty * a.value
                }
              })
      }

      //Payment

      //Amount Due
  }

 
  amount_due = gross_total - total_discounts + total_charges;

  dispatch({
    type: UPDATE_CART,
    payload: {
      ...cartItem,
      cart_items: cart_items,
      tax_disc: tax_disc,
      gross_total: Number(gross_total).toFixed(2),
      amount_due: Number(amount_due).toFixed(2),
      cart_items_count: cart_items.length
    }
  });
};

export const createOrder = (cart) => dispatch => {
  console.log(cart)
    dispatch(fetchStart());
    return axios
      .post(`${commonData.apiUrl}/orders`, cart, { headers: authHeader() })
      .then(data => {
        console.log(data)
        dispatch(fetchSuccess());
        return data.data;
      })
      .catch(error => {
        console.log(error)
        let { message } = error?.response?.data;
        dispatch(fetchError(message.text));
        return error
      });
};