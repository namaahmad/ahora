import { createStore, applyMiddleware,combineReducers } from 'redux';
import { createBrowserHistory,History } from 'history';
//import { routerMiddleware } from 'react-router-redux';
import dictionary from './redux/DictionaryRedux';
import AuthRedux from './redux/AuthRedux';
import WsMessage from './redux/MessageRedux';
const createRootReducer = (his: History) =>
    combineReducers({
      dictionary,
      AuthRedux,
      WsMessage
    });


const history = createBrowserHistory();

const rootReducer = createRootReducer(history);



const store = createStore(
  rootReducer,
  undefined,
//  applyMiddleware(thunk, routerMiddleware(history)),
);

export { history };
export default store;
