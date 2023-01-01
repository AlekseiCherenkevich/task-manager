import {useCallback} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {AddItemForm} from "./AddItemForm";
import {addNewTodolist} from "../store/todolists-reducer";
import {useDispatch} from "react-redux";

export const AddTodoListForm = () => {
    const dispatch = useDispatch()
    const addNewTodolistHandler = useCallback ((todolistTitle: string) => {
        dispatch(addNewTodolist(todolistTitle))
    }, [dispatch])

    return <Grid container style={{marginTop: '20px'}}>
        <Grid item>
            <Paper style={{padding: '20px 20px 0 20px'}} elevation={8}>
                <AddItemForm onClick={addNewTodolistHandler} placeholder={'Enter todo`s title'}/>
            </Paper>
        </Grid>
    </Grid>
}