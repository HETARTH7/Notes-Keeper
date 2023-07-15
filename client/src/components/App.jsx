import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    axios
      .post(`http://localhost:5000/delete/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setNotes((prevNotes) => {
      return prevNotes.filter((index) => {
        return index._id !== id;
      });
    });
    console.log(notes);
  }
  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
