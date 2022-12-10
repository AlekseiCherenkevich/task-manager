import {FilterValuesType} from "../../../store/todolists-reducer";
import React from "react";

type FilteringButtonsPropsType = {
    changeFilter: (filter: FilterValuesType) => () => void
}

export const FilteringButtons: React.FC<FilteringButtonsPropsType> = ({changeFilter}) => {
    return <div>
        <button onClick={changeFilter("all")}>All</button>
        <button onClick={changeFilter("completed")}>Completed</button>
        <button onClick={changeFilter("active")}>Active</button>
    </div>
}