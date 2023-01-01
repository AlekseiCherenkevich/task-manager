import {Provider} from "react-redux";
import {AppStateType, rootReducer} from "../../store/store";
import {legacy_createStore} from "redux";



const initialState: AppStateType = {
    todolists: [
        {id: '1', title: 'What to buy', sort: "default", filter: "all"},
        {id: '2', title: 'What to learn', sort: "default", filter: "all"},
    ],
    tasks: {
        '1': [
            {id: 'x1', title: 'milk', isDone: false},
            {id: 'x2', title: 'bread', isDone: true},
            {id: 'x3', title: 'meat', isDone: false}
        ],
        '2': [
            {id: 'y1', title: 'JS', isDone: false},
            {id: 'y2', title: 'CSS', isDone: true},
            {id: 'y3', title: 'React', isDone: true}
        ],
    }
}

const store = legacy_createStore(rootReducer, initialState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider>
}