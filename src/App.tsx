import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import { Todolist } from './TodoList/Todolist';
import {Input} from "./common/Input/Input";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksType = {
    [key: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<TodoListType[]>([
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

    const addNewTodoList = (todoTitle: string) => {
        const newTodoID = v1()
        setTodolists([...todolists, {id: newTodoID, title: todoTitle, filter: "all"}])
        setTasks({...tasks, [newTodoID]: []})
    }
    const addNewTask = (todoListID: string) => (taskTitle: string) => {
        setTasks({...tasks, [todoListID]:[{id: v1(), title: taskTitle, isDone: false}, ...tasks[todoListID]]})
    }
    const removeTodoList = (todoListID: string) => {
        setTodolists(todolists.filter(tl=>tl.id!==todoListID))
        delete tasks[todoListID]
    }



    return (
        <div className="App">
            <div style={{height: '30px', marginTop: '20px'}}>
                <Input placeholder={'Enter new title'} callback={addNewTodoList}/>
            </div>
            {todolists.map(tl=>{


                return  <Todolist
                    todoListID={tl.id}
                    todoTitle={tl.title}
                    tasks={tasks[tl.id]}
                    addNewTask={addNewTask}
                    removeTodoList={removeTodoList}
                />
            })}


        </div>
    );
}

export default App;
