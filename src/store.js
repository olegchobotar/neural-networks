import { createStore } from 'redux';
import { loadState, saveState} from './localStorage';
import rootReducer from './reducers';

const initialState = loadState();

const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;
