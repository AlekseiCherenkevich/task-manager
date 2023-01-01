import React, {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type AddItemFormType = {
    onClick: (value: string) => void
    placeholder?: string
}

export const AddItemForm: React.FC<AddItemFormType> = React.memo( (props) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')
    useEffect(()=>{
        if (value.trim().length!==0) {
            if (!!error) {
                setError('')
            }
        }
    },[value])

    const onChangeHandler = useCallback ((e:ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }, [props.onClick])
    const onCLickHandler = () => {
        if (value.trim().length!==0) {
            props.onClick(value)
            setValue('')
        } else {
            setError('Field is required')
            setValue('')
        }
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onCLickHandler()
        }
    }
    const onBlurHandler = () => {
        setError('')
    }


    return <div style={{height: '70px'}}>
        <TextField value={value}
                   onChange={onChangeHandler}
                   onBlur={onBlurHandler}
                   onKeyPress={onEnterPressHandler}
                   error={!!error}
                   label={props.placeholder}
                   helperText={error}
                   size={"small"}
                   />
        <Button size={"small"}
                variant={"contained"}
                style={{minHeight: '40px', maxHeight: '40px', minWidth: '40px', maxWidth: '40px'}}
            onClick={onCLickHandler}
        >+</Button>
    </div>
})

