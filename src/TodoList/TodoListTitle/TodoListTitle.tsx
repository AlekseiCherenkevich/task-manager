import React from "react";
import {Button} from "../../common/Button/Button";

type TodoListTitlePropsType = {
    todoTitle: string
    onRemoveTodoListHandler: () => void
}

export const TodoListTitle: React.FC<TodoListTitlePropsType> = ({todoTitle, onRemoveTodoListHandler}) => {
    return <h3>{todoTitle}
        <Button onClick={onRemoveTodoListHandler}>x</Button>
    </h3>
}