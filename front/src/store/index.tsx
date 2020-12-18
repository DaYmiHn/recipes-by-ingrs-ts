import { createStore, compose } from 'redux';
import rootReducer from '../reducers/index';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      PORT?: string;
      PWD: string;
    }
  }
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}


/* eslint-disable no-underscore-dangle */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/* eslint-enable */

const configureStore = (preloadedState:any) => (
  createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(),
  )
);

const store = configureStore({});

export default store;
