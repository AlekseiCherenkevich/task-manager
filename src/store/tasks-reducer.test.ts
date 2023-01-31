import {
    addNewTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskPriorities,
    tasksReducer,
    TaskStatuses,
    TasksType
} from "./tasks-reducer";


const initialState: TasksType = {
    '1': [
        {id: '1', title: 'task 1', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New},
        {id: '2', title: 'task 2', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New},
        {id: '3', title: 'task 3', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New}
    ],
    '2': [
        {id: '5', title: 'task 5', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '2', priority: TaskPriorities.Middle, status: TaskStatuses.New},
        {id: '6', title: 'task 6', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '2', priority: TaskPriorities.Middle, status: TaskStatuses.New},
        {id: '7', title: 'task 7', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '2', priority: TaskPriorities.Middle, status: TaskStatuses.New}
    ],
}

test('new task should be added correctly' ,() => {
    const action = addNewTaskAC({id: '44', title: 'task 44', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New})

    const updatedState = tasksReducer(initialState, action)

    expect(initialState['2']).toBe(updatedState['2'])
    expect(updatedState['1'].length).toBe(initialState['1'].length+1)
    expect(updatedState['1'][0].title).toBe('task 44')
})
test('task should be removed correctly', ()=>{
    const action = removeTaskAC('1', '2')

    const updatedState = tasksReducer(initialState, action)

    expect(initialState['2']).toBe(updatedState['2'])
    expect(updatedState['1']).toEqual([
        {id: '1', title: 'task 1', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New},
        {id: '3', title: 'task 3', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New}
    ])
})
test('task title should be changed correctly', ()=>{
    const action = changeTaskTitleAC('1', '3', 'changed title')

    const updatedState = tasksReducer(initialState, action)

    expect(initialState['2']).toBe(updatedState['2'])
    expect(updatedState['1']).toEqual([
        {id: '1', title: 'task 1', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New},
        {id: '2', title: 'task 2', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New},
        {id: '3', title: 'changed title', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New}
    ])
})
test('task status should be changed correctly',()=>{
    const action = changeTaskStatusAC('1', '2', TaskStatuses.Completed)

    const updatedState = tasksReducer(initialState, action)

    expect(initialState['2']).toBe(updatedState['2'])
    expect(updatedState['1']).toEqual([
        {id: '1', title: 'task 1', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New},
        {id: '2', title: 'task 2', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.Completed},
        {id: '3', title: 'task 3', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New}
    ])
})