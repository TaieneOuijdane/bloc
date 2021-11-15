import React, {useState, useEffect} from 'react'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'
import { Link } from "react-router-dom"
import {useNavigate} from 'react-router-dom';
import { useParams } from "react-router";

const Note = () => {
    var params = useParams();
    const navigate = useNavigate();

    let noteId = params.id;
    let [note, setNote]= useState(null)

    useEffect( () => {
        getNote();
    },[noteId])

    let getNote = async() => {
        if(noteId === 'new') return
        let response = await fetch(`http://localhost:5000/notes/${noteId}`);
        let data = await response.json()

        setNote(data)
    }
    let createNote = async() => {
        await fetch(`http://localhost:5000/notes/`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }
    let updateNote = async() => {
        await fetch(`http://localhost:5000/notes/${noteId}`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let deleteNote = () =>{
        fetch(`http://localhost:5000/notes/${noteId}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        navigate('/')
    }

    let handleSubmit = () => {
        if(noteId != 'new' && !note.body){
            deleteNote();
        }
        else if(noteId !== 'new'){
            updateNote();
        }
        else if(noteId === 'new' && note != null){
            createNote();
        }
        navigate('/')
    }
    return (
        <div className="note">
            <div div className="note-header">
            <h3>
                <Link to="/">
                    <ArrowLeft onClick={handleSubmit}/>
                </Link>
            </h3>
            {noteId !== 'new' ? (
            <button onClick={deleteNote}>Supprimer</button>
            ):(
                <button onClick={handleSubmit}>Enregistrer</button>

            )}
            </div>
            <textarea onChange={(e) => {setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
        </div>
    )
  };
export default Note