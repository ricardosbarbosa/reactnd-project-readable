import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import devToolsEnhancer from 'remote-redux-devtools';
import api from '../utils/Api'
import rootReducer from '../reducers'
// const store = createStore(
//   reducer,
//   composeEnhancers(
//     applyMiddleware(logger)
//   )
// )

// const store = createStore(reducer, preloadedState, compose(
//   applyMiddleware(...middleware),
//   // other store enhancers if any
// ));

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      // applyMiddleware(thunk, api, createLogger()),
      applyMiddleware(thunk, createLogger()),
      devToolsEnhancer()
    )
  )

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers').default
  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}

export default configureStore