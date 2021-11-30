import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "@mui/material";
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError(true);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
       if (error) setError(false);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        {/*   <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
        />*/}
        <TextField error={error}
                   id="outlined-basic"
                   label="Title is required"
                   variant="outlined"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   onBlur={() => setError(false)}
                   className={error ? "error" : ""}
                   size={'small'}
                   style={{lineHeight: '10px'}}/>
        {/*<button onClick={addItem}>+</button>*/}
        <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', marginLeft: '10px'}}
                variant={"contained"}
                size={"small"}
                onClick={addItem}>+</Button>

        {error && <div className="error-message">Title is required!</div>}
    </div>
})
