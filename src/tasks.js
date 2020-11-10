let tasksToDo = [];

const taskCreator = (name, description, priority, dueDate, checklist) => {
  const setName = (newName) => {
    return this.name = newName;
  }

  const addToTaskList = () => {
    console.log('addToTaskList')
    // tasksToDo.push(this);
  } 

  return { name, description, priority, dueDate, checklist, addToTaskList, setName }
}




////////////////
export { taskCreator, tasksToDo };
