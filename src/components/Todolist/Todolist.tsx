import {FC, memo, useCallback, useEffect} from 'react';
import {addNewTaskAC, TaskStatuses, TasksType} from "../../store/tasks-reducer";
import {TodolistEntityType} from "../../store/todolists-reducer";
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {useAppDispatch, useAppSelector} from "../../store/store";
import {FilteringButtonsGroup} from './FilteringButtonsGroup/FilteringButtonsGroup';
import {SortingButtonsGroup} from "./SortingButtonsGroup/SortingButtonsGroup";
import {TodolistTitleSection} from "./TodolistTitleSection/TodolistTitleSection";
import {TasksSection} from "./TasksSection/TasksSection";


export const Todolist: FC<TodolistEntityType> = memo(({id, title, filter, sort}) => {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector<TasksType>(state => state.tasks)

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addNewTask = useCallback((taskTitle: string) => {
        dispatch(addNewTaskAC(id, taskTitle))
    }, [dispatch, id])

    let filteredSortedTasks = tasks[id]

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
});



