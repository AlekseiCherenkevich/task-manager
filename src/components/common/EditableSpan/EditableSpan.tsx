import {ChangeEvent, FC, KeyboardEvent, memo, useEffect, useState} from "react";
import Typography from '@mui/material/Typography';


type EditableSpan = {
    variant?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'button' | 'caption' | 'overline'
    fontSize?: string
    value: string
    callback: (value: string) => void
}
export const EditableSpan: FC<EditableSpan> = memo( (props) => {
    const [value, setValue] = useState(props.value)
    const [error, setError] = useState('')
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    useEffect(()=>{
        if (value.trim().length!==0) {
            setError('')
        }
    },[value])

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
    }

    return <div style={{height: '40px'}}>
        {isEdit
            ? <div >
                <input autoFocus={true}
                       type="text"
                       value={value}
                       onBlur={deactivateEditMode}
                       onKeyPress={onEnterPress}
                       onChange={onChangeInputHandler}
                       style={{outline: 'none', fontSize: `${props.fontSize}`}}
                />
                {error && <div style={{color: 'red', fontSize: '12px'}}>{error}</div>}
            </div>
            : <Typography
                onDoubleClick={activateEditMode}
                variant={props.variant}
            >{props.value}</Typography>
        }
    </div>
})