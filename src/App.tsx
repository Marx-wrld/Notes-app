import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from "react-bootstrap"
import { Routes, Route, Navigate } from "react-router-dom"
import { NewNote } from "./NewNote"
import { useLocalStorage } from "./useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

 export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData){
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)},]
    })
  }

  return (
  <Container className="my-4">{/*for margin top and bottom*/}
  <Routes>
    <Route path="/" element={<h1>Home</h1>}></Route>
    <Route path="/new" element={<NewNote />}></Route>
    <Route path="/:id">
      <Route index element={<h1>Show</h1>}></Route>
      <Route path="edit" element={<h1>Edit</h1>}></Route>
    </Route>
    <Route path="*" element={<Navigate to="/"/>}></Route>
  </Routes>
  </Container>
  )
}
export default App
