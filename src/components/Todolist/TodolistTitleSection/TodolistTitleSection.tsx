import {FC, memo, useCallback} from "react";
import {changeTodolistTitleTC, removeTodolistTC} from "../../../store/todolists-reducer";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppDispatch} from "../../../store/store";

type TodolistTitleSectionPropsType = {
    id: string
    title: string
}
export const TodolistTitleSection: FC<TodolistTitleSectionPropsType> = memo(({title, id}) => {
    const dispatch = useAppDispatch()
    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistTC(id))
    }, [dispatch, id])
    const changeTodolistTitleHandler = useCallback((todolistTitle: string) => {
        dispatch(changeTodolistTitleTC(id, todolistTitle))
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