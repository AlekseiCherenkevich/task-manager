import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './TodoList/Todolist';
import {Input} from "./common/Input/Input";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
    sort: SortValuesType
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
export type SortValuesType = 'default' | 'A-z' | 'Z-a'

function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<TodoListType[]>([
        {id: todolistId1, title: "What to learn", filter: "all", sort: "default"},
        {id: todolistId2, title: "What to buy", filter: "all", sort: "default"}
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
        setTodolists([...todolists, {id: newTodoID, title: todoTitle, filter: "all", sort: "default"}])
        setTasks({...tasks, [newTodoID]: []})
    }
    const addNewTask = (todoListID: string) => (taskTitle: string) => {
        setTasks({...tasks, [todoListID]: [{id: v1(), title: taskTitle, isDone: false}, ...tasks[todoListID]]})
    }
    const removeTodoList = (todoListID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const removeTask = (todoListID: string, taskID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== taskID)})
    }
    const changeTaskStatus = (todoListID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
    }
    const filterTasks = (tasks: TaskType[], filter: FilterValuesType) => {
        switch (filter) {
            case "completed":
                return tasks.filter(t => t.isDone)
            case "active":
                return tasks.filter(t => !t.isDone)
            default:
                return tasks
        }
    }
    const changeFilterValue = (todoListID: string, filterValue: FilterValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todoListID ? {...tl, filter: filterValue} : tl))
    }
    const sortTasks = (tasks: TaskType[], sort: SortValuesType) => {
        switch (sort) {
            case "A-z":
                return [...tasks].sort((a, b) => a.title.localeCompare(b.title))
            case "Z-a":
                return [...tasks].sort((a, b) => b.title.localeCompare(a.title))
            default:
                return tasks
        }

    }
    const changeSortValue = (todoListID: string) => (sort: SortValuesType) => setTodolists(todolists.map(tl => tl.id === todoListID ? {
        ...tl,
        sort: sort
    } : tl))


    return (
        <div className="App">
            <div style={{height: '30px', marginTop: '20px'}}>
                <Input placeholder={'Enter new title'} callback={addNewTodoList}/>
            </div>
            {todolists.map(tl => {
                const filteredTasks = filterTasks(tasks[tl.id], tl.filter)
                const sortedTasks = sortTasks(filteredTasks, tl.sort)

                return <Todolist
                    todoListID={tl.id}
                    todoTitle={tl.title}
                    tasks={sortedTasks}
                    addNewTask={addNewTask}
                    removeTodoList={removeTodoList}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeFilterValue={changeFilterValue}
                    changeSortValue={changeSortValue(tl.id)}
                />
            })}


        </div>
    );
}

export default App;
