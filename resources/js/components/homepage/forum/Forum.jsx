import axios from "axios"
import { useEffect, useState } from "react"
import ForumThreads from "./ForumThreads";

export default function Forum(){

    const[forumData, setForumData]=useState({
        threads: [],
        posts: [],
    })


const ourDate = new Date('2023-11-21T08:30:00.000000Z').toLocaleDateString()
console.log(ourDate)

const forumThreads = async () => {
    try {
        const response = await axios.get("/api/forum/threads");
        setForumData({
            ...forumData,
            threads: response.data, 
        });
        
    } catch (error) {
        console.error("Error fetching forum threads:", error);
    }
};

useEffect(() => {
    forumThreads()
    
}, [])

console.log(forumData);

    return(
        
        <ForumThreads forumData={forumData} />
    )
}