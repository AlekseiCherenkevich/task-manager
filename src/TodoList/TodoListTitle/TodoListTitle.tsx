import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
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
        <IconButton aria-label="delete" size="small" onClick={onRemoveTodoListHandler}>
            <DeleteIcon fontSize="inherit" color="primary"/>
        </IconButton>
    </div>
}



