import {SortValuesType} from "../../../store/todolists-reducer";
import React from "react";

type SortingButtonsPropsType = {
    changeSort: (sort: SortValuesType) => () => void
}

export const SortingButtons: React.FC<SortingButtonsPropsType> = ({changeSort}) => {
    return <div>
        <button onClick={changeSort("default")}>Default</button>
        <button onClick={changeSort("A-z")}>A-z</button>
        <button onClick={changeSort("z-A")}>Z-a</button>
    </div>
}