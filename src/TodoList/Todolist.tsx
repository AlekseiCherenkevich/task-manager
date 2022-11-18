import React from 'react';
import {TaskType} from "../App";
import {Input} from "../common/Input/Input";

type TodoListPropsType = {
    todoListID: string
    todoTitle: string
    tasks: TaskType[]
    addNewTask: (todoListID: string) => (taskTitle: string) => void
}

export const Todolist: React.FC<TodoListPropsType>  = (props)=> {


    return <div>
        <h3>{props.todoTitle}
            <button >x</button>
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
            {props.tasks.map(t=><li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button>x</button>
            </li>)}
        </ul>
        <div>
            <button >All</button>
            <button >Active</button>
            <button >Completed</button>
        </div>
    </div>
}



