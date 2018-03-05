import { createStore, combineReducers } from 'redux';
import anecdoteReducer, {
    initializeAnecdotes,
} from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import anecdotes from './services/anecdotes';

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer,
});

const store = createStore(reducer);

anecdotes.getAll().then(anecdotes => {
    store.dispatch(initializeAnecdotes(anecdotes));
});

export default store;
