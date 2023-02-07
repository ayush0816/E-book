import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { Addnote } from "./Addnote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, editNote } = context;
  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);
  const updateNote = (curnote) => {
    ref.current.click();
    setnote({
      id: curnote._id,
      etitle: curnote.title,
      edescription: curnote.edescription,
    });
  };

  const handleClick = (e) => {
    // e.preventDefault();
    console.log(note);
    editNote(note.id, note.etitle, note.edescription, "default");
    refClose.current.click();
    props.showAlert("Updated Successfully", "Success");
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h3>Your Notes</h3>
        {notes.map((note) => {
          return (
            <NoteItem
              updateNote={updateNote}
              notes={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
