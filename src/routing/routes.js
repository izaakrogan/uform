// creates route object
import createRouteList from './route_list.js';

// components
import login from '../login/';
import registration from '../registration/';
import create_event from '../create_event/';
import view_event from '../view_event/';

const components = {
  login,
  registration,
  create_event,
  view_event
}

export default createRouteList(components);
