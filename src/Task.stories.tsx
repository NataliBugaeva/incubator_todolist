import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';


import {action} from "@storybook/addon-actions";
import Task from "./Task";
import {TaskType} from "./Todolist";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    args: {
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle')
    }
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = () => {
    const [task, setTask] = useState({id: '122', isDone: true, title: 'JS'});
    const changeTaskStatus = () => setTask({id: '122', isDone: !task.isDone, title: 'JS'});

    return <Task
        todolistId='1'
        task={task}
        removeTask={action('removeTask')}
        changeTaskStatus={changeTaskStatus}
        changeTaskTitle={action('changeTaskTitle')}
    />
};

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
    todolistId: '1',
    task: {id: '122', isDone: true, title: 'JS'}
}

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    todolistId: '1',
    task: {id: '122', isDone: false, title: 'JS'}
};
