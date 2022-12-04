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
test('todolist should be added correctly', ()=>{
    const updatedState = todolistsReducer(state, {type: "ADD-NEW-TODOLIST", payload: {todolistId: 'xxx3', todolistTitle: 'new todo list'}})

    expect(updatedState.length).toBe(3)
    expect(updatedState[2]).toEqual({id: 'xxx3', title: 'new todo list', filter: "all", sort: "default"})
})
test('todolist title should be changed correctly', ()=>{
    const updatedState = todolistsReducer(state, {type: "CHANGE-TODOLIST-TITLE", payload: {todolistId: todolistId1, todolistTitle: "changed title"}})

    expect(updatedState.length).toBe(2)
    expect(updatedState[0]).toEqual({id: todolistId1, title: "changed title", filter: "all", sort: "default"})
    expect(updatedState[1]).toEqual({id: todolistId2, title: "What to buy", filter: "all", sort: "default"})
})
test('todolist filter should be changed correctly', ()=>{
    const updatedState = todolistsReducer(state, {type: "CHANGE-TODOLIST-FILTER", payload: {todolistId: todolistId2, filter: "active"}})

    expect(updatedState.length).toBe(2)
    expect(updatedState[0]).toEqual({id: todolistId1, title: "What to learn", filter: "all", sort: "default"})
    expect(updatedState[1]).toEqual({id: todolistId2, title: "What to buy", filter: "active", sort: "default"})
})
test('todolist sort should be changed correctly', ()=>{
    const updatedState = todolistsReducer(state, {type: "CHANGE-TODOLIST-SORT", payload: {todolistId: todolistId2, sort: "A-z"}})

    expect(updatedState.length).toBe(2)
    expect(updatedState[0]).toEqual({id: todolistId1, title: "What to learn", filter: "all", sort: "default"})
    expect(updatedState[1]).toEqual({id: todolistId2, title: "What to buy", filter: "all", sort: "A-z"})
})