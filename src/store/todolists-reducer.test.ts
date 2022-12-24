import {changeTodolistTitle, todolistsReducer, TodolistType} from "./todolists-reducer";


const initialState: TodolistType[] = [
    {id: '1', title: 'todo 1', filter: 'all', sort: 'default'},
    {id: '2', title: 'todo 2', filter: 'all', sort: 'default'},
]

test('todolist title should be changed correctly', ()=>{
    const action = changeTodolistTitle('1', 'changed title')

    const updatedState = todolistsReducer(initialState, action)

    expect(updatedState).toEqual([
        {id: '1', title: 'changed title', filter: 'all', sort: 'default'},
        {id: '2', title: 'todo 2', filter: 'all', sort: 'default'},
    ])
})

