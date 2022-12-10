import React from 'react';
import {FilterValuesType, SortValuesType} from "../../store/todolists-reducer";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {TasksType} from "../../store/tasks-reducer";
import {Task} from './Task/Task';
import Input from "../common/Input/Input";

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    filter: FilterValuesType
    sort: SortValuesType
    removeTodolist: (todolistId: string) => void
    addNewTask: (taskTitle: string) => void
    removeTask: (taskId: string) => () => void
    changeFilter: (filter: FilterValuesType) => () => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const {todolistId, todolistTitle, filter, sort, removeTodolist, addNewTask, removeTask, changeFilter} = props
    const tasks = useSelector<rootReducerType, TasksType>(state => state.tasks)

    const removeTodolistHandler = () => removeTodolist(todolistId)

    let filteredTasks = tasks[todolistId]

    if (filter === "active") {
        filteredTasks = tasks[todolistId].filter(t=>!t.isDone)
    }
    if (filter === "completed") {
        filteredTasks = tasks[todolistId].filter(t=>t.isDone)
    }

    return <div>
        <div>
            <h3>{todolistTitle}</h3>
            <button onClick={removeTodolistHandler}>-</button>
        </div>
        <div>
            <Input callback={addNewTask} />
        </div>
        <div>
            <button>Default</button>
            <button>A-z</button>
            <button>Z-a</button>
        </div>
        <div>
            {filteredTasks.map(t => {
                return <Task key={t.id} taskTitle={t.title} isDone={t.isDone} removeTask={removeTask(t.id)}/>
            })}
        </div>
        <div>
            <button onClick={changeFilter("all")}>All</button>
            <button onClick={changeFilter("completed")}>Completed</button>
            <button onClick={changeFilter("active")}>Active</button>
        </div>
    </div>
}

