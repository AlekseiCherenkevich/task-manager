import React from "react";

import {FilterValuesType} from "../../App";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

type FilteringButtonsPropsType = {
    filter: FilterValuesType
    onChangeFilterHandler: (filter: FilterValuesType) => () => void
}

export const FilteringButtons: React.FC<FilteringButtonsPropsType> = ({onChangeFilterHandler, filter}) => {
    const showActiveButton = (value: FilterValuesType) => filter === value ? 'contained' : 'text'
    return <div>
        <ButtonGroup size="small" aria-label="small button group" color="warning" style={{display: 'flex', justifyContent: 'center'}}>
            <Button variant={showActiveButton("all")} onClick={onChangeFilterHandler('all')}>All</Button>
            <Button variant={showActiveButton("active")} onClick={onChangeFilterHandler('active')}>Active</Button>
            <Button variant={showActiveButton("completed")} onClick={onChangeFilterHandler('completed')}>Completed</Button>
        </ButtonGroup>
    </div>
}