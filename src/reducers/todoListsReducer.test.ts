import {v1} from "uuid";
import {todoListsReducer} from "./todoListsReducer";
import {TodoListType} from "../App";


let todolistId1 = v1();
let todolistId2 = v1();
const state: TodoListType[] = [
    {id: todolistId1, title: "What to learn", filter: "all", sort: "default"},
    {id: todolistId2, title: "What to buy", filter: "all", sort: "default"}
]

test('length of todoLists array should be incremented', ()=>{
    const newTotoListID = v1()
    const updatedState = todoListsReducer(state, {type: "ADD_NEW_TODO_LIST", payload: {todoTitle: 'new todo list', newTodoID: newTotoListID}})

    expect(updatedState.length).toBe(3)
})
test('length of todoLists array should be decremented', ()=>{
    const updatedState = todoListsReducer(state, {type: "REMOVE_TODO_LIST", payload: {todoListID: todolistId1}})

    expect(updatedState.length).toBe(1)
})

test('sort value should be correct', ()=>{
    const updatedState = todoListsReducer(state, {type: "CHANGE_SORT_VALUE", payload: {todoListID: todolistId1, sort: "A-z"}})
    const el = updatedState.find(el=>el.id===todolistId1)

    expect(el &&  el.sort).toBe("A-z")
})

test('filter value should be correct', ()=>{
    const updatedState = todoListsReducer(state, {
        type: "CHANGE_FILTER_VALUE", payload: {todoListID: todolistId1, filterValue: "completed"}})
    const el = updatedState.find(el=>el.id===todolistId1)

    expect(el && el.filter).toBe('completed')
})

test('title value should be correct', ()=>{
    const updatedState = todoListsReducer(state, {type: "CHANGE_TODO_TITLE_VALUE", payload: {todoListID: todolistId1, title: 'changed title'}})
    const el = updatedState.find(el=>el.id===todolistId1)

    expect(el && el.title).toBe('changed title')
})
test('dispatching incorrect action should throw error', ()=>{
    //@ts-ignore
    expect(()=>todoListsReducer(state, {type: 'FAKE'})).toThrowError()
})