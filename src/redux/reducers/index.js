import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import Common from './Common';
import Auth from './Auth';
import ProfileApp from './ProfileApp';
import Users from './Users';
import Crud from './Crud';
import Data from './Data';
import ContactApp from './ContactApp';
import Customer from './Customer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    common: Common,
    auth: Auth,
    profileApp: ProfileApp,
    usersReducer: Users,
    dataReducer: Data,
    crud: Crud,
    contactApp: ContactApp,
    customer: Customer,
  });
