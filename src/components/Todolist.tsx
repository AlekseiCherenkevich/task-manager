import {FC, memo, useCallback, useEffect} from 'react';
import {addNewTask, TasksType} from "../store/tasks-reducer";
import {FilterValuesType, SortValuesType} from "../store/todolists-reducer";
import {AddItemForm} from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import {FilteringButtonsGroup} from './FilteringButtonsGroup';
import {SortingButtonsGroup} from "./SortingButtonsGroup";
import {TodolistTitleSection} from "./TodolistTitleSection";
import {TasksSection} from "./TasksSection";

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    sort: SortValuesType
}

export const Todolist: FC<TodolistPropsType> = memo(({id, title, filter, sort}) => {
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
        filteredSortedTasks = filteredSortedTasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        filteredSortedTasks = filteredSortedTasks.filter(t => t.isDone)
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
        <TasksSection filteredSortedTasks={filteredSortedTasks} id={id}/>
        <FilteringButtonsGroup filter={filter} id={id}/>
    </div>
});



