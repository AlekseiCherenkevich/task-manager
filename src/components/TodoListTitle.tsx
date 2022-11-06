import React from "react";

type TodoListTitlePropsType = {
    todoTitle: string
}

export const TodoListTitle: React.FC<TodoListTitlePropsType> = ({todoTitle}) => {
    return <h3>{todoTitle}</h3>
}