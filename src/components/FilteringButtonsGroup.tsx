import {FilterValuesType} from "../store/todolists-reducer";
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type FilteringButtonsGroupPropsType = {
    filter: FilterValuesType
    callback: (filter: FilterValuesType) => () => void
}

export const FilteringButtonsGroup: React.FC<FilteringButtonsGroupPropsType> = ({filter, callback}) => {
    return <Stack direction={"row"}
                  style={{display: 'flex', justifyContent: 'center'}}
    >
        <Button onClick={callback("all")}
                variant={filter==="all"?"contained":"outlined"}
        >All</Button>
        <Button onClick={callback("active")}
                variant={filter==="active"?"contained":"outlined"}
        >Active</Button>
        <Button onClick={callback("completed")}
                variant={filter==="completed"?"contained":"outlined"}
        >Completed</Button>
    </Stack>
}