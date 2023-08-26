import React, { useContext, useEffect } from "react";
import { NoteContext } from "../context/NoteContext";
import Noteitem from "./Noteitem.jsx";
import { MdDelete } from "react-icons";
import { Alert } from "./Alert";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, setNotes, getNotes } = context;

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="grid-cols-3 mx-auto w-fit ">
      <Alert message={"deleted"} />
      {notes.length === 0 && (
        <div className="text-3xl text-center text-slate-400">
          Wow so empty !
        </div>
      )}
      {notes.map((note, index) => {
        return <Noteitem note={note} key={index} />;
      })}
    </div>
  );
};

export default Notes;
