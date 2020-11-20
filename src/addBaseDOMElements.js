import { handleDOMEvents } from './handleDOMEvents';
 

function addBaseElements() {
  console.log('addBaseElements')

  const mainDiv = document.getElementById('main');
  const navbar = document.createElement('nav');
  navbar.id = 'navbar';
  mainDiv.appendChild(navbar);
  
  const logoDiv = document.createElement('div');
  logoDiv.id = 'logo-div';
  logoDiv.innerHTML = `<img src="https://raw.githubusercontent.com/wblachut/Todos_TheOdinProject/main/src/img/Logo.png">`;
  navbar.appendChild(logoDiv);

  const topButtonsDiv = document.createElement('div');
  topButtonsDiv.id = 'top-buttons';
  navbar.appendChild(topButtonsDiv);

  const addTask = document.createElement('button');
  addTask.id = 'add-task-button';
  addTask.textContent = `+`;
  topButtonsDiv.appendChild(addTask);

  const menageProjectsButton = document.createElement('button');
  menageProjectsButton.id = 'menage-projects-button';
  menageProjectsButton.innerHTML = `˂`;
  topButtonsDiv.appendChild(menageProjectsButton);
  
  const projectNavigation = document.createElement('aside');
  projectNavigation.id = 'projects-nav'
  mainDiv.appendChild(projectNavigation);
  const newProjectButton = document.createElement('button');
  newProjectButton.id = 'new-project-button';
  newProjectButton.innerHTML = `new project`;
  projectNavigation.appendChild(newProjectButton)

  handleDOMEvents();

  

  
  



}

export default addBaseElements;