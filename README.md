# recost-persist
Recost middleware to persist application state into localstorage on state changes

## Instalation

`npm install --save recost-persist`

## Usage

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import initContext, { Provider } from 'recost'
import { persister, reloadPersistedState } from 'recost-persist'
import reducer from './reducer'

// define the initial state for the application
const initialState = {
  // ...
}

const STATE_KEY = 'APP_STATE'

// get the stored application state
let state = reloadPersistedState(STATE_KEY, initialState)

/*
 * inicialize the context with the obtained state
 * add the persister middleware with a STATE_KEY
*/
initContext(state, reducer, [persister(STATE_KEY)])

// and just render :)
ReactDOM.render(
  <Provider>
    <App/>
  </Provider>,
  document.getElementById('root')
);
```
