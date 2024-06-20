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
  
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 0
  })
  const [darkMode, setDarkMode] = useState(false);
  
  //posts list containing all of our posts with setPostsList
  const [postsList, setPostsList] = useState([]);

  
  const getPosts = async () => {
    const postsUrl = import.meta.env.VITE_SERVER_POSTS;
    try{
      const response = await axios.get(`${postsUrl}?page=${pageInfo.currentPage}&limit=10`);
      setPostsList(response.data.postsList);
      setPageInfo((curr) => ({...curr, totalPages: response.data.totalPages}));

    }catch(err){
      console.error(err);
    }
  };

  useEffect( () => {
    getPosts();
  }, [pageInfo.currentPage])

  return (

    <>
    <main className={darkMode? "bg-black" : "bg-white"}>
      <Form/>

      <List
        postsList={postsList}
        pageInfo={pageInfo}
        setPageInfo={setPageInfo}
      />
    </main>
    </>
  )
}

export default App
