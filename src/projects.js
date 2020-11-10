let projectList = [];

const projectCreator = (name, status = 'in progress', taskList = []) => {
  const getName = () => {
    return name
  }

  const _setName = (newName) => {
    return this.name = newName;
  }

  const getStatus = () => {
    return name
  } 

  const _setStatus = (newStatus) => {
    return this.status = newStatus;
  }
  
  const addToProjectList = () => {
    console.log('addToProjectList')
    projectList.push(this);
  } 
  
  const addTask = (taskToAdd) => {
    taskList.push(taskToAdd);
  }

  const getTasks = () => {
    return taskList
  }
  

  return { name, taskList, status, _setName, getName, _setStatus, getStatus, addToProjectList, addTask, getTasks }
}

export { projectCreator, projectList };
