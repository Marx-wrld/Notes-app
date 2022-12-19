import { useMemo, useState } from "react"
import { Badge, Button, Card, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Tag } from "./App"
import styles from "./NoteList.module.css"

type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
}

export function NoteList({availableTags, notes}: NoteListProps){
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id))) //if our title is blank, that means dont do anything otherwise check if that note has the exact title in it. 
        })
    },[title, selectedTags, notes])
    return (
    <>
    <Row className="align-items-center mb-4">{/*will be for our title as well as the two buttons (create and edit tags)*/}
        <Col><h1>Notes</h1></Col>
        <Col xs="auto"> {/*will force our column to be as small as possible to fit all of our content*/}
            <Stack gap={2} direction="horizontal">
                <Link to="/new">
                    <Button variant="primary">Create</Button>
                </Link>
                <Button variant="outline-secondary">Edit Tags</Button>
            </Stack>
        </Col>
    </Row>
    <Form>
        <Row className="mb-4">
            <Col>
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)}></Form.Control>
                </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="tags">
                    <Form.Label>Tags</Form.Label>
                    <ReactSelect
                    /*handling what happens when we create a brand new tag*/
                    value={selectedTags.map(tag => {
                        return { label: tag.label, value: tag.id}
                    })} 
                    options={availableTags.map(tag => {
                        return {label: tag.label, value: tag.id}
                    })}
                    onChange={tags => {
                        setSelectedTags(tags.map(tag => {
                            return { label: tag.label, id: tag.value }
                        }))
                    }}
                    isMulti/>
                </Form.Group>
            </Col>
        </Row>
    </Form>
    {/*rendering out note cards*/}
    <Row xs={1} sm={2} lg={3} xl={4} className="g-3">{/*gap of three between the note cards*/}{/*extra small screen, small screen, large screen, extra large screen*/}
        {filteredNotes.map(note => ( //looping through the notes that are actually being filtered by our filter
        <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags}/> {/*rendering out our NoteCard*/}
        </Col>
        ))}

    </Row>
    </>
    )
}

function NoteCard({
    id, title, tags
}: SimplifiedNote) {
    return (
    <Card 
    as={Link} 
    to={'/${id}'} 
    className={'h-100 text-reset text-decoration-none ${styles.card}'}>
    <Card.Body>
        <Stack gap={2} className="align-items-center justify-content-center h-100">
            <span className="fs-5">
                {title}    
            </span>{/*font-size*/}
            {tags.length > 0 && (
                <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap">
                    {tags.map(tag => (
                        <Badge className="text-truncate" key={tag.id}>{tag.label}</Badge> 
                    ))}
                </Stack>
            )}
        </Stack>
    </Card.Body>
    </Card>
    )
}