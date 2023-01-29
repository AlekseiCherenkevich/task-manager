import {changeTodolistSortAC, SortValuesType} from "../../../store/todolists-reducer";
import {FC, memo} from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useAppDispatch} from "../../../store/store";

type SortingButtonsGroupPropsType = {
    sort: SortValuesType
    id: string
}

export const SortingButtonsGroup: FC<SortingButtonsGroupPropsType> = memo( ({sort, id}) => {
    const dispatch = useAppDispatch()
    const changeTodolistSort = (sort: SortValuesType) => () => {
        dispatch(changeTodolistSortAC(id, sort))
    }

    return <Stack direction={"row"}
                  style={{display: 'flex', justifyContent: 'center'}}
    >
        <Button onClick={changeTodolistSort("default")}
                variant={sort==="default"?"contained":"outlined"}
                size={"small"}
        >Default</Button>
        <Button onClick={changeTodolistSort("A-z")}
                variant={sort==="A-z"?"contained":"outlined"}
                size={"small"}
        >A-z</Button>
        <Button onClick={changeTodolistSort("z-A")}
                variant={sort==="z-A"?"contained":"outlined"}
                size={"small"}
        >z-A</Button>
    </Stack>
})