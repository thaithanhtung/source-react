import { init, RematchDispatch, RematchRootState, RematchStore } from '@rematch/core';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// import LogRocket from 'logrocket';

import history from './history';
import { RootModel, models } from './models';
import { ENV_PRODUCTION } from '../commons/constants';

const router = routerMiddleware(history);
const middlewares = [router, thunk];

export const store = init({
  models,
  redux: {
    reducers: {
      router: connectRouter(history),
    },
    devtoolOptions: {
      realtime: true,
      name: 'Clik Hub',
      disabled: !!ENV_PRODUCTION,
    },
    middlewares,
  },
});

export type Store = RematchStore<RootModel>;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
