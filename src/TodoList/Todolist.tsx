import React, {ChangeEvent} from 'react';
import {FilterValuesType, SortValuesType, TaskType} from "../App";
import {Input} from "../common/Input/Input";
import {Button} from "../common/Button/Button";

type TodoListPropsType = {
    todoListID: string
    todoTitle: string
    tasks: TaskType[]
    addNewTask: (todoListID: string) => (taskTitle: string) => void
    removeTodoList: (todoListID: string) => void
    removeTask: (todoListID: string, taskID: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    changeFilterValue: (todoListID: string, filterValue: FilterValuesType) => void
    changeSortValue: (sort: SortValuesType) => void
}

export const Todolist: React.FC<TodoListPropsType>  = (props)=> {
    const onRemoveTodoListHandler = () => props.removeTodoList(props.todoListID)
    const onChangeFilterHandler = (filter: FilterValuesType) => () => props.changeFilterValue(props.todoListID, filter)
    const onChangeSortHandler = (sort: SortValuesType) => () => props.changeSortValue(sort)

    return <div>
        <h3>{props.todoTitle}
            <Button onClick={onRemoveTodoListHandler}>x</Button>
        </h3>
        <div>
            <Input callback={props.addNewTask(props.todoListID)}/>

        </div>
        <div>
            <button onClick={onChangeSortHandler("default")}>Default</button>
            <button onClick={onChangeSortHandler("A-z")}>A-z</button>
            <button onClick={onChangeSortHandler("Z-a")}>Z-a</button>
        </div>
        <ul>
            {props.tasks.map(t=>{
                const onRemoveTaskHandler = () => props.removeTask(props.todoListID, t.id)
                const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked)

                return <li key={t.id}>

                    <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatus}/>
                    <span>{t.title}</span>
                    <Button onClick={onRemoveTaskHandler}>x</Button>
                </li>
            })}
        </ul>
        <div>
            <Button onClick={onChangeFilterHandler('all')}>All</Button>
            <Button onClick={onChangeFilterHandler('active')}>Active</Button>
            <Button onClick={onChangeFilterHandler('completed')}>Completed</Button>
        </div>
    </div>
}



