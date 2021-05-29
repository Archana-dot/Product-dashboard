import { createStore, combineReducers } from "redux";
import addCard from './reducer/AddCard';

const appReducers = combineReducers(
    {
        addCard
    }
);
const store = createStore(appReducers);
export default store;