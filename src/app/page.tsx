"use client"
import { Todo } from "@/models/todo.model";
import axios from "axios";
import { error } from "console";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Task{
  _id:string;
  task:string;
  completed:boolean;
  _v:number;
}
export default function Home() {
  const [message, setMessage] = useState<Task[]>([])
  const [inputValue, setInputValue] = useState("")
  const [responseMessage, setResponseMessage] = useState("")
  const [taskId, setTaskId] = useState("")
  const route = useRouter()
  /*const fetchData = async () => {
     try {
       const response = await axios.get('/api/testDbConnection')
      // console.log(response.data.message)
      // setMessage(response.data.message)
       const responeArray :Task[]= response.data.message || [];
       // console.log(responeArray);
      setMessage(responeArray)
      
    } catch (error:any) {
       console.log(error.message);
      
     }
   }*/

     const fetchData = async ()=>{
      try {
        const response = await axios.get('/api/getTask')
        // console.log(response.data.message);
        setMessage(response.data.message|| [])
        

      } catch (error:any) {
        console.log(error.message)
      }
     }

     const postTask = async (event:any)=>{
      event.preventDefault();
      try {
        const response = await axios.post('/api/postTask',{
          task: inputValue
        })
        setResponseMessage(response.data.message)
        route.replace("/")
      } catch (error) {
        setResponseMessage('An Error Occured')
        console.error("Error: ",error);
      }
     }

     const deleteTask = async ()=>{
     try {
      const response = await axios.delete('/api/deleteTask',{
        data: taskId
      })

      alert(response.data.message)
      route.replace("/")
     } catch (error) {
      console.error('Error deleting the document:', error);
      alert('An error occurred');
     }
     }
     

 
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col justify-around items-center">
      <h1 className="text-4xl font-semibold font-serif">To Do List</h1>

      <input type="text" name="" id="" value={inputValue} onChange={(e)=> setInputValue(e.target.value)} placeholder="Enter Task" className="p-2 text-black rounded-xl" />
      <button className="bg-black p-4 border-2 rounded-xl cursor-pointer" type="submit" onClick={postTask}>Add Tasks</button>
      <ul>
        {message.map((msg)=>(
          <li key={msg._id} className="mb-2 p-2 flex flex-row justify-between items-center">
            <p className="border p-2 border-r-0 w-full">{msg.task}</p>   
            <button className="h-full p-2 border-2 border-red-900 bg-red-900" onClick={()=>{
              setTaskId(msg._id)
              deleteTask()
            }}>X</button></li>
        ))}
      </ul>

      <button className="bg-black p-4 border-2 rounded-xl cursor-pointer" onClick={fetchData}>Fetch Tasks</button>
    </main>
  );
}
