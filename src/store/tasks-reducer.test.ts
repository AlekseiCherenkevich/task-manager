import {todolistId1, todolistId2} from "../utils/helpers";
import {tasksReducer} from "./tasks-reducer";


const state: TasksType = {
    [todolistId1]: [
        {id: '1', title: "HTML&CSS", isDone: true},
        {id: '2', title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: '3', title: "Milk", isDone: true},
        {id: '4', title: "React Book", isDone: true}
    ]
}

test('tasks should be removed correctly', ()=>{
    const updatedState = tasksReducer(state, {type: "REMOVE-TASK", payload: {todolistId: todolistId2, taskId: '3'}})

    expect(updatedState[todolistId2].length).toBe(1)
    expect(updatedState[todolistId1].length).toBe(2)
    expect(updatedState[todolistId2].every(t=>t.id!=='3')).toBeTruthy()
})
test('tasks should be added correctly', ()=>{
    const updatedState = tasksReducer(state, {type: "ADD-NEW-TASK", payload: {todolistId: todolistId1, taskTitle: 'new task'}})

    expect(updatedState[todolistId1].length).toBe(3)
    expect(updatedState[todolistId2].length).toBe(2)
    expect(updatedState[todolistId1][0].title).toBe('new task')
})