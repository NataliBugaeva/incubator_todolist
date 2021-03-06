import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';


import {action} from "@storybook/addon-actions";
import AppWithRedux from "./AppWithRedux";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import {ReduxStoreProviderDecorator} from "./redux/Redux.StoreProviderDecoration";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    args: {},
    decorators: [ReduxStoreProviderDecorator]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux/>


export const AppWithReduxStory = Template.bind({});

AppWithReduxStory.args = {}

