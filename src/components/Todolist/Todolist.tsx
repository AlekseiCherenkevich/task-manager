import {FC, memo, useCallback, useEffect} from 'react';
import {addNewTask, TaskStatuses, TasksType} from "../../store/tasks-reducer";
import {TodolistEntityType} from "../../store/todolists-reducer";
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {FilteringButtonsGroup} from './FilteringButtonsGroup/FilteringButtonsGroup';
import {SortingButtonsGroup} from "./SortingButtonsGroup/SortingButtonsGroup";
import {TodolistTitleSection} from "./TodolistTitleSection/TodolistTitleSection";
import {TasksSection} from "./TasksSection/TasksSection";


export const Todolist: FC<TodolistEntityType> = memo(({id, title, filter, sort}) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    const addNewTaskHandler = useCallback((taskTitle: string) => {
        dispatch(addNewTask(id, taskTitle))
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
            <AddItemForm onClick={addNewTaskHandler} placeholder={'Enter task'}/>
        </div>
        <SortingButtonsGroup sort={sort} id={id}/>
        <TasksSection filteredSortedTasks={filteredSortedTasks}/>
        <FilteringButtonsGroup filter={filter} id={id}/>
    </div>
});



