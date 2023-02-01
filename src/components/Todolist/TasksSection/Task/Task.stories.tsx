import {Task} from "./Task";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {ReduxStoreProviderDecorator} from "../../../../stories/decorators/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../store/store";
import { TaskType } from "../../../../api/api";


export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>

const TaskContainer = () => {
    const tasks = useSelector<AppStateType, TaskType[]>(state => state.tasks['1'])
    const task = tasks.find(t=>t.id==='x1')
    return task ? <Task task={task} /> : <div>Task was deleted</div>
}

const Template: ComponentStory<typeof Task> = () => <TaskContainer/>

export const TaskStory = Template.bind({})

