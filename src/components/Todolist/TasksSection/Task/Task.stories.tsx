import {Task} from "./Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../../../../stories/decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import {TaskType} from "../../../../store/tasks-reducer";


export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>

const TaskContainer = () => {
    const task = useSelector<AppStateType, TaskType>(state => state.tasks['1'][0])
    return <Task todolistId={'1'} {...task} />
}

const Template: ComponentStory<typeof Task> = () => <TaskContainer/>

export const TaskHistory = Template.bind({})

