const TodoModel = require("../models/TodoModel");

module.exports.getToDo = async (req, res) => {
  // const toDo = await TodoModel.find();
  //  res.send(toDo);
  let { page, size } = req.query;
  if (!page) {
    page = 1; //defaault page
  }
  if (!size) {
    size = 10; //default size
  }

  //now need to use skip or limit functionality in db
  //now need to limit the number of docs that's we want to send client
  //limit comes from size
  const limit = parseInt(size); //parsing integer bcs size is string
  const skip = (page - 1) * size;

  //  const toDo = await TodoModel.find({},{},{limit: limit, skip: skip});
  //if your mongoose there is another way to use limit and skip things
  const toDo = await TodoModel.find().limit(limit).skip(skip); //query

  res.send({
    page,
    size,
    data: toDo,
  });
  // //
};

//saving todo

module.exports.saveToDo = (req, res) => {
  const { text } = req.body;

  TodoModel.create({ text })
    .then((data) => {
      console.log("Added Successfully");
      console.log(data);
      res.send(data);
    })
    .catch((error) => {
      console.error("Error occurred while saving ToDo:", error);
      res.status(500).send("An error occurred while saving ToDo");
    });
};

//updating todo

module.exports.updateToDo = async (req, res) => {
  const { _id, text } = req.body;
  TodoModel.findByIdAndUpdate(_id, { text })
    .then(() => res.status(201).send("Updated Successfully"))
    .catch((err) => console.log(err));
};

//Deleting todo
module.exports.deleteToDo = async (req, res) => {
  const { _id } = req.body;
  TodoModel.findByIdAndDelete(_id)
    .then(() => res.status(201).send("Deleted Successfully..."))
    .catch((err) => console.log(err));
};
