import {useCallback} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {useAppDispatch} from "../../store/store";
import {createTodolistTC} from "../../store/todolists-reducer";

export const AddTodoListForm = () => {
    const dispatch = useAppDispatch()
    const addNewTodolist = useCallback ((todolistTitle: string) => {
        dispatch(createTodolistTC(todolistTitle))
    }, [dispatch])

    return <Grid container style={{marginTop: '20px'}}>
        <Grid item>
            <Paper style={{padding: '20px 20px 0 20px'}} elevation={8}>
                <AddItemForm onClick={addNewTodolist} placeholder={'Enter todo`s title'}/>
            </Paper>
        </Grid>
    </Grid>
}