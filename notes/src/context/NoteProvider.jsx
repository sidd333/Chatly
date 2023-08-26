import { useState } from "react";
import { NoteContext } from "./NoteContext";

export const NoteProvider = (props) => {
  const host = "http://localhost:4000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3MWIxMDg0MTNmMWE0Y2MxZjMzYzVlIn0sImlhdCI6MTY4NjQ3NzA4MX0.M42tMhcyt-KgGEcp2R9VxnBmVaDDXo-JWxq5qsPyK-Y",
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  //add note
  const addNote = async (title, description, tag) => {
    //todo api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3MWIxMDg0MTNmMWE0Y2MxZjMzYzVlIn0sImlhdCI6MTY4NjcyMTMyOH0.cfxjaFeG-LCIBpFGeeyQ5RaR1RsAmVYWwPLlVSTpeQc",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const newNotes = notes.concat([{ title, description, tag }]);
    setNotes(newNotes);
  };

  //delete

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3MWIxMDg0MTNmMWE0Y2MxZjMzYzVlIn0sImlhdCI6MTY4NjQ3NzA4MX0.M42tMhcyt-KgGEcp2R9VxnBmVaDDXo-JWxq5qsPyK-Y",
      },
    });
    const json = await response.json();
    let newNote = notes.filter((item) => {
      return item._id !== id;
    });
    setNotes(newNote);
  };
  //edit
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3MWIxMDg0MTNmMWE0Y2MxZjMzYzVlIn0sImlhdCI6MTY4NjQ3NzA4MX0.M42tMhcyt-KgGEcp2R9VxnBmVaDDXo-JWxq5qsPyK-Y",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    //update in client
    console.log(notes);
    // let newNotes = JSON.parse(JSON.stringify(notes));
    // let newNotes = notes does not work because newNote will store the notes state and a state is immutable i.e; cannot be modified so we have to use stringify with parse or use spread operator
    let newNotes = [...notes];
    console.log(newNotes);

    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        if (title !== "") newNotes[i].title = title;
        if (description !== "") newNotes[i].description = description;
        if (tag !== "") newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        visible,
        setVisible,
        addNote,
        deleteNote,
        getNotes,
        modalOpen,
        setModalOpen,
        editNote,
        editId,
        setEditId,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
