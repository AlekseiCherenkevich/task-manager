import React, {useState} from 'react';
import { ComponentMeta } from '@storybook/react';
import {SortingButtons} from "./SortingButtons";
import {SortValuesType} from "../../App";



export default {
    title: 'SortingButtons',
    component: SortingButtons
} as ComponentMeta<typeof SortingButtons>

export const ChangingSortingButtons = () => {
    const [value, setValue] = useState<SortValuesType>('default')

    return <SortingButtons sort={value} onChangeSortHandler={(value)=>()=>setValue(value)}/>
}