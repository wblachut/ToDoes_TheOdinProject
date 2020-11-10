import { taskCreator, tasksToDo } from './tasks';
import { projectCreator, projectList } from './projects';


const handleDOMEvents = () => {
  console.log('handleDOMEvents')
  const mainDiv = document.getElementById('main');
  const container = document.createElement('div');
  container.id = 'container';
  mainDiv.appendChild(container)
  
  const menageProjectsButton = document.getElementById('menage-projects-button')
  const projectsNav = document.getElementById('projects-nav');
  const newProjectButton = document.getElementById('new-project-button');

  const newProjectUl = document.createElement('ul');
  newProjectUl.innerHTML = `<li> <input type="text" id="project-name-input" placeholder="New project name" autofocus></li>
  <li> <button id="add-project-button">add new Project</button> </li>`
  newProjectUl.id = 'new-project-ul';
  projectsNav.insertBefore(newProjectUl, projectsNav.children[0].nextElementSibling);


  menageProjectsButton.addEventListener('click', toggleProjects);
  newProjectButton.addEventListener('click', showAddProjectOption);
  
  function toggleProjects() {
    projectsNav.classList.toggle('active')
    menageProjectsButton.classList.toggle('active')
    if (menageProjectsButton.classList.contains('active')) {
      menageProjectsButton.textContent = ' Projects '
    } else {
      menageProjectsButton.textContent = '˂'
    }
  }

  function showAddProjectOption() {
    newProjectUl.classList.toggle('active')
    // projectsNav.appendChild('add-project-div')
  }

const projectNameInput = document.getElementById('project-name-input')
const addProjectButton = document.getElementById('add-project-button');
addProjectButton.addEventListener('click', addNewProject);

const projectDefault = projectCreator('Default Project');
const theProject = projectCreator('The Project');
const task1 = taskCreator('Cleaning', 'do the cleaning of my room', 'low', '11.11.2020', 'make the bed, vaccum , clean windows, clean surfaces, empty the trash')
const task2 = taskCreator('Programming', 'learn JS React and Angular', 'high', '01.12.2020', 'Finish ToDos , make MB website, finish React,')
const task3 = taskCreator('Christmas', 'Prepare for Christmas', 'low', '20.12.2020', 'order presents, do the shopping, clean house, pack gifts, prepare meals')
projectDefault.addTask(task1);
projectDefault.addTask(task2);
projectDefault.addTask(task3);
console.log(projectDefault.taskList);
projectList.push(projectDefault);
projectList.push(theProject);
console.log(projectList);
populateProjectsNav();



function addNewProject(e) {
  e.preventDefault();
  let projectName
  handleProjectName();
  function handleProjectName() {
    (projectNameInput.value == "") ? projectName = 'My Project' : projectName = projectNameInput.value;
  }  
  const newProject = projectCreator(projectName);
  projectList.push(newProject);
  console.log(projectList);
  newProjectUl.classList.remove('active')
  addToProjectNav();
}

function populateProjectsNav() {
  projectList.forEach(project => {
    console.log(project.name);
    const newProjectDiv = document.createElement('button');
    // newProjectDiv.id = `Project${i}`;
    newProjectDiv.classList.add('project');
    newProjectDiv.innerText = project.name;
    projectsNav.appendChild(newProjectDiv)
  });
}

function addToProjectNav() {
  const newProjectDiv = document.createElement('div');
  // newProjectDiv.id = `Project${i}`;
  newProjectDiv.value = projectName;
}



  const AddTaskModal = document.createElement('div');
  AddTaskModal.id = 'add-task-modal';
  AddTaskModal.innerHTML = `
        <form id="new-task"> <div id="add-task-window">
        <ul>
        <div>  </div>
        <li><input type="text" id="task-name-input" placeholder="New task" required></li>
        <li><input type="text" id="description-input" placeholder="description"></li>
        <li><label for="date">due to </label><input type="date" id="date-input" required></li>
        <li><label for="priority"> Priority </label><select name="priority" id="priority" default="normal">
        <option value="low"> low </option>
        <option value="normal"> normal </option>
        <option value="important"> important </option>
        </select></li>
        <label for="checklist">checklist:</label><button id="add-bullet">+</button><button id="remove-bullet">-</button>
        <ul id="checklist-ul">

        <li><label class="checklist-bullet" for="bullet1">✦</label><input type="text" class="checklist-input" id="bullet2" placeholder="add your text"></li> </ul>
        <li><label for="notes">notes:</label></li>
        <li><textarea id="notes" name="notes" placeholder="add task notes"></textarea></li>
        <div id="add-task-checklist"
          <br>
          <br>
        <li><label for="projects">chose project:</label>
        <select name="projects" id="projects">
        <option value="project1">Project 1</option>
        <option value="project2">Project 2</option>
        <option value="project3">Project 3</option>
        </select></li>
        <li><input type="submit" value="Add task" id="submit-task"> </li>
      </ul></div>
    </form>`;
  container.appendChild(AddTaskModal);

  const addTaskButton = document.getElementById('add-task-button')
  addTaskButton.addEventListener('click', toggleAddTask);
  
  
  function toggleAddTask(e) {
    e.preventDefault();
    addTaskButton.classList.toggle('active')
    AddTaskModal.classList.toggle('active')
    }

    const checklistUl = document.getElementById('checklist-ul')
    const addBulletButton = document.getElementById('add-bullet');
    addBulletButton.addEventListener('click', addBullet);
    const removeBulletButton = document.getElementById('remove-bullet');
    removeBulletButton.addEventListener('click', removeBullet);
    
    function addBullet(e) {
      e.preventDefault();
      const bullet = document.createElement('li')
      bullet.innerHTML = ` <li><label class="checklist-bullet" for="bullet">✦</label><input type="text" class="checklist-input" placeholder="add your text"></li> `
      checklistUl.appendChild(bullet)
    }
    
    function removeBullet(e) {
      e.preventDefault();
      if (checklistUl.lastChild)
      checklistUl.removeChild(checklistUl.lastChild);
    }
    
    
    
    const taskSubmitForm = document.getElementById('new-task');
    taskSubmitForm.addEventListener('click', taskSubmit);

    function taskSubmit(e) {
      e.preventDefault();
      
    }





}

export { handleDOMEvents }