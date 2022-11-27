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
    return <div style={{display: 'flex', justifyContent: "center", width: '100%', fontSize: '20px', fontWeight: "bold"}}>
        <EditableSpan value={todoTitle}
                      callback={changeTodoTitleValue}
        />
        <IconButton
            aria-label="delete"
            size="medium"
            onClick={onRemoveTodoListHandler}
            style={{transform: 'translateY(-13%)'}}
        >
            <DeleteIcon fontSize="inherit" color="error"/>
        </IconButton>
    </div>
}



