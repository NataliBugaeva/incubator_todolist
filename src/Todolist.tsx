import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import {debug} from "util";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    //по клику на кнопку удаляем таску
    const onClickHandler = (taskId: string) => {
        props.removeTask(taskId, props.id)
    }

    //меняем таску на чекнутую и обратно
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(taskId, newIsDoneValue, props.id);
    }

    //Меняем наименование таски
    const onTitleChangeHandler = (taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    }


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            {/* <button onClick={removeTodolist}>x</button>*/}
            <IconButton aria-label={"delete"} onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={(e) => onChangeHandler(e, t.id)} checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={(newValue) => onTitleChangeHandler(t.id, newValue)}/>
                        {/*<button onClick={() => onClickHandler(t.id)}>x</button>*/}
                        <Button style={{
                            maxWidth: '30px',
                            maxHeight: '30px',
                            minWidth: '30px',
                            minHeight: '30px',
                            margin: '5px',

                        }}
                                variant={'contained'} size={'small'} onClick={() => onClickHandler(t.id)}>x</Button>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    color={'success'}
                    onClick={onAllClickHandler}
                    style={{margin: '3px'}}>All</Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    color={'error'}
                    onClick={onActiveClickHandler}
                    style={{margin: '3px'}}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    color={'primary'}
                    onClick={onCompletedClickHandler}
                    style={{margin: '3px'}}>Completed</Button>

            {/*<button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>*/}
        </div>
    </div>
}


