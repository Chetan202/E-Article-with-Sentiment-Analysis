import React, { useState, useEffect, useContext } from 'react';
import { Box, makeStyles, TextareaAutosize, Button, FormControl, InputBase } from '@material-ui/core';
import { AddCircle as Add, CallEnd } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';

import { createPost, uploadFile } from '../../service/api';
//import { details } from '../login/login';
import { currentUser } from '../login/login';

const useStyle = makeStyles(theme => ({
    container: {
        margin: '50px 100px',
        [theme.breakpoints.down('md')]: {
            margin: 0
        },
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    title: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    textfield: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25
    },
    textarea: {
        width: '100%',
        border: 'none',
        marginTop: 50,
        fontSize: 18,
        '&:focus-visible': {
            outline: 'none'
        }
    }
}));

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {
    const classes = useStyle();
    const history = useHistory();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [imageURL, setImageURL] = useState('');
    

    const url = post.picture ? post.picture : 'https://cdn.pixabay.com/photo/2017/10/10/21/47/laptop-2838921_960_720.jpg';
    
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const image = await uploadFile(data);
                post.picture = image.data;
                setImageURL(image.data);
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All'
        post.username = currentUser;
    }, [file])

    const savePost = async () => {
        await createPost(post);
        history.push('/');
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Box className={classes.container}>
            <img src={url} alt="post" className={classes.image} />

            <FormControl className={classes.title}>
                <label htmlFor="fileInput">
                    <Add className={classes.addIcon} fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputBase onChange={(e) => handleChange(e)} name='title' placeholder="Title" className={classes.textfield} />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </FormControl>

            <TextareaAutosize
                rowsMin={5}
                placeholder="Tell your story..."
                className={classes.textarea}
                name='description'
                onChange={(e) => handleChange(e)} 
            />
        </Box>
    )
}

export default CreatePost;