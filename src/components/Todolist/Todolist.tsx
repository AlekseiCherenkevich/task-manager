import React, {useEffect, useMemo} from 'react';
import {FilterValuesType, SortValuesType} from "../../store/todolists-reducer";
import {useSelector} from "react-redux";
import {rootReducerType} from "../../store/store";
import {TasksType} from "../../store/tasks-reducer";
import {Tasks} from "./Tasks/Tasks";
import {SortingButtons} from './SortingButtons/SortingButtons';
import {FilteringButtons} from './FilteringButtons/FilteringButtons';
import {TodolistTitle} from './TodolistTitle/TodolistTitle';
import {TaskInput} from './TaskInput/TaskInput';

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
        <TodolistTitle
            todolistTitle={todolistTitle}
            changeTodolistTitle={changeTodolistTitle}
            removeTodolist={removeTodolist}
        />
        <TaskInput addNewTask={addNewTask}/>
        <SortingButtons changeSort={changeSort}/>
        <Tasks tasks={filteredSortedTasks}
               removeTask={removeTask}
               changeTaskStatus={changeTaskStatus}
               changeTaskTitle={changeTaskTitle}/>
        <FilteringButtons changeFilter={changeFilter}/>
    </div>
}













