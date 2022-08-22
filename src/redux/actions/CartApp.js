import { UPDATE_CART, UPDATE_CART_ITEMS, SET_CART_ITEMS_COUNT } from './types';
import configureStore, { history } from '../store';
import { fetchError, fetchStart, fetchSuccess } from './Common';
import { authHeader } from '../../services/auth-header';

import commonData from '../../utils/commonData';
import axios from 'axios';





//For expanding sidebar
export const handleCartItem = (qty, item)  => dispatch => {
let store = configureStore();

  let { stocks } = item.product;
  let cart = store.getState().cartApp;

  let { cart_items } = cart;

  let cartItems = cart_items;
  let inds = cart_items.map(a => { return a.productId}).indexOf(item.productId);



  if(qty >= 0){

    let newStock = stocks > qty && qty >= 0 ? stocks - qty : 0;

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



  let { cart_items, other_amounts } = cartItem;
  let gross_total = 0;
  let amount_due = 0;
  let total_vatable = 0;
  let total_discounts = 0;
  let total_charges = 0;
  let tax_disc = [];


  for(let val of cart_items){

      //Gross Total
      let total = val.price * val.qty;
      gross_total += total;

      //Vatable
    let vats = val.other_amounts.find(a => a.type === 'tax' && !a.isCart);
    if(vats){
      let vatable = 0;
        vatable += total / (1 + (vats.value / 100));

        let ind = tax_disc.map(ab => { return ab.id }).indexOf(vats.id);
        if(ind !== -1){
          tax_disc[ind].total += total - vatable;
        } else {

          tax_disc.push({
            id: vats.id,
            description: 'VAT - 12%',
            type: 'tax',
            total: total - vatable
          })
        }

        total_vatable += vatable;


     
     
    }
   //Vat


      //Discounts
      let discs = val.other_amounts.filter(a => a.type === 'discounts' && !a.isCart);
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
      let chrgs = val.other_amounts.filter(a => a.type === 'charges' && !a.isCart);
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


  for(let val of other_amounts){
    console.log(val.type);
    let total = val.amount_type === 'rate' ? gross_total * (val.value / 100) : val.value;
    console.log(total)
    if(val.type === 'discounts'){
      total_discounts += Number(total)
    }

    if(val.type === 'charges'){
      total_charges += Number(total)
    }


    tax_disc.push({
      id: val.id,
      description: `${val.name}${val.amount_type === 'rate' ? ` - ${val.value}%` : ''}`,
      total: Number(total),
      type: val.type,
      isCart: true
    })
  }



  console.log('total discounts');
  console.log(total_discounts)

  let disc_gross = Number(gross_total) - Number(total_discounts)
  console.log(disc_gross)
  amount_due = disc_gross + Number(total_charges);

  dispatch({
    type: UPDATE_CART,
    payload: {
      ...cartItem,
      cart_items: cart_items,
      tax_disc: tax_disc,
      gross_total: Number(gross_total).toFixed(2),
      amount_due: Number(amount_due).toFixed(2),
      cart_items_count: cart_items.length,
      total_vatable: Number(total_vatable).toFixed(2),
      other_amounts: other_amounts
    }
  });
};

export const createOrder = (cart) => dispatch => {
  console.log(cart)
    dispatch(fetchStart());
    return axios
      .post(`${commonData.apiUrl}/orders`, cart, { headers: authHeader() });
};