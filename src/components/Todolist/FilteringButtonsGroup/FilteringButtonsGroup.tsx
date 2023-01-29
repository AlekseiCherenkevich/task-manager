import {changeTodolistFilterAC, FilterValuesType} from "../../../store/todolists-reducer";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {FC, memo} from "react";
import {useAppDispatch} from "../../../store/store";

type FilteringButtonsGroupPropsType = {
    filter: FilterValuesType
    id: string
}

export const FilteringButtonsGroup: FC<FilteringButtonsGroupPropsType> = memo( ({filter, id}) => {
    const dispatch = useAppDispatch()
    const changeTodolistFilter = (filter: FilterValuesType) => () => {
        dispatch(changeTodolistFilterAC(id, filter))
    }

    return <Stack direction={"row"}
                  style={{display: 'flex', justifyContent: 'center'}}
    >
        <Button onClick={changeTodolistFilter("all")}
                variant={filter==="all"?"contained":"outlined"}
                size={"small"}
        >All</Button>
        <Button onClick={changeTodolistFilter("active")}
                variant={filter==="active"?"contained":"outlined"}
                size={"small"}
        >Active</Button>
        <Button onClick={changeTodolistFilter("completed")}
                variant={filter==="completed"?"contained":"outlined"}
                size={"small"}
        >Completed</Button>
    </Stack>
})