import {FC, memo, useCallback, useEffect} from 'react';
import {createTaskTC, fetchTasksTC, TaskStatuses} from "../../store/tasks-reducer";
import {TodolistEntityType} from "../../store/todolists-reducer";
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {FilteringButtonsGroup} from './FilteringButtonsGroup/FilteringButtonsGroup';
import {SortingButtonsGroup} from "./SortingButtonsGroup/SortingButtonsGroup";
import {TodolistTitleSection} from "./TodolistTitleSection/TodolistTitleSection";
import {TasksSection} from "./TasksSection/TasksSection";
import {TaskType} from "../../api/api";


export const Todolist: FC<TodolistEntityType> = memo(({id, title, filter, sort}) => {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[id])

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [])

    const addNewTask = useCallback((taskTitle: string) => {
        dispatch(createTaskTC(id, taskTitle))
    }, [dispatch, id])

    let filteredSortedTasks = tasks

    if (filter === "active") {
        filteredSortedTasks = filteredSortedTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === "completed") {
        filteredSortedTasks = filteredSortedTasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (sort === "A-z") {
        filteredSortedTasks = [...filteredSortedTasks].sort((a, b) => a.title.localeCompare(b.title))
    }
    if (sort === "z-A") {
        filteredSortedTasks = [...filteredSortedTasks].sort((a, b) => b.title.localeCompare(a.title))
    }

    return <div key={id}>
        <div>
            <TodolistTitleSection id={id} title={title} />
            <AddItemForm onClick={addNewTask} placeholder={'Enter task'}/>
        </div>
        <SortingButtonsGroup sort={sort} id={id}/>
        <TasksSection filteredSortedTasks={filteredSortedTasks}/>
        <FilteringButtonsGroup filter={filter} id={id}/>
    </div>
})



