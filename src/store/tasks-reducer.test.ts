import {addNewTask, removeTask, tasksReducer, TasksType} from "./tasks-reducer";


const initialState: TasksType = {
    '1': [
        {taskId: '1', taskTitle: 'task 1', isDone: false},
        {taskId: '2', taskTitle: 'task 2', isDone: true},
        {taskId: '3', taskTitle: 'task 3', isDone: false}
    ],
    '2': [
        {taskId: '5', taskTitle: 'task 5', isDone: false},
        {taskId: '6', taskTitle: 'task 6', isDone: true},
        {taskId: '7', taskTitle: 'task 7', isDone: false}
    ],
}


test('new task should be added correctly' ,() => {
    const action = addNewTask('1', 'added task')

    const updatedState = tasksReducer(initialState, action)

    expect(initialState['2']).toBe(updatedState['2'])
    expect(updatedState['1'].length).toBe(initialState['1'].length+1)
    expect(updatedState['1'][0].taskTitle).toBe('added task')
})

test('task should be removed correctly', ()=>{
    const action = removeTask('1', '2')

    const updatedState = tasksReducer(initialState, action)

    expect(initialState['2']).toBe(updatedState['2'])
    expect(updatedState['1']).toEqual([
        {taskId: '1', taskTitle: 'task 1', isDone: false},
        {taskId: '3', taskTitle: 'task 3', isDone: false}
    ])
})