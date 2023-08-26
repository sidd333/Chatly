import React, { useContext } from "react";
import { MdDelete, MdEditNote } from "react-icons/md";
import { NoteContext } from "../context/NoteContext";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { setModalOpen, setVisible, deleteNote, setEditId } = context;
  const { note } = props;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg inline-block">
      {/* <img className="w-full" src=".jpg" alt="Sunset in the mountains"> */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{note.title}</div>
        <p className="text-gray-700 text-base">{note.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          onClick={() => {
            setVisible(true);
            deleteNote(note._id);
          }}
        >
          <MdDelete />
        </button>
        <button
          className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          onClick={() => {
            setModalOpen(true);
            setEditId(note._id);
          }}
        >
          <MdEditNote />
        </button>
      </div>
    </div>
  );
};

export default Noteitem;
