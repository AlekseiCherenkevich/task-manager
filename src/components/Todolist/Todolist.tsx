import React, {useState} from 'react';
import {FilterValuesType, SortValuesType} from "../../store/todolists-reducer";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {TasksType} from "../../store/tasks-reducer";
import { Task } from './Task/Task';
import Input from "../common/Input/Input";

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    filter: FilterValuesType
    sort: SortValuesType
    removeTodolist: (todolistId: string) => void
    addNewTask: (taskTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {todolistId, todolistTitle, filter, sort, removeTodolist, addNewTask} = props
    const tasks = useSelector<rootReducerType, TasksType>(state => state.tasks)

    const [taskTitle, setTaskTitle] = useState('')

    const removeTodolistHandler = () => removeTodolist(todolistId)
    const addNewTaskClick = () => addNewTask(taskTitle)

    return <div>
        <div>
            <h3>{todolistTitle}</h3>
            <button onClick={removeTodolistHandler}>-</button>
        </div>
        <div>
            <Input value={taskTitle} onKeyPress={addNewTask} onChange={setTaskTitle}/>
            <button onClick={addNewTaskClick}>+</button>
        </div>
        <div>
            <button>Default</button>
            <button>A-z</button>
            <button>Z-a</button>
        </div>
        <div>
            {tasks[todolistId].map(t => {
                return <Task key={t.id} taskTitle={t.title} isDone={t.isDone}/>
            })}
        </div>
        <div>
            <button>All</button>
            <button>Completed</button>
            <button>Active</button>
        </div>
    </div>
}

