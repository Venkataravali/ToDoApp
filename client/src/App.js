import axios from "axios";
import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import {
  addToDo,
  getallToDo,
  updateToDo,
  deleteToDo
} from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [toDoId, setToDoId] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5); // number of items per page

  useEffect(() => {
    getToDoList(); // Load initial todo list
  }, [page, limit]); // Trigger reload whenever page or limit changes

  const getToDoList = () => {
    getallToDo(setToDo, page, limit);
  };

  const updateMode = (_id, text) => {
    setIsUpdate(true);
    setText(text);
    setToDoId(_id);
  };

  const handleDelete = (_id) => {
    deleteToDo(_id, setToDo);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleAddToDo = () => {
    addToDo(text, setText, setToDo);
    // Reset text field after adding todo
    setText("");
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Add ToDOs...."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div
            className="add"
            onClick={
              isUpdate
                ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdate)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdate ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => handleDelete(item._id)}
            />
          ))}
        </div>
        <div className=" text-end mb-10">
          <button className="btn btn-dark p-2 m-1"
            onClick={handlePreviousPage}
            disabled={page === 1} // Disable previous button if on the first page
          >
            Previous
          </button>
          <button className="btn btn-dark p-2 m-1"
           onClick={handleNextPage}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default App;