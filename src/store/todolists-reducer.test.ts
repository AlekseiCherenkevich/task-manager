import {todolistId1, todolistId2} from "../utils/helpers";
import {todolistsReducer, TodolistType} from "./todolists-reducer";


const state: TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all", sort: "default"},
    {id: todolistId2, title: "What to buy", filter: "all", sort: "default"}
]

test('todolist should be removed correctly', ()=>{
    const updatedState = todolistsReducer(state, {type: "REMOVE-TODOLIST", payload: {todolistId: todolistId1}})

    expect(updatedState.length).toBe(1)
    expect(updatedState[0]).toEqual({id: todolistId2, title: "What to buy", filter: "all", sort: "default"})
})