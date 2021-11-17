import { v1 } from "uuid";
import {FilterValuesType, TodolistType} from "../App";

const initialState: Array<TodolistType> = [];

export const TodoListReducer = (state: Array<TodolistType> = initialState, action: GeneralActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'FILTER_TASKS': {
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.value} : el);
        }
        case 'ADD-NEW-TODOLIST': {
            return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.todolistId);
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el);
        }
        default:
            return state;
    }
}

export type TodoListReducerType = typeof TodoListReducer;

export type GeneralActionType = FilterTaskACType
    | AddNewTodolistACType
    | RemoveTodolistACType
    | ChangeTodolistTitleACType;


export type FilterTaskACType = ReturnType<typeof filterTaskAC>
export type AddNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const filterTaskAC = (value: FilterValuesType, todolistId: string) =>
    ({type: 'FILTER_TASKS', value, todolistId} as const);
//раньше еще айдишку передавала сюда
export const addNewTodolistAC = ( title: string) =>
    ({type: 'ADD-NEW-TODOLIST', title, todolistId: v1()} as const);
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', todolistId} as const);
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title}as const);
