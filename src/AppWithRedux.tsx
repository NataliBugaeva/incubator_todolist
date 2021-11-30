import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
    // addNewTodolistInTasksAC,
    addTaskAC,
    changeStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    //removeTodolistTasksAC,
    TaskReducer,
    TaskReducerType
} from "./redux/TaskReducer";
import {
    addNewTodolistAC,
    //  addNewTodolistInTodolistAC,
    changeTodolistTitleAC,
    filterTaskAC,
    removeTodolistAC,
    TodoListReducer,
    TodoListReducerType
} from "./redux/TodoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const dispatch = useDispatch();

    //WWW удаление таски из тудулиста
    const removeTask = useCallback((id: string, todolistId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
        dispatch(removeTaskAC(id, todolistId));
    }, [dispatch])

    //WWW добавляем таску в тудулист
    const addTask = useCallback((title: string, todolistId: string) => {
        // setTasks({...tasks, [todolistId]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistId]]})
        dispatch(addTaskAC(title, todolistId));
    }, [dispatch])

    //WWW делаем таску чекнутой либо нет
    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone} : el)})
        dispatch(changeStatusAC(id, isDone, todolistId));
    }, [dispatch])

    //WWW по двойному щелчку на наименование таски можем корректировать его
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: newTitle} : el)})
        dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    }, [dispatch])

    //WWW по нажатию одной из кнопок(под каждым тудулистом) фильтруем наши таски
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        // setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
        dispatch(filterTaskAC(value, todolistId));
    }, [dispatch])

    //WWW создаем новый тудулист
    const addTodolist = useCallback((title: string) => {
        // let newTodoListId = v1();
        //setTodolists([{id: newTodoListId, title, filter: 'all'}, ...todolists]);
        // setTasks({[newTodoListId]: [], ...tasks})

        let action = addNewTodolistAC(title);
        dispatch(action);
    }, [dispatch])

    //WWW удаляем тудулист
    //еще нужно почистить таски этого тудулиста
    const removeTodolist = useCallback((id: string) => {
        let action = removeTodolistAC(id);
        dispatch(action);
    }, [dispatch])

    //меняем наименование тудулиста по двойному щелчку
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        // setTodolists(todolists.map(el => el.id === id ? {...el, title} : el))
        dispatch(changeTodolistTitleAC(id, title));
    }, [dispatch])

    return (
        <div className="App">

            <Box sx={{flexGrow: 1}} style={{width: '100%'}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={7}>
                    {
                        todolists.map(tl => {
                            /*let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;*/

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px', marginTop: '25px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux;
