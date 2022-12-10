import React from "react";
import styled from "styled-components";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

type TodolistTitlePropsType = {
    todolistTitle: string
    changeTodolistTitle: (todolistTitle: string) => void
    removeTodolist: () => void
}

export const TodolistTitle: React.FC<TodolistTitlePropsType> = ({todolistTitle, changeTodolistTitle, removeTodolist}) => {
    return <TodolistTitleStyle>
        <EditableSpan isTodolistTitle={true} value={todolistTitle} callback={changeTodolistTitle}/>
        <IconButton onClick={removeTodolist} color={'error'}><DeleteIcon/></IconButton>
    </TodolistTitleStyle>
}

const TodolistTitleStyle = styled.div`
  display: flex;
  justify-content: center;
`