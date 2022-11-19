import React from "react";
import {Button} from "../../common/Button/Button";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";

type TodoListTitlePropsType = {
    todoTitle: string
    onRemoveTodoListHandler: () => void
    changeTodoTitleValue: (title: string) => void
}

export const TodoListTitle: React.FC<TodoListTitlePropsType> = (props) => {
    const {todoTitle, onRemoveTodoListHandler, changeTodoTitleValue} = props
    return <div><EditableSpan value={todoTitle}
                             callback={changeTodoTitleValue}
    />
        <Button onClick={onRemoveTodoListHandler}>x</Button>
    </div>
}



