import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

export const Addnote = () => {
  const context = useContext(noteContext);
  const { addnote } = context;

  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    console.log(note.title, note.description, note.tag);
    addnote(note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="my-3">Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary my-3"
          onClick={handleClick}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
