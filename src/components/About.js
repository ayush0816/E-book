import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

export const About = () => {
  const a = useContext(noteContext);

  return <div>This is About</div>;
};
