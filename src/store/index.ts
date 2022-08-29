import createSagaMiddleware from 'redux-saga';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducer from './reducers';
import rootSaga from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

// const enhancers = composeWithDevTools(
//   applyMiddleware(...middleware)
// )
// const debounceNotify = _.debounce(notify => notify());

export const Store = configureStore({
  reducer,
  middleware,
  // enhancers: [batchedSubscribe(debounceNotify)],
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof Store.dispatch;
// export type RootState = ReturnType<typeof Store.getState>;
