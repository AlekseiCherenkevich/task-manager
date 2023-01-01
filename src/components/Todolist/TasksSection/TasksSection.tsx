import {TaskType} from "../../../store/tasks-reducer";
import {FC, memo} from "react";
import {Task} from "./Task/Task";
import Typography from "@mui/material/Typography";

type TasksSectionPropsType = {
    filteredSortedTasks: TaskType[]
    id: string
}
export const TasksSection: FC<TasksSectionPropsType> = memo(({filteredSortedTasks, id}) => {
    return <div style={{minHeight: '50px', marginTop: '10px', paddingLeft: '20px'}}>
        {filteredSortedTasks.map(t => {
            return <Task todolistId={id} {...t}/>
        })}
        {filteredSortedTasks.length === 0 &&
            <Typography variant={"body1"} style={{paddingLeft: '30px'}}>Tasks not found</Typography>}
    </div>
})