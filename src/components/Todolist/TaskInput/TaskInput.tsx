import React from "react";
import Input from "../../common/Input/Input";

type TaskInputPropsType = {
    addNewTask: (taskTitle: string) => void
}

export const TaskInput: React.FC<TaskInputPropsType> = ({addNewTask}) => {
    return <div>
        <Input callback={addNewTask}/>
    </div>
}