import {FC, memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTodolistTitle, removeTodolist} from "../store/todolists-reducer";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type TodolistTitleSectionPropsType = {
    id: string
    title: string
}
export const TodolistTitleSection: FC<TodolistTitleSectionPropsType> = memo(({title, id}) => {
    const dispatch = useDispatch()
    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolist(id))
    }, [dispatch, id])
    const changeTodolistTitleHandler = useCallback((todolistTitle: string) => {
        dispatch(changeTodolistTitle(id, todolistTitle))
    }, [dispatch, id])

    return <div style={{display: 'flex', justifyContent: 'center'}}>
        <EditableSpan value={title} callback={changeTodolistTitleHandler} variant={"h6"} fontSize={'20px'}/>
        <IconButton size={"small"}
                    color={"error"}
                    style={{transform: 'translateY(-5px)'}}
                    onClick={removeTodolistHandler}
        >
            <DeleteIcon/>
        </IconButton>
    </div>
})