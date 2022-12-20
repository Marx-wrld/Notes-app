import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note } from "./App"

type NoteLayoutProps = {
    notes: Note[]
}

export function NoteLayout({notes}: NoteLayoutProps){
    const { id } = useParams()
    const note =  notes.find(n => n.id === id ) //search through the notes and see if you can find a note with that same id  

    if (note == null) return <Navigate to="/" replace />

    return <Outlet context={note} /> //renders out one of the two routes 'show' or 'edit'
}

export function useNote(){
    return useOutletContext<Note>()
}