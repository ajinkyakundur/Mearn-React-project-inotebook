import react, { useState } from "react";
import NoteContext from "./NoteContext";
import { json } from "react-router-dom";
const host = "http://localhost:5000"
const NoteState = (props) => {
    // const s1 ={
    //     "name":"Harry",
    //     "class":"5b"
    // }
    // const [state,setState] = useState(s1);
    // const update = ()=>{
    //     setTimeout(()=>{
    //         setState({
    //             "name":"Ajinkya",
    //             "class":"10b"
    //         })
    //     }, 10000)
    // }

    const notesInitials = [ ]
    const [notes, setNotes] = useState(notesInitials)
    const getNote = async () => {
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjYjBlNGMxNTY3YTJhZjJlMWRhMTFjIn0sImlhdCI6MTcwNzgxNTIzNn0.VZm404OCN1GFA_dK9mp0xXg4yJZzy5pPO4iK147aWpI "
            }
        });
        const json = await response.json()
       console.log(json)
       setNotes(json);
    }

        //Add a note
    const addNote = async (title, description, tag) => {
        //TODO api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjYjBlNGMxNTY3YTJhZjJlMWRhMTFjIn0sImlhdCI6MTcwNzgxNTIzNn0.VZm404OCN1GFA_dK9mp0xXg4yJZzy5pPO4iK147aWpI "

            },
            body: JSON.stringify({ title, description, tag })
        });


        console.log("Adding a new note.")
        const note = {
            "_id": "65cb5968163c62b356a0e640",
            "user": "65cb0e4c1567a2af2e1da11c",
            "title": title,
            "description": description,
            "tags": tag,
            "date": "2024-02-13T11:58:32.543Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }

    const deleteNote = async(id) => {
        //API call
           //API Call
           const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjYjBlNGMxNTY3YTJhZjJlMWRhMTFjIn0sImlhdCI6MTcwNzgxNTIzNn0.VZm404OCN1GFA_dK9mp0xXg4yJZzy5pPO4iK147aWpI "

            }
        });

        const json = response.json();
        console.log(json)
        console.log("Deleting the note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)

    }

    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes//updatenote/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVjYjBlNGMxNTY3YTJhZjJlMWRhMTFjIn0sImlhdCI6MTcwNzgxNTIzNn0.VZm404OCN1GFA_dK9mp0xXg4yJZzy5pPO4iK147aWpI "

            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        //Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }
    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;