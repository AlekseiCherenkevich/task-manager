import {FilterValuesType} from "../../../store/todolists-reducer";
import React from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { showActiveButton } from "../../../utils/helpers";

type FilteringButtonsPropsType = {
    filter: FilterValuesType
    changeFilter: (filter: FilterValuesType) => () => void
}


export const FilteringButtons: React.FC<FilteringButtonsPropsType> = ({filter, changeFilter}) => {
    return <ButtonGroup size={"small"} color={"secondary"}>
        <Button
            variant={showActiveButton(filter, "all")}
            onClick={changeFilter("all")}
        >All</Button>
        <Button
            variant={showActiveButton(filter, "completed")}
            onClick={changeFilter("completed")}
        >Completed</Button>
        <Button
            variant={showActiveButton(filter, "active")}
            onClick={changeFilter("active")}
        >Active</Button>
    </ButtonGroup>
}