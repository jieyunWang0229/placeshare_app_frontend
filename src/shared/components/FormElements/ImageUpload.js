import React,{ useRef, useEffect,useState } from "react";
import classes from './ImageUpload.module.css';
import Button from "./Button";


const ImageUpload = (props) =>{
    const [file, setFile] = useState();
    const [isValid, setIsValid] = useState(false);
    const [previewUrl, setPreviewUrl] = useState();
    const filePickRef = useRef();

    useEffect(()=>{
        if(!file){
            return 
        }
        const fileReader = new FileReader();
        fileReader.onload = () =>{
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);


    },[file]);

    const pickedImageChangehandler =(event)=>{
        let pickedFile;
        let fileIsValid = isValid;
        if(event.target.files.length == 1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
            console.log(1);
        }else{
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid)

    }
    const pickImageHandler=()=>{
        filePickRef.current.click();

    }

    return (
        <div className={classes.formcontrol}>
            <input
                id={props.id}
                style ={{ display: 'none'}}
                type = "file"
                accept ="./jpg,.png,.jpeg"
                ref={filePickRef}
                onChange={pickedImageChangehandler}
            />
            <div className={`${classes.imageupload} ${classes.center}`}>
                <div className={classes.imageuploadpreview}>
                    {previewUrl && <img src={previewUrl} alt="Preview"/>}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
            
        </div>

    )

};

export default ImageUpload;