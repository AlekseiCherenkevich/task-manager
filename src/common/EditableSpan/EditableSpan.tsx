import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

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
            <TextField id="outlined-basic"
                       label="Change text"
                       variant="outlined"
                       size="small"
                       value={localValue}
                       autoFocus={true}
                       onKeyPress={onKeyPressHandler}
                       onChange={onChangeValueHandler}
                       onBlur={onBlurHandler}
                       error={!!error}
                       helperText={error}
            />
            {error && <div>{error}</div>}
        </div>
        : <span onDoubleClick={onDoubleClickHandler}>{value}</span>
}