import {todolistId1, todolistId2} from "../utils/helpers";
import {AddNewTodolistType, todolistsReducer, TodolistType} from "./todolists-reducer";
import {v1} from "uuid";
import {tasksReducer, TasksType} from "./tasks-reducer";


const todolistsState: TodolistType[] = [
    {id: todolistId1, title: "What to learn", filter: "all", sort: "default"},
    {id: todolistId2, title: "What to buy", filter: "all", sort: "default"}
]

const tasksState: TasksType = {
    [todolistId1]: [
        {id: '1', title: "HTML&CSS", isDone: true},
        {id: '2', title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: '3', title: "Milk", isDone: true},
        {id: '4', title: "React Book", isDone: true}
    ]
}

test('after adding new todolist states should be correct', ()=>{
    const newTodolistId: string = v1()
    const action: AddNewTodolistType = {type: "ADD-NEW-TODOLIST", payload: {todolistId: newTodolistId, todolistTitle: 'new todolist'}}

    const updatedTodolistsState = todolistsReducer(todolistsState, action)
    const updatedTasksState = tasksReducer(tasksState, action)

    expect(updatedTodolistsState).toEqual([
        {id: todolistId1, title: "What to learn", filter: "all", sort: "default"},
        {id: todolistId2, title: "What to buy", filter: "all", sort: "default"},
        {id: newTodolistId, title: 'new todolist', filter: "all", sort: "default"}
    ])
    expect(updatedTasksState).toEqual({
        [todolistId1]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: '3', title: "Milk", isDone: true},
            {id: '4', title: "React Book", isDone: true}
        ],
        [newTodolistId]: []
    })
})

