import noteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const port = "http://localhost:5000";
  const [notes, setnotes] = useState([]);

  //Get all notes

  const getNotes = async () => {
    const response = await fetch(`${port}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setnotes(json);
  };

  // Add a note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${port}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setnotes(notes.concat(note));
  };
  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${port}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    const newNotes = notes.filter((note) => id !== note._id);
    setnotes(newNotes);
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    let i = notes.indexOf({ _id: id });
    const response = await fetch(`${port}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    notes[i] = await response.json();
    console.log(notes);
    setnotes(notes);
    getNotes();
  };
  return (
    <noteContext.Provider
      value={{ notes, addnote, deleteNote, getNotes, editNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
