import React from "react";
import { SortValuesType} from "../../App";
import {ButtonGroup, Button} from "@mui/material";

type SortingButtonsPropsType = {
    sort: SortValuesType
    onChangeSortHandler: (sort: SortValuesType) => () => void
}

export const SortingButtons: React.FC<SortingButtonsPropsType> = ({onChangeSortHandler, sort}) => {
    const showActiveButton = (value: SortValuesType) => sort === value ? 'contained' : 'text'

    return <div>
        <ButtonGroup size="small" aria-label="small button group">
            <Button variant={showActiveButton("default")} onClick={onChangeSortHandler("default")}>Default</Button>
            <Button variant={showActiveButton("A-z")} onClick={onChangeSortHandler("A-z")}>A-z</Button>
            <Button variant={showActiveButton("Z-a")} onClick={onChangeSortHandler("Z-a")}>Z-a</Button>
        </ButtonGroup>
    </div>
}