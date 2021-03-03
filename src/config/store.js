import { createStore } from "redux";
import followeesReducer from '../reducers/followees'
import { persistStore } from "redux-persist";
import rootReducer from '../reducers'

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);

export default { store, persistor };