import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    value: string
    callback: (value: string) => void

}

export const EditableSpan: React.FC<EditableSpanPropsType> = ({value, callback}) => {
    const [localValue, setLocalValue] = useState(value)
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState('')

    const onDoubleClickHandler = () => setEdit(true)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            if (localValue.trim().length) {
                callback(localValue)
                setEdit(false)
                setError('')
            } else {
                setError('Field is required!')
            }
        }
    }
    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => setLocalValue(e.currentTarget.value)
    const onBlurHandler = () => {
        setLocalValue(value)
        setEdit(false)
        setError('')
    }

    return edit
        ? <div>
            <input type="text"
                   value={localValue}
                   autoFocus={true}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeValueHandler}
                   onBlur={onBlurHandler}
            />
            {error && <div>{error}</div>}
        </div>
        : <span style={{fontSize: '20px', fontWeight: 'bold'}} onDoubleClick={onDoubleClickHandler}>{value}</span>
}