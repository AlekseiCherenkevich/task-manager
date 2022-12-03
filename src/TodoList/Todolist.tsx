import React from 'react';
import {FilterValuesType, SortValuesType, TaskType} from "../App";
import {Input} from "../common/Input/Input";
import {TodoListTitle} from "./TodoListTitle/TodoListTitle";
import {SortingButtons} from "./SortingButtons/SortingButtons";
import {FilteringButtons} from "./FilteringButtons/FilteringButtons";
import {Tasks} from "./Tasks/Tasks";
import Typography from '@mui/material/Typography';

type TodoListPropsType = {
    todoTitle: string
    tasks: TaskType[]
    filter: FilterValuesType
    sort: SortValuesType
    addNewTask: (taskTitle: string) => void
    removeTodoList: () => void
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
    changeFilterValue: (filterValue: FilterValuesType) => void
    changeSortValue: (sort: SortValuesType) => void
    changeTodoTitleValue: (title: string) => void
    changeTaskTitle: (taskID: string) => (taskTitle: string) => void
}

export const Todolist: React.FC<TodoListPropsType>  = (props)=> {
    const {todoTitle,
        tasks,
        filter,
        sort,
        addNewTask,
        removeTodoList,
        removeTask,
        changeTaskStatus,
        changeFilterValue,
        changeSortValue,
        changeTodoTitleValue,
        changeTaskTitle} = props

    const onRemoveTodoListHandler = () => removeTodoList()
    const onChangeFilterHandler = (filter: FilterValuesType) => () => changeFilterValue(filter)
    const onChangeSortHandler = (sort: SortValuesType) => () => changeSortValue(sort)

    return <div>
        <TodoListTitle todoTitle={todoTitle}
                       onRemoveTodoListHandler={onRemoveTodoListHandler}
                       changeTodoTitleValue={changeTodoTitleValue}
        />
        <div>
            <Input callback={addNewTask}/>
        </div>
        <SortingButtons sort={sort} onChangeSortHandler={onChangeSortHandler}/>
        {tasks.length
            ? <Tasks tasks={tasks} removeTask={removeTask} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
            : <Typography style={{minHeight: '90px', textAlign: 'center', paddingTop: '10px'}}>Tasks not found</Typography>
        }
        <FilteringButtons filter={filter} onChangeFilterHandler={onChangeFilterHandler}/>
    </div>
}












