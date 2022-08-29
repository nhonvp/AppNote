import React, {type PropsWithChildren} from 'react';
import Router from 'navigation/Router';
import { Provider } from 'react-redux';
import { Store } from 'store';
const App = () => {
  return (
    <Provider store={Store}>
      <Router/> 
    </Provider>   
  );
};

export default App;
