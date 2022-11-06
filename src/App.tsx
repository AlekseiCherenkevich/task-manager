import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import TodoList from "./components/TodoList";


export type TaskType = {
    taskID: string
    taskTitle: string
    isDone: boolean
}
export type TodoListType = {
    todoTitle: string,
    tasks: TaskType[]
}

function App() {
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {
            todoTitle: 'What to learn',
            tasks: [
                {taskID: v1(), taskTitle: 'HTML&CSS', isDone: true},
                {taskID: v1(), taskTitle: 'JS', isDone: true},
                {taskID: v1(), taskTitle: 'React', isDone: false}
            ]
        }
    ])

    const addNewTask = (todoListIdx: number, newTaskTitle: string) => {
        const todoListsCopy = JSON.parse(JSON.stringify(todoLists))
        todoListsCopy[todoListIdx].tasks = [{taskID: v1(), taskTitle: newTaskTitle, isDone: false}, ...todoListsCopy[todoListIdx].tasks]
        setTodoLists(todoListsCopy)
    }
    const removeTask = (todoListIdx: number, taskID: string) => {
        const todoListsCopy = JSON.parse(JSON.stringify(todoLists))
        todoListsCopy[todoListIdx].tasks = todoListsCopy[todoListIdx].tasks.filter((t: TaskType)=>t.taskID!==taskID)
        setTodoLists(todoListsCopy)
    }
    const changeTaskStatus = (todoListIdx: number, taskID: string, status: boolean) => {
        const todoListsCopy = JSON.parse(JSON.stringify(todoLists))
        todoListsCopy[todoListIdx].tasks = todoListsCopy[todoListIdx].tasks.map((t: TaskType)=>{
            if (t.taskID === taskID) {
                return {...t, isDone: status}
            } else {
                return t
            }
        })
        setTodoLists(todoListsCopy)
    }
    const addNewTodoList = () => setTodoLists([...todoLists, {todoTitle: '...', tasks: []}])


    return (
        <div className="App">
            {todoLists.map((t, index)=> {
                return <TodoList
                    todoList={t}
                    todoListIdx={index}
                    addNewTask={addNewTask}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    addNewTodoList={addNewTodoList}
                />
            } )}
            {/*<TodoList*/}
            {/*    todoList={todoLists[0]}*/}
            {/*    todoListIdx={0}*/}
            {/*    addNewTask={addNewTask}*/}
            {/*    removeTask={removeTask}*/}
            {/*    changeTaskStatus={changeTaskStatus}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
