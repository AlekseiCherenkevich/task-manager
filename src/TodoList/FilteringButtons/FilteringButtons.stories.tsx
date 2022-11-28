import React, {useState} from 'react';
import {ComponentMeta } from '@storybook/react';
import {FilteringButtons} from "./FilteringButtons";
import {FilterValuesType} from "../../App";



export default {
    title: 'FilteringButtons',
    component: FilteringButtons
} as ComponentMeta<typeof FilteringButtons>

export const ChangingFilteringButtons = () => {
    const [value, setValue] = useState<FilterValuesType>("all")

    return <FilteringButtons filter={value} onChangeFilterHandler={(filer)=>()=>setValue(filer)}/>
}