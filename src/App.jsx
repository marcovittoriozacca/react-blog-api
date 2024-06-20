import { useEffect, useState } from "react"
import axios from "axios";
import Form from "./components/Form"
import List from "./components/List";

function App() {

  // useEffect(()=>{
  //   const id = setInterval(() => {
  //     setDarkMode(curr => !curr)
  //   }, 5000);
  //   return () => {
  //     clearInterval(id);
  //   }
  // }, []);
  
  const [currPage, setCurrPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  
  //posts list containing all of our posts with setPostsList
  const [postsList, setPostsList] = useState([]);

  const postsUrl = import.meta.env.VITE_SERVER_POSTS;

  const getPosts = async () => {
    try{
      const response = await axios.get(`${postsUrl}?page=${currPage}&limit=10`);
      setPostsList(response.data.postsList);
    }catch(err){
      console.error(err);
    }
  };
  
  useEffect( () => {
    getPosts();
  }, [currPage])

  return (

    <>
    <main className={darkMode? "bg-black" : "bg-white"}>
      {/* <Form/> */}

      <List
        postsList={postsList}
      />
    </main>
    </>
  )
}

export default App
