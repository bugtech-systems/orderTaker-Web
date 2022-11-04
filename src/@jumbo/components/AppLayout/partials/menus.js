import React from 'react';
import IntlMessages from '../../../utils/IntlMessages';

import {
  PostAdd,
  ArrowForward,
  Category,
  // Store,
  Dashboard,
  // LocalMall,
  Assessment,
  // LocalAtm,
  SupervisedUserCircle,
  // Settings,
  ContactPhone,
  LowPriority,
  NaturePeople,
  MenuOpenIcon
} from '@material-ui/icons';
import ListIcon from '@material-ui/icons/List';

export const sidebarNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'sidebar.dashboard'} />,
        icon: <Dashboard />,
        type: 'item',
        link: '/dashboard',
        role: ['admin', 'super', 'sales']
      },
      {
        name: <IntlMessages id={'sidebar.products'} />,
        icon: <ListIcon />,
        type: 'item',
        link: '/products',
        role: ['admin', 'super', 'sales']
      },
      {
        name: <IntlMessages id={'sidebar.inventory'} />,
        icon: <LowPriority />,
        type: 'item',
        link: '/inventory',
        role: ['admin', 'super'],
      },
      // {
      //   name: <IntlMessages id={'sidebar.inventory'} />,
      //   icon: <Category />,
      //   type: 'item',
      //   link: '/inventory',
      // },
      {
        name: <IntlMessages id={'sidebar.customers'} />,
        icon: <NaturePeople />,
        type: 'item',
        link: '/customers',
        role: ['admin', 'super', 'sales'],
      },
      {
        name: <IntlMessages id={'sidebar.report'} />,
        icon: <Assessment />,
        type: 'item',
        link: '/reports',
        disabled: true,
        role: ['admin', 'super', 'sales'],
        children: [
          {
            name: <IntlMessages id={'sidebar.sales'} />,
            icon: <ArrowForward />,
            type: 'item',
            link: '/reports/sales',
            role: ['admin', 'super'],
          },
          {
            name: <IntlMessages id={'sidebar.expense'} />,
            icon: <ArrowForward />,
            type: 'item',
            link: '/reports/expenses',
            role: ['admin', 'super'],
          },
          {
            name: <IntlMessages id={'sidebar.purchases'} />,
            icon: <ArrowForward />,
            type: 'item',
            link: '/reports/purchases',
            role: ['admin', 'super'],
          },
          {
            name: <IntlMessages id={'sidebar.unpaid'} />,
            icon: <ArrowForward />,
            type: 'item',
            link: '/reports/unpaid',
            role: ['admin', 'super'],
            disabled: true,

          }
        ]
      },
      {
        name: <IntlMessages id={'sidebar.user'} />,
        icon: <SupervisedUserCircle />,
        type: 'item',
        link: '/users',
        role: ['admin', 'super'],
        disabled: false,

      },
      // {
      //   name: <IntlMessages id={'sidebar.settings'} />,
      //   icon: <Settings />,
      //   type: 'item',
      //   link: '/settings',
      // }
    ],
  },
];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',

    children: [
      {
        name: <IntlMessages id={'pages.dashboard'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/dashboard',
      },
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.dashboard'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/dashboard',
      },
    ],
  },
];
