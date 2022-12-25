import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";

type EditableSpan = {
    value: string
    callback: (value: string) => void
}
export const EditableSpan: React.FC<EditableSpan> = (props) => {
    const [value, setValue] = useState(props.value)
    const [error, setError] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(()=>{
        setValue(props.value)
    }, [props.value])

    const activateEditMode = () => {
        setIsEdit(true)
    }
    const deactivateEditMode = () => {
        setIsEdit(false)
        setValue(props.value)
    }

    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (value.trim().length !== 0) {
                props.callback(value)
                deactivateEditMode()
            } else {
                setError('Filed is required')
                setValue('')
            }
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        if (value.trim().length === 0) {
            setError('')
        }
    }

    return isEdit
        ? <div>
            <input autoFocus={true}
                   type="text"
                   value={value}
                   onBlur={deactivateEditMode}
                   onKeyPress={onEnterPress}
                   onChange={onChangeInputHandler}
            />
            {error && <div>{error}</div>}
        </div>
        : <h5 onDoubleClick={activateEditMode}>{props.value}</h5>
}