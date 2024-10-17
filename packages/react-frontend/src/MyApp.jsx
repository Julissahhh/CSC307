// src/MyApp.jsx
import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const id = characters[index].id
    console.log(id)
    fetch((`http://localhost:8000/users/${id}`), {
      method: "DELETE"
    })
      // console.log("here")
      .then((res) => {
        if (res.status === 204) {
          console.log("removed")
          const updated = characters.filter((character, i) => i !== index);
          setCharacters(updated);
        } else if (res.status === 404) {
          console.log("Resource not found");
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }
    
  //   .then((res) => {
  //     if (res.status === 204){
  //       const updated = characters.filter((character, i) => {
  //           return i !== index;
  //         });
  //         setCharacters(updated);
  //     }
  //     else if(res.status === 404){
  //       console.log("resource not found")
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });
  
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp;