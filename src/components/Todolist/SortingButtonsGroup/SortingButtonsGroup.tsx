import {changeTodolistSort, SortValuesType} from "../../../store/todolists-reducer";
import {FC, memo } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";

type SortingButtonsGroupPropsType = {
    sort: SortValuesType
    id: string
}

export const SortingButtonsGroup: FC<SortingButtonsGroupPropsType> = memo( ({sort, id}) => {
    const dispatch = useDispatch()
    const changeTodolistSortHandler = (sort: SortValuesType) => () => {
        dispatch(changeTodolistSort(id, sort))
    }

    return <Stack direction={"row"}
                  style={{display: 'flex', justifyContent: 'center'}}
    >
        <Button onClick={changeTodolistSortHandler("default")}
                variant={sort==="default"?"contained":"outlined"}
                size={"small"}
        >Default</Button>
        <Button onClick={changeTodolistSortHandler("A-z")}
                variant={sort==="A-z"?"contained":"outlined"}
                size={"small"}
        >A-z</Button>
        <Button onClick={changeTodolistSortHandler("z-A")}
                variant={sort==="z-A"?"contained":"outlined"}
                size={"small"}
        >z-A</Button>
    </Stack>
})