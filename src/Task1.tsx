import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./Todolist";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {changeStatusAC, changeTaskTitleAC, removeTaskAC} from "./redux/TaskReducer";

export type Task1PropsType = {
    todolistId: string,
    task: TaskType,
}

const Task1 = React.memo(({todolistId, task}: Task1PropsType) => {

    console.log('Task1');

    let dispatch = useDispatch();

    const onClickHandler = useCallback(() => {
        let action = removeTaskAC(task.id, todolistId);
        dispatch(action);
    }, [dispatch, task.id, todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        let action = changeStatusAC(task.id, newIsDoneValue, todolistId);
        dispatch(action);
    }, [dispatch, task.id, todolistId]);


    const onTitleChangeHandler = useCallback((newValue: string) => {
        let action = changeTaskTitleAC(task.id, newValue, todolistId);
        dispatch(action);
    },[dispatch, task.id, todolistId])


    return (
        <li key={task.id} className={task.isDone ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={task.isDone}/>
            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <Button style={{
                maxWidth: '30px',
                maxHeight: '30px',
                minWidth: '30px',
                minHeight: '30px',
                margin: '5px',

            }}
                    variant={'contained'} size={'small'} onClick={onClickHandler}>x</Button>
        </li>
    )
})

export default Task1;
