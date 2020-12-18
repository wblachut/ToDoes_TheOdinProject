import { handleDOMEvents } from './handleDOMEvents';

function addBaseElements() {
  console.log('addBaseElements');
  const mainDiv = document.getElementById('main');
  const navbar = document.createElement('nav');
  const logoDiv = document.createElement('div');
  navbar.id = 'navbar';
  logoDiv.id = 'logo-div';
  logoDiv.innerHTML = `<img src="https://raw.githubusercontent.com/wblachut/Todos_TheOdinProject/main/dist/img/Logo.png">`;
  mainDiv.appendChild(navbar);
  navbar.appendChild(logoDiv);

  const topButtonsDiv = document.createElement('div');
  const addTaskButton = document.createElement('button');
  const menageProjectsButton = document.createElement('button');
  topButtonsDiv.id = 'top-buttons';
  addTaskButton.id = 'add-task-button';
  menageProjectsButton.id = 'menage-projects-button';
  addTaskButton.textContent = `+`;
  const menageProjectButtonContent = `<svg id="arrows-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z"/></svg> <span id="project-span"> Projects </span> `;
  menageProjectsButton.innerHTML = menageProjectButtonContent;
  navbar.appendChild(topButtonsDiv);
  topButtonsDiv.appendChild(addTaskButton);
  topButtonsDiv.appendChild(menageProjectsButton);

  const projectNavigation = document.createElement('aside');
  const newProjectButton = document.createElement('button');
  projectNavigation.id = 'projects-nav';
  newProjectButton.id = 'new-project-button';
  newProjectButton.innerHTML = `new project`;
  mainDiv.appendChild(projectNavigation);
  projectNavigation.appendChild(newProjectButton);

  handleDOMEvents();
}

export default addBaseElements;
