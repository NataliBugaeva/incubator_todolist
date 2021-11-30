import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./Todolist";
import {EditableSpan} from "./EditableSpan";
import {Button} from "@mui/material";

export type TaskPropsType = {
    todolistId: string,
    task: TaskType,
    removeTask: (taskId: string, todolistId: string) => void,
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void,
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void,
}

const Task = React.memo(({todolistId, task, removeTask, changeTaskStatus, changeTaskTitle}: TaskPropsType) => {

    console.log('Task');

    const onClickHandler = useCallback(() => {
        removeTask(task.id, todolistId)
    }, [removeTask, task.id, todolistId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue, todolistId);
    }, [changeTaskStatus, task.id, todolistId])


    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
    },[changeTaskTitle, todolistId])


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

export default Task;
