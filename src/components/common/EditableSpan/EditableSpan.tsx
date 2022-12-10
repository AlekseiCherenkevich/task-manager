import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

type EditableSpanPropsType = {
    value: string
    callback: (value: string) => void
    isTodolistTitle?: boolean
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [value, setValue] = useState(props.value)
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState('')

    const activateEditMode = () => {
        setError('')
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
        if (value.length === 0) {
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
        ? <div style={{display: "inline"}}>
            <TextField type="text"
                       value={value}
                       size={"small"}
                       variant={"standard"}
                       onChange={onChangeHandler}
                       onBlur={onBlurHandler}
                       onKeyPress={onEnterKeyPressHandler}
                       autoFocus={true}
                       style={{maxWidth: '180px', minWidth: '180px'}}
            />
            {error && <div>{error}</div>}
        </div>
        : <span onDoubleClick={activateEditMode} style={{display: 'inline', marginTop: '6px'}}>
            {props.isTodolistTitle ? <Typography variant="h6" gutterBottom>{props.value}</Typography> : props.value}
        </span>
}