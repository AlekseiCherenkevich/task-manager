import React, {MouseEventHandler} from "react";
import {FilterValuesType} from "./TodoList";

type FiltersPropsType = {
    filter: FilterValuesType
    onChangeFilterValue: (filter: FilterValuesType) => MouseEventHandler<HTMLButtonElement> | undefined
}

export const Filters: React.FC<FiltersPropsType> = ({filter, onChangeFilterValue}) => {
    return <div>
        <button className={filter === 'all' ? 'activeButton' : ''} onClick={onChangeFilterValue("all")}>All</button>
        <button className={filter === 'active' ? 'activeButton' : ''} onClick={onChangeFilterValue("active")}>Active
        </button>
        <button className={filter === 'completed' ? 'activeButton' : ''}
                onClick={onChangeFilterValue('completed')}>Completed
        </button>
    </div>
}