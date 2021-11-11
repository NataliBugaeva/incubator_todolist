import {TaskType} from "../Todolist";
import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddNewTodolistACType, RemoveTodolistACType} from "./TodoListReducer";

export const TaskReducer = (state: TasksStateType, action: GeneralActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.id)};
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.id ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            }
        }
        case 'CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.id ? {
                    ...el,
                    title: action.newTitle
                } : el)
            }
        }
        case 'ADD-NEW-TODOLIST': {
           return {...state, [action.todolistId]: []}
        }
        /*case 'ADD-NEW-TODOLIST-IN-TASKS': {
            return {[action.todolistId]: [], ...state}
        }*/
        //здесь использовала action creator из тудулист редьюсера
        case 'REMOVE-TODOLIST': {
            let copyState = {...state};
            delete copyState[action.todolistId];
            return copyState;
        }
        default:
            return state
    }
}

export type TaskReducerType = typeof TaskReducer;

export type GeneralActionType = removeTaskACType
    | addTaskACType
    | changeStatusACType
    | changeTaskTitleACType
    //   | addNewTodolistInTasksACType
    | RemoveTodolistACType
    | AddNewTodolistACType
//  | removeTodolistTasksACType;

export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeStatusACType = ReturnType<typeof changeStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
//export type addNewTodolistInTasksACType = ReturnType<typeof addNewTodolistInTasksAC>

//export type removeTodolistTasksACType = ReturnType<typeof removeTodolistTasksAC>

export const removeTaskAC = (id: string, todolistId: string) => ({type: 'REMOVE-TASK', id, todolistId} as const);
export const addTaskAC = (title: string, todolistId: string) => ({type: 'ADD-TASK', title, todolistId} as const);
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', id, isDone, todolistId} as const);
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) =>
    ({type: 'CHANGE_TASK_TITLE', id, newTitle, todolistId} as const);
/*export const addNewTodolistInTasksAC = (todolistId: string) =>
    ({type: 'ADD-NEW-TODOLIST-IN-TASKS', todolistId} as const);*/

