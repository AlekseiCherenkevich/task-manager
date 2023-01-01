import {changeTodolistFilter, FilterValuesType} from "../store/todolists-reducer";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {FC, memo} from "react";
import {useDispatch} from "react-redux";

type FilteringButtonsGroupPropsType = {
    filter: FilterValuesType
    id: string
}

export const FilteringButtonsGroup: FC<FilteringButtonsGroupPropsType> = memo( ({filter, id}) => {
    const dispatch = useDispatch()
    const changeTodolistFilterHandler = (filter: FilterValuesType) => () => {
        dispatch(changeTodolistFilter(id, filter))
    }

    return <Stack direction={"row"}
                  style={{display: 'flex', justifyContent: 'center'}}
    >
        <Button onClick={changeTodolistFilterHandler("all")}
                variant={filter==="all"?"contained":"outlined"}
                size={"small"}
        >All</Button>
        <Button onClick={changeTodolistFilterHandler("active")}
                variant={filter==="active"?"contained":"outlined"}
                size={"small"}
        >Active</Button>
        <Button onClick={changeTodolistFilterHandler("completed")}
                variant={filter==="completed"?"contained":"outlined"}
                size={"small"}
        >Completed</Button>
    </Stack>
})