import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';





export function Todolist(props) {


    return <div>
        <h3>
            <button >x</button>
        </h3>
        <div>
            <input/>
            <button >+</button>

        </div>
        <ul>

        </ul>
        <div>
            <button >All</button>
            <button >Active</button>
            <button >Completed</button>
        </div>
    </div>
}


