import { taskCreator } from './tasks';

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
  
  const addToProjectList = (list = projectList) => {
    list.push(this);
  } 
  
  const addTask = (taskToAdd) => {
    taskList.push(taskToAdd);
  }

  const getTasks = () => {
    return taskList
  }
  

  return { name, taskList, status, _setName, getName, _setStatus, getStatus, addToProjectList, addTask, getTasks }
}

const getDefPList = function getDefaultProjectList(projectList = []) {
  const projectDefault = projectCreator('Default Project');
  const theProject = projectCreator('The Project');
  const task1 = taskCreator('Cleaning', 'do the cleaning of my room', 'relevant', '2020-11-11', ['make the bed', 'vaccum' , 'clean windows', 'clean surfaces', 'empty the trash'], 'just some cleaning nannanananan, tadada, nanananannaanna, taadadadat')
  const task2 = taskCreator('Programming', 'learn JS React and Angular', 'important', '2020-12-01',[ 'Finish ToDos' ,'make MB website', 'finish React'])
  const task3 = taskCreator('Christmas', 'Prepare for Christmas', 'minor', '2020-12-20', ['order presents','do the shopping', 'clean house','pack gifts', 'prepare meals'])
  projectDefault.addTask(task1);
  projectDefault.addTask(task2);
  projectDefault.addTask(task3);
  theProject.addTask(task3);
  projectList.push(projectDefault, theProject);
  return projectList
}

const projectList = JSON.parse(localStorage.getItem('projectList')) || getDefPList();



export { projectCreator, projectList };
