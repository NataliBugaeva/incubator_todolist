import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Delete} from "@mui/icons-material";
import Task from "./Task";
import Task1 from "./Task1";

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

export const Todolist = React.memo((props: PropsType) => {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),
        [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),
        [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),
        [props.changeFilter, props.id]);


    // //по клику на кнопку удаляем таску
    // const onClickHandler = useCallback((taskId: string) => {
    //     props.removeTask(taskId, props.id)
    // }, [props.removeTask, props.id])
    //
    // //меняем таску на чекнутую и обратно
    // const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>, taskId: string) => {
    //     let newIsDoneValue = e.currentTarget.checked;
    //     props.changeTaskStatus(taskId, newIsDoneValue, props.id);
    // }, [props.changeTaskStatus, props.id])
    //
    // //Меняем наименование таски
    // const onTitleChangeHandler = useCallback((taskId: string, newValue: string) => {
    //     props.changeTaskTitle(taskId, newValue, props.id);
    // }, [props.changeTaskTitle, props.id])


    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
        /*tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);*/
    }
    if (props.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
        /* tasksForTodolist = allTodolistTasks.filter(t => t.isDone);*/
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
                // tasksForTodolist.map(t => <Task key={t.id}
                //                                 todolistId={props.id}
                //                                 task={t}
                //                                 changeTaskStatus={props.changeTaskStatus}
                //                                 removeTask={props.removeTask}
                //                                 changeTaskTitle={props.changeTaskTitle}/>)

                tasksForTodolist.map(t => <Task1 key={t.id} task={t} todolistId={props.id}/>)

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
        </div>
    </div>
})


