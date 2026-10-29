import React, { useState } from "react"
export default function TaskForm(addTask){
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("Moyenne")
    const [category, setCategory] = useState("General")

    const handlesubmit = ()=>{
        addTask({tex:task, priority, catrgory, completed: false})
    }
    return(
        <>
        <form  onSubmit={handlesubmit} className="task-form">
            <div id="inp">
                <input type="text" placeholder="Enter Your Task" onChange={(e)=>setTask(e.target.value)}/>
                <span><button type="submit">Add Task</button></span>
            </div>
            <div id="btns">
                <select onChange={(e)=>setPriority(e.target.value)}>
                    <option value="haut">Haut</option>
                    <option value="moyenne">Moyenne</option>
                    <option value="bas">Bas</option>
                </select>
                <select onChange={(e)=>setCategory(e.target.value)}>
                    <option value="General">General</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>

                </select>
            </div>
        </form>
       </>
    )
}