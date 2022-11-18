import React from 'react';
import {TaskType} from "../App";

type TodoListPropsType = {
    todoTitle: string
    tasks: TaskType[]
}

export const Todolist: React.FC<TodoListPropsType>  = (props)=> {


    return <div>
        <h3>{props.todoTitle}
            <button >x</button>
        </h3>
        <div>
            <input/>
            <button >+</button>

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


