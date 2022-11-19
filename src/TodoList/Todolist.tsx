import React from 'react';
import {FilterValuesType, SortValuesType, TaskType} from "../App";
import {Input} from "../common/Input/Input";
import {TodoListTitle} from "./TodoListTitle/TodoListTitle";
import {SortingButtons} from "./SortingButtons/SortingButtons";
import {FilteringButtons} from "./FilteringButtons/FilteringButtons";
import {Tasks} from "./Tasks/Tasks";

type TodoListPropsType = {
    todoTitle: string
    tasks: TaskType[]
    addNewTask: (taskTitle: string) => void
    removeTodoList: () => void
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeFilterValue: (filterValue: FilterValuesType) => void
    changeSortValue: (sort: SortValuesType) => void
}

export const Todolist: React.FC<TodoListPropsType>  = (props)=> {
    const {todoTitle,
        tasks,
        addNewTask,
        removeTodoList,
        removeTask,
        changeTaskStatus,
        changeFilterValue,
        changeSortValue} = props
    const onRemoveTodoListHandler = () => removeTodoList()
    const onChangeFilterHandler = (filter: FilterValuesType) => () => changeFilterValue(filter)
    const onChangeSortHandler = (sort: SortValuesType) => () => changeSortValue(sort)

    return <div>
        <TodoListTitle todoTitle={todoTitle} onRemoveTodoListHandler={onRemoveTodoListHandler}/>
        <div>
            <Input callback={addNewTask}/>
        </div>
        <SortingButtons onChangeSortHandler={onChangeSortHandler}/>
        <Tasks tasks={tasks} removeTask={removeTask} changeTaskStatus={changeTaskStatus}/>
        <FilteringButtons onChangeFilterHandler={onChangeFilterHandler}/>
    </div>
}












