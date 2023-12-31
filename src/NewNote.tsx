import React from "react";
import NoteForm from "./NoteForm";
import { NoteData, Tag } from "./App";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  avaliableTags: Tag[];
};

const NewNote = ({ onSubmit, onAddTag, avaliableTags }: NewNoteProps) => {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        avaliableTags={avaliableTags}
      />
    </>
  );
};

export default NewNote;
