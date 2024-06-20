import { useEffect, useState } from "react";
import List from "./List";

const Form = () => {
    const resetFormData = {
        title: '',
        content: '',
        image: '',
        category: '',
        tags: [],
        published: false,
    }
    const categories = ["Travel", "Food & Drink", "Technology", "Lifestyle", "Fitness & Health"];
    const tags = ["Travel", "Food", "Technology", "Lifestyle", "Fitness", "Health", "DIY", "Fashion"];

    // post object with setPost 
    const [post, setPost] = useState(resetFormData);

    //posts list containing all of our posts with setPostsList
    const [postsList, setPostsList] = useState([]);

    const [published, setPublished] = useState(false);

    

    //prevent the form from reloading the page on submit
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    
    //new post creation function with a super basic non bulletproof validation
    const createPost = () => {
        const {title, content, category, tags} = post;
        if(!title || title.trim().length === 0 || !content || content.trim().length === 0 || !category || tags.length < 1){
            throw new Error("😔😔😔😔😔😔😔😔😔😔😔😔😔😔 Just do it properly 😔😔😔😔😔😔😔😔😔😔😔😔😔😔")
        }
        setPostsList((posts) => [post, ...posts]);
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
                    <input type="text" id="image" name="image" value={post.image} onChange={handlePostElement} />
                </div>

                {/* select category field */}
                <div className="inputWrapper">
                    <label htmlFor="category" className="label">Category</label>
                    <select name="category" id="category" value={post.category} onChange={handlePostElement}>
                        <option value="">Select a category...</option>
                        {categories.map((cat, i) => (
                            <option key={`category-${i}`} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* checkbox tags field */}
            {tags.map( (tag,i) => (
                <div key={`tags-${i}`} className="flex items-center gap-x-3">
                    <label htmlFor={tag} className="label"> {tag} </label>
                    <input 
                        type="checkbox" 
                        name="tags" 
                        id={tag} 
                        checked={post.tags.includes(tag)}
                        onChange={() => handleCheckboxElements(tag)}
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

        <List posts={postsList} setPosts={setPostsList}/>
        
    </>)
}

export default Form;