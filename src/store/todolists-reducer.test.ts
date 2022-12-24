import {addNewTodolist, todolistsReducer, TodolistType} from "./todolists-reducer";


const initialState: TodolistType[] = [
    {id: '1', title: 'todo 1', filter: 'all', sort: 'default'},
    {id: '2', title: 'todo 2', filter: 'all', sort: 'default'},
]

test('new todolist should be added correctly', ()=>{
    const action = addNewTodolist('newTodo')

    const updatedState = todolistsReducer(initialState, action)

    expect(updatedState.length).toBe(initialState.length+1)
    expect(updatedState[2].title).toBe('newTodo')
    expect(updatedState[2].filter).toBe('all')
    expect(updatedState[2].sort).toBe('default')

})