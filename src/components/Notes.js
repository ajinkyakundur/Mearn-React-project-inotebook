import React, { useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNote } = context;
    const [note, setNote]= useState({etitle:"", edescription:"", etag:""})
    useEffect(() => {
        getNote()
    }, [])

    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({etitle: currentnote.title, edescription: currentnote.description, etag:currentnote.tag})
    }
    const ref = useRef(null)

    const handleClick =(e)=>{
        console.log("updating the note")
        e.preventDefault()
        // addNote(note.title, note.description,note.tag);

    }
    const onChange =(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            {/* <AddNote/> */}
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" value={note.edescription}  onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h3>Your Notes</h3>
                {notes.map((note) => {
                    return <NoteItem note={note} updateNote={updateNote} />
                })
                }
            </div>
        </>
    )
}

export default Notes
