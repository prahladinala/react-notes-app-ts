import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { NoteList } from "./NoteList";
import NoteLayout from "./NoteLayout";
import Note from "./Note";
import EditNote from "./EditNote";

export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  // USE STATE
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  // USE MEMO
  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  // CREATE NOTE FUNCTION
  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  // UPDATE NOTE FUNCTION
  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            id: uuidV4(),
            tagIds: tags.map((tag) => tag.id),
          };
        } else {
          return note;
        }
      });
    });
  }

  // ON DELETE FUNCTION
  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  // ADD TAG FUNCTION
  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }
  // UPDATE TAG FUNCTION
  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  // DELETE TAG FUNCTION
  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  return (
    <Container>
      <Routes>
        {/* HOME ROUTE - Default Route / View all Notes */}
        <Route
          path="/"
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              onUpdateTag={updateTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        {/* NEW ROUTE - Add new Notes */}
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              avaliableTags={tags}
            />
          }
        />
        {/* VIEW AND EDIT ROUTE - View and Edit Notes */}
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                avaliableTags={tags}
              />
            }
          />
        </Route>
        {/* ANY OTHER ROUTE - Redirect to Home Page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
