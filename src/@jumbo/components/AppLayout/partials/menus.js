import React from 'react';
import IntlMessages from '../../../utils/IntlMessages';

import { 
   // PostAdd,
   ArrowForward,
   Category,
   Store,
   Dashboard,
   LocalMall,
   Assessment,
   LocalAtm,
   SupervisedUserCircle,
   Settings,
   SettingsInputSvideo
   } from '@material-ui/icons';


   const storeMenus = {
    name: <IntlMessages id={'sidebar.store'} />,
    icon: <Store />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'sidebar.dashboard'} />,
        icon: <ArrowForward />,
        type: 'item',
        link: '/store/dashboard',
      },
   
      {
        name: <IntlMessages id={'sidebar.customers'} />,
        icon: <ArrowForward />,
        type: 'item',
        link: '/store/customers',
      },
    ],
  };


   const inventoryMenus = {
    name: <IntlMessages id={'sidebar.inventory'} />,
    icon: <Category />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'sidebar.products'} />,
        icon: <ArrowForward />,
        type: 'item',
        link: '/inventory/products',
      },
      {
        name: <IntlMessages id={'sidebar.stocks'} />,
        icon: <ArrowForward />,
        type: 'item',
        link: '/inventory/stocks',
      },
      {
        name: <IntlMessages id={'sidebar.purchases'} />,
        icon: <ArrowForward />,
        type: 'item',
        link: '/inventory/purchases',
      },
    ],
  };


  const salesMenus = {
    name: <IntlMessages id={'sidebar.report'} />,
    icon: <Assessment />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'sidebar.sales'} />,
        icon: <ArrowForward />,
        type: 'item',
        link: '/reports/sales',
      },
      {
        name: <IntlMessages id={'sidebar.remittance'} />,
        icon: <ArrowForward />,
        type: 'item',
        link: '/reports/remittances',
      },
      {
        name: <IntlMessages id={'sidebar.expense'} />,
        icon: <ArrowForward />,
        type: 'item',
        link: '/reports/expenses',
      },
    ],
  };

  
  const settingsMenus = {
    name: <IntlMessages id={'sidebar.settings'} />,
    icon: <Settings />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'sidebar.config'} />,
        icon: <ArrowForward />,
        type: 'item',
        link: '/settings/configurations',
      },
      {
        name: <IntlMessages id={'sidebar.user'} />,
        icon: <ArrowForward />,
        type: 'item',
        link: '/settings/user-management',
      }
    ],
  };

  export const sidebarNavs = [
    {
      name: <IntlMessages id={'sidebar.main'} />,
      type: 'section',
      children: [
        storeMenus, 
        inventoryMenus,
        salesMenus,
        settingsMenus
      
      ],
    },
  
  ];


// export const sidebarNavs = [
//   {
//     name: 'Main',
//     type: 'section',
//     children: [
//       {
//         name:  'Dashboard',
//         type: 'item',
//         icon: <Dashboard />,
//         link: '/dashboard',
//       },
//       {
//         name:  'Inventory',
//         type: 'item',
//         icon: <LocalMall/>,
//         link: '/inventory',
//       },
//       {
//         name:  'Sales Report',
//         type: 'item',
//         icon: <Assessment />,
//         link: '/sales-report',
//       },
//       {
//         name:  'Disbursement',
//         type: 'item',
//         icon: <LocalAtm />,
//         link: '/disbursement',
//       },
//       {
//         name:  'User Management',
//         type: 'item',
//         icon: <SupervisedUserCircle />,
//         link: '/user-management',
//       },
//       {
//         name:  'Settings',
//         type: 'item',
//         icon: <Settings />,
//         link: '/settings',
//       },
//     ],
//   },
//   {
//     name: 'Other Pages',
//     type: 'section',
//     children: [
//       {
//         name:  'Create Business',
//         type: 'item',
//         link: '/dashboard/business',
//       },
//       {
//         name:  'Login',
//         type: 'item',
//         link: '/signin',
//       },
//     ],
//   },
// ];

// export const horizontalDefaultNavs = [
//   {
//     name: <TextDisplay title={'sidebar.main'} />,
//     type: 'collapse',
//     children: [
//       {
//         name: <TextDisplay title={'pages.dashboard'} />,
//         type: 'item',
//         icon: <PostAdd />,
//         link: '/dashboard',
//       },
//     ],
//   },
// ];

// export const minimalHorizontalMenus = [
//   {
//     name: <TextDisplay title={'sidebar.main'} />,
//     type: 'collapse',
//     children: [
//       {
//         name: <TextDisplay title={'pages.dashboard'} />,
//         type: 'item',
//         icon: <PostAdd />,
//         link: '/dashboard',
//       },
//     ],
//   },
// ];
