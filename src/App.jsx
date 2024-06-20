import { useEffect, useState } from "react"
import Form from "./components/Form"

function App() {

  // useEffect(()=>{
  //   const id = setInterval(() => {
  //     setDarkMode(curr => !curr)
  //   }, 5000);
  //   return () => {
  //     clearInterval(id);
  //   }
  // }, []);

  const [darkMode, setDarkMode] = useState(false);

  return (

    <>
    <main className={darkMode? "bg-black" : "bg-white"}>
      <Form/>
    </main>
    </>
  )
}

export default App
