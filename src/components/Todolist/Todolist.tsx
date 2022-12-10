import React, {useEffect, useMemo} from 'react';
import {FilterValuesType, SortValuesType} from "../../store/todolists-reducer";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {TasksType} from "../../store/tasks-reducer";
import {Task} from './Task/Task';
import Input from "../common/Input/Input";
import {EditableSpan} from '../common/EditableSpan/EditableSpan';

type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    filter: FilterValuesType
    sort: SortValuesType
    removeTodolist: () => void
    addNewTask: (taskTitle: string) => void
    removeTask: (taskId: string) => () => void
    changeFilter: (filter: FilterValuesType) => () => void
    changeSort: (sort: SortValuesType) => () => void
    changeTaskStatus: (taskId: string) => (taskStatus: boolean) => void
    changeTodolistTitle: (todolistTitle: string) => void
    changeTaskTitle: (taskId: string) => (taskTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {
        todolistId,
        todolistTitle,
        filter,
        sort,
        removeTodolist,
        addNewTask,
        removeTask,
        changeFilter,
        changeSort,
        changeTaskStatus,
        changeTodolistTitle,
        changeTaskTitle
    } = props
    const tasks = useSelector<rootReducerType, TasksType>(state => state.tasks)

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])


    const filteredSortedTasks = useMemo(() => {
        let filteredTasks = tasks[todolistId]
        if (filter === "active") {
            filteredTasks = tasks[todolistId].filter(t => !t.isDone)
        }
        if (filter === "completed") {
            filteredTasks = tasks[todolistId].filter(t => t.isDone)
        }
        let sortedTasks = filteredTasks
        if (sort === "A-z") {
            sortedTasks = [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
        }
        if (sort === "z-A") {
            sortedTasks = [...filteredTasks].sort((a, b) => b.title.localeCompare(a.title))
        }
        return sortedTasks
    }, [tasks, filter, sort, todolistId])

    return <div>
        <div>
            <EditableSpan value={todolistTitle} callback={changeTodolistTitle}/>
            <button onClick={removeTodolist}>-</button>
        </div>
        <div>
            <Input callback={addNewTask}/>
        </div>
        <div>
            <button onClick={changeSort("default")}>Default</button>
            <button onClick={changeSort("A-z")}>A-z</button>
            <button onClick={changeSort("z-A")}>Z-a</button>
        </div>
        <div>
            {filteredSortedTasks.map(t => {
                return <Task key={t.id}
                             taskTitle={t.title}
                             isDone={t.isDone}
                             removeTask={removeTask(t.id)}
                             changeTaskStatus={changeTaskStatus(t.id)}
                             changeTaskTitle={changeTaskTitle(t.id)}
                />
            })}
        </div>
        <div>
            <button onClick={changeFilter("all")}>All</button>
            <button onClick={changeFilter("completed")}>Completed</button>
            <button onClick={changeFilter("active")}>Active</button>
        </div>
    </div>
}



