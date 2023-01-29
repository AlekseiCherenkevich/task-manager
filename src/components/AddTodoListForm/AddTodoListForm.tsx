import {useCallback} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {addNewTodolistAC} from "../../store/todolists-reducer";
import {useAppDispatch} from "../../store/store";

export const AddTodoListForm = () => {
    const dispatch = useAppDispatch()
    const addNewTodolist = useCallback ((todolistTitle: string) => {
        dispatch(addNewTodolistAC(todolistTitle))
    }, [dispatch])

    return <Grid container style={{marginTop: '20px'}}>
        <Grid item>
            <Paper style={{padding: '20px 20px 0 20px'}} elevation={8}>
                <AddItemForm onClick={addNewTodolist} placeholder={'Enter todo`s title'}/>
            </Paper>
        </Grid>
    </Grid>
}