import {useState} from "react";

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (event)=> {
        event.preventDefault();
        createBlog({title, author, url});
        setTitle('');
        setAuthor('');
        setUrl('');
    }

    return (
        <div>
            <h4>Add new blog</h4>
            <form onSubmit={addBlog} style={{
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
                paddingBottom: '10px'
            }}>
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" value={title}
                       onChange={({target}) => setTitle(target.value)}/>
                <label htmlFor="author">Author: </label>
                <input type="text" name="author" value={author}
                       onChange={({target}) => setAuthor(target.value)}/>
                <label htmlFor="url">URL: </label>
                <input type="text" name="url" value={url} onChange={({target}) => setUrl(target.value)}/>

                <button type="submit" style={{width: '50px', marginTop: '10px', padding: '5px'}}>Create
                </button>
            </form>
        </div>
    );
};

export default BlogForm;