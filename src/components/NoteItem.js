import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { notes, updateNote } = props;
  return (
    <div className="card my-3 col-md-3 mx-3">
      <div className="card-body">
        <h5 className="card-title">{notes.title}</h5>
        <p className="card-text">{notes.description}</p>
        <i
          className="fa-solid fa-trash-can mx-2"
          onClick={() => {
            deleteNote(notes._id);
            props.showAlert("Deleted Successfully", "Success");
          }}
        ></i>
        <i
          className="fa-solid fa-file-pen mx-2"
          onClick={() => updateNote(notes)}
        ></i>
      </div>
    </div>
  );
};

export default NoteItem;
