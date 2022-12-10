import {TaskType} from "../../../store/tasks-reducer";
import React from "react";
import {Task} from "./Task/Task";
import styled from "styled-components";
import Typography from '@mui/material/Typography';

type TasksPropsType = {
    tasks: TaskType[]
    removeTask: (taskId: string) => () => void
    changeTaskStatus: (taskId: string) => (taskStatus: boolean) => void
    changeTaskTitle: (taskId: string) => (taskTitle: string) => void
}

export const Tasks: React.FC<TasksPropsType> = (props) => {
    return <TasksStyle>
        {props.tasks.length ? props.tasks.map(t => {
            return <Task key={t.id}
                         taskTitle={t.title}
                         isDone={t.isDone}
                         removeTask={props.removeTask(t.id)}
                         changeTaskStatus={props.changeTaskStatus(t.id)}
                         changeTaskTitle={props.changeTaskTitle(t.id)}
            />
        })
        : <Typography variant="subtitle1" gutterBottom>Tasks not found</Typography>}
    </TasksStyle>
}

const TasksStyle = styled.div`
  min-height: 100px;
  .MuiTypography-root, .MuiTypography-subtitle1, .MuiTypography-gutterBottom, .css-1wniyei-MuiTypography-root {
    text-align: center;
    transform: translateY(10px);
  }
`