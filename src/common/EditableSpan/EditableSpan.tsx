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
            <input value={localValue}
                   autoFocus={true}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeValueHandler}
                   onBlur={onBlurHandler}
                   style={{borderRadius: '4px', fontSize: 'inherit',fontWeight: 'inherit' , outline: 'none', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
                       maxWidth: '100%'
            }}
            />
            {error && <div style={{fontSize: '14px', color: 'red'}}>{error}</div>}
        </div>
        : <span style={{wordWrap: 'break-word', maxWidth: '200px', minWidth: '50px'}}
                onDoubleClick={onDoubleClickHandler}>{value}</span>
}