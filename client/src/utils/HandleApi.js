import axios from "axios";

const baseUrl = "http://localhost:5001/api/todo";

const getallToDo = (setToDo, page, limit) => {
  axios
    .get(`${baseUrl}?page=${page}&size=${limit}`)
    .then(({ data }) => {
      console.log("data --->", data.data);
      setToDo(data.data);
    });
};

const addToDo = (text, setText, setTodo) => {
  //text : which has to be update in db ,setText from useState,setTodo backend data
  axios
    .post(`${baseUrl}/save`, { text }) //to be passed in req.body
    .then((data) => {
      console.log(data); //response in form of data just console it
      setText(""); //empty the text field
      getallToDo(setTodo); //to reload the data after saving
    });
};

const updateToDo = (toDoId, text, setTodo, setText, setIsUpdate) => {
  //based on id need to update ,text for what to update,setText for clearing text field,

  axios
    .put(`${baseUrl}/update`, { _id: toDoId, text }) //to be passed in req.body
    .then((data) => {
      setText(""); //empty the text field
      setIsUpdate(false); //after updating
      getallToDo(setTodo); //to reload the data after saving
    })
    .catch((err) => console.log(err));
};

const deleteToDo = (toDoId, setTodo) => {
  axios
    .delete(`${baseUrl}/delete`, { data: { _id: toDoId } }) // Pass the payload in the `data` field
    .then((data) => {
      console.log(data);
      getallToDo(setTodo);
    })
    .catch((err) => console.log(err));
};

export { getallToDo, addToDo, updateToDo, deleteToDo };
