import {v1} from "uuid";
import {FilterValuesType, SortValuesType} from "../store/todolists-reducer";

export let todolistId1 = v1();
export let todolistId2 = v1();

export const showActiveButton = (value: FilterValuesType | SortValuesType, buttonValue: FilterValuesType | SortValuesType) => {
    return value === buttonValue
        ? 'contained'
        : 'outlined'
}