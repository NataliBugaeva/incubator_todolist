import {combineReducers, createStore} from "redux";
import {TaskReducer} from "./TaskReducer";
import {TodoListReducer} from "./TodoListReducer";

const rootReducer = combineReducers({
    tasks: TaskReducer,
    todolists: TodoListReducer,
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
