import {FC} from "react";
import {Task} from "./Task/Task";
import Typography from "@mui/material/Typography";
import {TaskType} from "../../../api/api";

type TasksSectionPropsType = {
    filteredSortedTasks: TaskType[]
}
export const TasksSection: FC<TasksSectionPropsType> = ({filteredSortedTasks}) => {
    return <div style={{minHeight: '50px', marginTop: '10px', paddingLeft: '20px'}}>

        {filteredSortedTasks && filteredSortedTasks.length
            ? filteredSortedTasks.map(t => {
            return <Task key={t.id} task={t}/>
        })
            : <Typography variant={"body1"} style={{paddingLeft: '30px'}}>Tasks not found</Typography>
        }
    </div>
}