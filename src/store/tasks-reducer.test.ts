import {addNewTask, changeTaskStatus, changeTaskTitle, removeTask, tasksReducer, TasksType} from "./tasks-reducer";


const initialState: TasksType = {
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

test('new task should be added correctly' ,() => {
    const action = addNewTask('1', 'added task')

    const updatedState = tasksReducer(initialState, action)

    expect(initialState['2']).toBe(updatedState['2'])
    expect(updatedState['1'].length).toBe(initialState['1'].length+1)
    expect(updatedState['1'][0].title).toBe('added task')
})
test('task should be removed correctly', ()=>{
    const action = removeTask('1', '2')

    const updatedState = tasksReducer(initialState, action)

    expect(initialState['2']).toBe(updatedState['2'])
    expect(updatedState['1']).toEqual([
        {id: '1', title: 'task 1', isDone: false},
        {id: '3', title: 'task 3', isDone: false}
    ])
})
test('task title should be changed correctly', ()=>{
    const action = changeTaskTitle('1', '3', 'changed title')

    const updatedState = tasksReducer(initialState, action)

    expect(initialState['2']).toBe(updatedState['2'])
    expect(updatedState['1']).toEqual([
        {id: '1', title: 'task 1', isDone: false},
        {id: '2', title: 'task 2', isDone: true},
        {id: '3', title: 'changed title', isDone: false}
    ])
})
test('task status should be changed correctly',()=>{
    const action = changeTaskStatus('1', '2', false)

    const updatedState = tasksReducer(initialState, action)

    expect(initialState['2']).toBe(updatedState['2'])
    expect(updatedState['1']).toEqual([
        {id: '1', title: 'task 1', isDone: false},
        {id: '2', title: 'task 2', isDone: false},
        {id: '3', title: 'task 3', isDone: false}
    ])
})