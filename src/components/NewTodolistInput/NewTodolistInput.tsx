import React from "react";
import Input from "../common/Input/Input";

type NewTodolistInputPropsType = {
    addNewTodolist: (todolistTitle: string) =>void
}

export const NewTodolistInput: React.FC<NewTodolistInputPropsType> = ({addNewTodolist}) => {
    return <div>
        <Input placeholder={'Enter todolist title'} callback={addNewTodolist}/>
    </div>
}