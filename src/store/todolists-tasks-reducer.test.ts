import {addNewTodolistAC, removeTodolistAC, TodolistEntityType, todolistsReducer} from "./todolists-reducer"
import {TaskPriorities, tasksReducer, TaskStatuses, TasksType} from "./tasks-reducer";

export const initialTodolistsState: TodolistEntityType[] = [
    {id: '1', title: 'todo 1', filter: 'all', sort: 'default', order: 1, addedDate: ''},
    {id: '2', title: 'todo 2', filter: 'all', sort: 'default', order: 1, addedDate: ''},
]

const initialTasksState: TasksType = {
    '1': [
        {
            id: '1',
            title: 'task 1',
            addedDate: '',
            order: 0,
            deadline: '',
            startDate: '',
            description: '',
            todoListId: '1',
            priority: TaskPriorities.Middle,
            status: TaskStatuses.New
        },
        {
            id: '2',
            title: 'task 2',
            addedDate: '',
            order: 0,
            deadline: '',
            startDate: '',
            description: '',
            todoListId: '1',
            priority: TaskPriorities.Middle,
            status: TaskStatuses.New
        },
        {
            id: '3',
            title: 'task 3',
            addedDate: '',
            order: 0,
            deadline: '',
            startDate: '',
            description: '',
            todoListId: '1',
            priority: TaskPriorities.Middle,
            status: TaskStatuses.New
        }
    ],
    '2': [
        {
            id: '5',
            title: 'task 5',
            addedDate: '',
            order: 0,
            deadline: '',
            startDate: '',
            description: '',
            todoListId: '2',
            priority: TaskPriorities.Middle,
            status: TaskStatuses.New
        },
        {
            id: '6',
            title: 'task 6',
            addedDate: '',
            order: 0,
            deadline: '',
            startDate: '',
            description: '',
            todoListId: '2',
            priority: TaskPriorities.Middle,
            status: TaskStatuses.New
        },
        {
            id: '7',
            title: 'task 7',
            addedDate: '',
            order: 0,
            deadline: '',
            startDate: '',
            description: '',
            todoListId: '2',
            priority: TaskPriorities.Middle,
            status: TaskStatuses.New
        }
    ],
}

test('new todolist should be added correctly', () => {
    const action = addNewTodolistAC('newTodo')


    const updatedTodolistsState = todolistsReducer(initialTodolistsState, action)
    const updatedTasksState = tasksReducer(initialTasksState, action)


    expect(updatedTodolistsState.length).toBe(initialTodolistsState.length + 1)
    expect(updatedTodolistsState[2].title).toBe('newTodo')
    expect(updatedTodolistsState[2].filter).toBe('all')
    expect(updatedTodolistsState[2].sort).toBe('default')

    expect(Object.keys(updatedTasksState).length).toBe((Object.keys(initialTasksState).length) + 1)
})
test('todolists should remove correctly', () => {
    const action = removeTodolistAC('1')

    const updatedTodolistsState = todolistsReducer(initialTodolistsState, action)
    const updatedTasksState = tasksReducer(initialTasksState, action)

    expect(updatedTodolistsState).toEqual([{
        id: '2',
        title: 'todo 2',
        filter: 'all',
        sort: 'default',
        order: 1,
        addedDate: ''
    }])
    expect(updatedTasksState).toEqual({
        '2': [
            {
                id: '5',
                title: 'task 5',
                addedDate: '',
                order: 0,
                deadline: '',
                startDate: '',
                description: '',
                todoListId: '2',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New
            },
            {
                id: '6',
                title: 'task 6',
                addedDate: '',
                order: 0,
                deadline: '',
                startDate: '',
                description: '',
                todoListId: '2',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New
            },
            {
                id: '7',
                title: 'task 7',
                addedDate: '',
                order: 0,
                deadline: '',
                startDate: '',
                description: '',
                todoListId: '2',
                priority: TaskPriorities.Middle,
                status: TaskStatuses.New
            }
        ],
    })
    expect(updatedTasksState['2']).toBe(initialTasksState['2'])
})
