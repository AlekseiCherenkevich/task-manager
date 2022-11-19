import React from "react";
import {Button} from "../../common/Button/Button";
import {FilterValuesType} from "../../App";

type FilteringButtonsPropsType = {
    onChangeFilterHandler: (filter: FilterValuesType) => () => void
}

export const FilteringButtons: React.FC<FilteringButtonsPropsType> = ({onChangeFilterHandler}) => {
    return <div>
        <Button onClick={onChangeFilterHandler('all')}>All</Button>
        <Button onClick={onChangeFilterHandler('active')}>Active</Button>
        <Button onClick={onChangeFilterHandler('completed')}>Completed</Button>
    </div>
}