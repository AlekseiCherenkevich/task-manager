import React from "react";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";

type TodolistTitlePropsType = {
    todolistTitle: string
    changeTodolistTitle: (todolistTitle: string) => void
    removeTodolist: () => void
}

export const TodolistTitle: React.FC<TodolistTitlePropsType> = ({todolistTitle, changeTodolistTitle, removeTodolist}) => {
    return <div>
        <EditableSpan value={todolistTitle} callback={changeTodolistTitle}/>
        <button onClick={removeTodolist}>-</button>
    </div>
}