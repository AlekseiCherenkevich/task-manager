import React from "react";
import {Button} from "../../common/Button/Button";
import {SortValuesType} from "../../App";

type SortingButtonsPropsType = {
    onChangeSortHandler: (sort: SortValuesType) => () => void
}

export const SortingButtons: React.FC<SortingButtonsPropsType> = ({onChangeSortHandler}) => {
    return <div>
        <Button onClick={onChangeSortHandler("default")}>Default</Button>
        <Button onClick={onChangeSortHandler("A-z")}>A-z</Button>
        <Button onClick={onChangeSortHandler("Z-a")}>Z-a</Button>
    </div>
}