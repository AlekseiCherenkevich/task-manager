import React, {ChangeEvent} from 'react';
import {TaskType} from "../App";
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
}

export const Todolist: React.FC<TodoListPropsType>  = (props)=> {
    const onRemoveTodoListHandler = () => props.removeTodoList(props.todoListID)


    return <div>
        <h3>{props.todoTitle}
            <Button title={'x'} callback={onRemoveTodoListHandler}/>
        </h3>
        <div>
            <Input callback={props.addNewTask(props.todoListID)}/>

        </div>
        <div>
            <button >Default</button>
            <button >A-z</button>
            <button >Z-a</button>
        </div>
        <ul>
            {props.tasks.map(t=>{
                const onRemoveTaskHandler = () => props.removeTask(props.todoListID, t.id)
                const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListID, t.id, e.currentTarget.checked)

                return <li key={t.id}>

                    <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatus}/>
                    <span>{t.title}</span>
                    <Button title={'x'} callback={onRemoveTaskHandler}/>
                </li>
            })}
        </ul>
        <div>
            <button >All</button>
            <button >Active</button>
            <button >Completed</button>
        </div>
    </div>
}



