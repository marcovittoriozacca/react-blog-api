import { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {

const [categories, setCategories] = useState([]);
const  [tags, setTags] = useState([]);

const getCategories = async () => {
    const categoriesUrl = import.meta.env.VITE_SERVER_CATEGORIES;
    try{
        const response = await axios.get(`${categoriesUrl}`)
        setCategories(response.data.categories)
    }catch(err){
        console.error(err);
    }
}

const getTags = async () => {
    const tagsUrl = import.meta.env.VITE_SERVER_TAGS;
    try{
        const response = await axios.get(`${tagsUrl}`)
        setTags(response.data.tags)
    }catch(err){
        console.error(err);
    }
}

useEffect(() => {
    getCategories();
    getTags();
  }, []);



    const resetFormData = {
        title: '',
        content: '',
        image: '',
        categoryId: '',
        tags: [],
        published: false,
    }

    // post object with setPost 
    const [post, setPost] = useState(resetFormData);

    const [published, setPublished] = useState(false);

    

    //prevent the form from reloading the page on submit
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    //new post creation function with a super basic non bulletproof validation
    const createPost = async () => {
        const postsUrl = import.meta.env.VITE_SERVER_POSTS;
        const {title, content, categoryId, tags} = post;
        if(!title || title.trim().length === 0 || !content || content.trim().length === 0 || !categoryId || tags.length < 1){
            throw new Error("😔😔😔😔😔😔😔😔😔😔😔😔😔😔 Just do it properly 😔😔😔😔😔😔😔😔😔😔😔😔😔😔")
        }

        const response = await axios.post(`${postsUrl}`, post, {headers: {
            "Content-Type": "multipart/form-data"
        }});
        console.log(response);
        // setPostsList((posts) => [post, ...posts]);
        setPost(resetFormData);
        setPublished(false);
    }

    //general function to update every key inside our post object
    const handlePostElement = (e) => {
        setPost(curr => ({...curr, [e.target.name]: e.target.value}))
    }

    //specific function to handle checkboxes change for our post
    const handleCheckboxElements = (tag) => {
        setPost((curr) => ({...post, tags: post.tags.includes(tag)? post.tags.filter( (t) => t !== tag ) : [...post.tags, tag] }) )
    }
    //change the value of the published state
    const handlePublishing = (e) => {
        setPublished((curr) => e.target.checked)
    }
    
    
    useEffect(()=>{
        if(published){
            alert("This Post will be published")
        }
        setPost((curr) => ({...curr, published: published}))
    }, [published])
    
    return(<>
        <form className="formStyle" onSubmit={handleSubmit}>
            {/* title input field */}
            <div className="inputWrapper">
                <label htmlFor="title" className="label">Title</label>
                <input type="text" id="title" value={post.title} name="title" onChange={handlePostElement} />
            </div>

            {/* content input field */}
            <div className="inputWrapper">
                <label htmlFor="content" className="label">Content</label>
                <textarea name="content" id="content" cols="30" rows="10" value={post.content} onChange={handlePostElement}></textarea>
            </div>

            <div className="flex items-center gap-x-10">
                {/* image input field */}
                <div className="inputWrapper">
                    <label htmlFor="image" className="label">Image</label>
                    
                    <input type="file" name="image" id="image" onChange={(e) => setPost(curr => ({...curr, image: e.target.files[0]}))} />
                </div>

                {/* select category field */}
                <div className="inputWrapper">
                    <label htmlFor="categoryId" className="label">Category</label>
                    <select name="categoryId" id="categoryId" value={post.categoryId} onChange={handlePostElement}>
                        <option value="" disabled>Select a category...</option>
                        {categories?.map((cat, i) => (
                            <option key={`categoryId-${cat.id}`} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* checkbox tags field */}
            {tags?.map( (tag,i) => (
                <div key={`tags-${tag.id}`} className="flex items-center gap-x-3">
                    <label htmlFor={tag} className="label"> {tag.name} </label>
                    <input 
                        type="checkbox" 
                        name="tags" 
                        id={tag} 
                        checked={post.tags.includes(tag.id)}
                        onChange={() => handleCheckboxElements(tag.id)}
                        />
                </div>
            ) )}

            {/* published checkbox field */}
            <div className="flex items-center gap-x-3 bg-neutral-300 p-3">
                <label htmlFor="published" className="label">Publish post</label>
                <input type="checkbox" name="published" id="published" checked={published} onChange={(e) => handlePublishing(e)} />
            </div>

            <button type="submit" className="createBtn" onClick={createPost}>Create</button>
        </form>        
    </>)
}

export default Form;