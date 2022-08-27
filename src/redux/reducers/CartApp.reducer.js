import {
    UPDATE_CART,
    UPDATE_CART_ITEMS,
    CLEAR_CART,
    SET_CART_ITEMS_COUNT
  } from '../actions/types';

  const INIT_STATE = {
        cart_items: [
          {
              "product": {
                  "id": 3,
                  "name": "Concrete Nail",
                  "description": "Concrete nail",
                  "uom": "kilo",
                  "price": 150,
                  "limit": 30,
                  "purchase_price": 0,
                  "stocks": 176,
                  "cover": "noproduct.jpg",
                  "starred": false,
                  "deletedAt": null,
                  "updatedAt": "2022-08-26T09:39:15.000Z",
                  "createdAt": "2022-08-20T04:58:10.000Z",
                  "businessId": 1,
                  "labels": [],
                  "other_amounts": [],
                  "folder": "products"
              },
              "productId": 3,
              "name": "Concrete Nail",
              "stocks": 170,
              "price": 150,
              "total": 900,
              "other_amounts": [],
              "qty": "6"
          }
      ],
        other_amounts: [],
        tax_disc: [], 
        sub_total: 0,
        gross_total: 0,
        grand_total: 0,
        amount_due: 0,
        cart_items_count: 0,
        payment: 0,
        change: 0,
        notes: ''
  };
  
  export default (state = INIT_STATE, action) => {


 
    switch (action.type) {


      case UPDATE_CART: {
        return {
          ...state,
          ...action.payload
        };
      }



      case UPDATE_CART_ITEMS: {
        return {
          ...state,
            cart_items: action.payload
        };
      }

      case CLEAR_CART: {
        return {
            // ...state,
        cart_items: [],
        other_amounts: [],
        tax_disc: [], 
        sub_total: 0,
        gross_total: 0,
        grand_total: 0,
        amount_due: 0,
        cart_items_count: 0,
        payment: 0,
        change: 0,
        total_vatable: 0,
        notes: ''
        };
      }

      
      case SET_CART_ITEMS_COUNT: {
        return {
          ...state,
          cart_items_count: action.payload
        };
      }
  
      default:
        return state;
    }
  };
  