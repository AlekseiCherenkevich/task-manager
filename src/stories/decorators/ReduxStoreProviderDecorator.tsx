import {Provider} from "react-redux";
import {AppStateType, rootReducer} from "../../store/store";
import {legacy_createStore} from "redux";
import {TaskPriorities, TaskStatuses} from "../../store/tasks-reducer";


const initialState: AppStateType = {
    todolists: [
        {id: '1', title: 'What to buy', sort: "default", filter: "all", order: 1, addedDate: ''},
        {id: '2', title: 'What to learn', sort: "default", filter: "all", order: 1, addedDate: ''},
    ],
    tasks: {
        '1': [
            {id: 'x1', title: 'milk', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New},
            {id: 'x2', title: 'bread', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New},
            {id: 'x3', title: 'meat', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '1', priority: TaskPriorities.Middle, status: TaskStatuses.New}
        ],
        '2': [
            {id: 'y1', title: 'JS', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '2', priority: TaskPriorities.Middle, status: TaskStatuses.New},
            {id: 'y2', title: 'CSS', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '2', priority: TaskPriorities.Middle, status: TaskStatuses.New},
            {id: 'y3', title: 'React', addedDate: '', order: 0, deadline: '', startDate: '', description: '', todoListId: '2', priority: TaskPriorities.Middle, status: TaskStatuses.New}
        ],
    }
}

const store = legacy_createStore(rootReducer, initialState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider>
}