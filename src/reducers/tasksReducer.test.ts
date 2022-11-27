import {v1} from "uuid";
import {tasksReducer} from "./tasksReducer";
import {TasksType} from "../App";

let todolistId1 = v1();
let todolistId2 = v1();
const state: TasksType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

test('after adding new task length of tasks array should be incremented', ()=>{
    const updatedState = tasksReducer(state, {type: "ADD_NEW_TASK", payload: {todoListID: todolistId1, taskTitle: 'new task'}})

    expect(updatedState[todolistId1].length).toBe(3)
})
test('title of new task should be correct', ()=>{
    const updatedState = tasksReducer(state, {type: "ADD_NEW_TASK", payload: {todoListID: todolistId2, taskTitle: 'new task'}})

    expect(updatedState[todolistId2][0].title).toBe('new task')
})
test('after removing task length of tasks array should be decremented',()=>{
    const taskID = state[todolistId1][1].id
    const updatedState = tasksReducer(state, {type: "REMOVE_TASK", payload: {todoListID: todolistId1, taskID: taskID}})

    expect(updatedState[todolistId1].length).toBe(1)
})
test('changed task status should be correct', ()=>{
    const taskID = state[todolistId2][0].id
    const updatedState = tasksReducer(state, {type: "CHANGE_TASK_STATUS", payload: {todoListID: todolistId2, taskID: taskID, isDone: false}})

    expect(updatedState[todolistId2][0].isDone).toBe(false)
})
test('changed tasks title should be correct',()=>{
    const taskID = state[todolistId1][0].id
    const updatedState = tasksReducer(state, {type: "CHANGE_TASK_TITLE", payload: {todoListID: todolistId1, taskID: taskID, taskTitle: 'changed title'}})

    expect(updatedState[todolistId1][0].title).toBe('changed title')
})
test('after creating new todo List tasks array should be empty', ()=>{
    const newTodoListID = v1()
    const updatedState = tasksReducer(state, {type: "SET_NEW_TODO_LIST_ID_TO_KEY", payload: {
        todoListID: newTodoListID}})

    expect(updatedState[newTodoListID].length).toBe(0)
})
test('dispatching incorrect action should throw error', ()=>{
    expect(()=>tasksReducer(state, {type: 'FAKE'})).toThrowError()
})
