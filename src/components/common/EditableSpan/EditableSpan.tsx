import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    callback: (value: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [value, setValue] = useState(props.value)
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState('')

    const activateEditMode = () => {
        setIsEdit(true)
    }
    const deactivateEditMode = () => {
        setIsEdit(false)
    }
    const onBlurHandler = () => {
        setValue(props.value)
        setIsEdit(false)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (value.length) {
            setError('')
        }
        setValue(e.currentTarget.value)
    }
    const onEnterKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (value.trim().length) {
                props.callback(value)
                deactivateEditMode()
                setError('')
            } else {
                setError('Field is required')
            }
        }
    }

    return isEdit
        ? <div>
            <input type="text"
                   value={value}
                   onChange={onChangeHandler}
                   onBlur={onBlurHandler}
                   onKeyPress={onEnterKeyPressHandler}
                   autoFocus={true}
            />
            {error && <div>{error}</div>}
        </div>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
}