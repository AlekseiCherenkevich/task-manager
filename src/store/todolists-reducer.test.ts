import {
    changeTodolistFilterAC,
    changeTodolistSortAC,
    changeTodolistTitleAC,
    TodolistEntityType,
    todolistsReducer
} from "./todolists-reducer";


const initialState: TodolistEntityType[] = [
    {id: '1', title: 'todo 1', filter: 'all', sort: 'default', order: 1, addedDate: ''},
    {id: '2', title: 'todo 2', filter: 'all', sort: 'default', order: 1, addedDate: ''},
]

test('todolist title should be changed correctly', ()=>{
    const action = changeTodolistTitleAC('1', 'changed title')

    const updatedState = todolistsReducer(initialState, action)

    expect(updatedState).toEqual([
        {id: '1', title: 'changed title', filter: 'all', sort: 'default', order: 1, addedDate: ''},
        {id: '2', title: 'todo 2', filter: 'all', sort: 'default', order: 1, addedDate: ''},
    ])
})
test('todolist filter should change correctly', ()=>{
    const action = changeTodolistFilterAC('1', 'active')

    const updatedState = todolistsReducer(initialState, action)

    expect(updatedState).toEqual([
        {id: '1', title: 'todo 1', filter: 'active', sort: 'default', order: 1, addedDate: ''},
        {id: '2', title: 'todo 2', filter: 'all', sort: 'default', order: 1, addedDate: ''},
    ])
})
test('todolist sort should change correctly', ()=>{
    const action = changeTodolistSortAC('1', 'A-z')

    const updatedState = todolistsReducer(initialState, action)

    expect(updatedState).toEqual([
        {id: '1', title: 'todo 1', filter: 'all', sort: 'A-z', order: 1, addedDate: ''},
        {id: '2', title: 'todo 2', filter: 'all', sort: 'default', order: 1, addedDate: ''},
    ])


})

