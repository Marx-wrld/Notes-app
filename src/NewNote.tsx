import { NoteForm } from "./NoteForm";

export function NewNote(){
    return (
    <>
    <h1 className="mb-4">New Note</h1> {/*margin bottom*/}
    <NoteForm/>
    </>
    )
}