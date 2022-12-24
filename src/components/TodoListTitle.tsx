import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type TodoListTitlePropsType = {
    todoListIdx: number
    todoTitle: string
    changeTodoListTitle: (todoListIdx: number, todoListTitle: string) => void
}

export const TodoListTitle: React.FC<TodoListTitlePropsType> = (props) => {
    const {todoListIdx, todoTitle, changeTodoListTitle} = props
    const [todoListTitle, setTodoListTitle] = useState<string>('')
    const [isEditMode, setIsEditMode] = useState<boolean>(false)


    const activateEditMode = () => setIsEditMode(true)
    const deactivateEditMode = () => setIsEditMode(false)

    const onChangeTodoListTitle = (e: ChangeEvent<HTMLInputElement>) => setTodoListTitle(e.currentTarget.value)
    const onEnterPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            if (todoListTitle.trim()) {
                changeTodoListTitle(todoListIdx, todoListTitle)
            }
            deactivateEditMode()
            setTodoListTitle('')
        }
    }

    return isEditMode
        ? <input
            value={todoListTitle}
            onChange={onChangeTodoListTitle}
            onBlur={deactivateEditMode}
            onKeyPress={onEnterPressInputHandler}
            type="text"
            className='editModeTodoTitleInput'
            autoFocus={true}
        />
        : <h3 onDoubleClick={activateEditMode}>{todoTitle}</h3>
}