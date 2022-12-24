import {addNewTodolist, todolistsReducer, TodolistType } from "./todolists-reducer"
import {TasksType} from "./tasks-reducer";

const initialTodolistsState: TodolistType[] = [
    {id: '1', title: 'todo 1', filter: 'all', sort: 'default'},
    {id: '2', title: 'todo 2', filter: 'all', sort: 'default'},
]

const initialTasksState: TasksType = {
    '1': [
        {id: '1', title: 'task 1', isDone: false},
        {id: '2', title: 'task 2', isDone: true},
        {id: '3', title: 'task 3', isDone: false}
    ],
    '2': [
        {id: '5', title: 'task 5', isDone: false},
        {id: '6', title: 'task 6', isDone: true},
        {id: '7', title: 'task 7', isDone: false}
    ],
}

test('new todolist should be added correctly', ()=>{
    const action = addNewTodolist('newTodo')


    const updatedTodolistsState = todolistsReducer(initialTodolistsState, action)
    const updatedTasksState = todolistsReducer(initialTasksState, action)


    expect(updatedTodolistsState.length).toBe(initialTodolistsState.length+1)
    expect(updatedTodolistsState[2].title).toBe('newTodo')
    expect(updatedTodolistsState[2].filter).toBe('all')
    expect(updatedTodolistsState[2].sort).toBe('default')

    expect(Object.keys(updatedTasksState).length).toBe(Object.keys(initialTasksState).length-1)
})