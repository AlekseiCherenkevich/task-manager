import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import { Todolist } from './TodoList/Todolist';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });



    return (
        <div className="App">
            <div style={{height: '30px', marginTop: '20px'}}>
                <input type="text"/>
                <button>+</button>
            </div>
            {todolists.map(tl=>{


                return  <Todolist
                    todoTitle={tl.title}
                    tasks={tasks[tl.id]}
                />
            })}


        </div>
    );
}

export default App;
