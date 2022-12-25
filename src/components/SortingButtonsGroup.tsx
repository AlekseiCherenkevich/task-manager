import {SortValuesType} from "../store/todolists-reducer";
import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type SortingButtonsGroupPropsType = {
    sort: SortValuesType
    callback: (sort: SortValuesType) => () => void
}

export const SortingButtonsGroup: React.FC<SortingButtonsGroupPropsType> = ({sort, callback}) => {
    return <Stack direction={"row"}
                  style={{display: 'flex', justifyContent: 'center'}}
    >
        <Button onClick={callback("default")}
                variant={sort==="default"?"contained":"outlined"}
        >Default</Button>
        <Button onClick={callback("A-z")}
                variant={sort==="A-z"?"contained":"outlined"}
        >A-z</Button>
        <Button onClick={callback("z-A")}
                variant={sort==="z-A"?"contained":"outlined"}
        >z-A</Button>
    </Stack>
}