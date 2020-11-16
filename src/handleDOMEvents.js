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
  }
  
  const projectNameInput = document.getElementById('project-name-input')
  const addProjectButton = document.getElementById('add-project-button');
  addProjectButton.addEventListener('click', addNewProject);

  //////////////////////////////////////////////////////////////////
  
  const projectDefault = projectCreator('Default Project');
  const theProject = projectCreator('The Project');
  const task1 = taskCreator('Cleaning', 'do the cleaning of my room', 'medium', '11.11.2020', ['make the bed', 'vaccum' , 'clean windows', 'clean surfaces', 'empty the trash'], 'just some cleaning nannanananan, tadada, nanananannaanna, taadadadat')
  const task2 = taskCreator('Programming', 'learn JS React and Angular', 'high', '01.12.2020',[ 'Finish ToDos' ,'make MB website', 'finish React'])
  const task3 = taskCreator('Christmas', 'Prepare for Christmas', 'low', '20.12.2020', ['order presents','do the shopping', 'clean house','pack gifts', 'prepare meals'])
  projectDefault.addTask(task1);
  projectDefault.addTask(task2);
  projectDefault.addTask(task3);
  projectList.push(projectDefault);
  projectList.push(theProject);
  let currentProject = projectList[0];

//////////////////////////////////////////////////////////////////


function addNewProject(e) {
  e.preventDefault();
  let projectName;
  handleProjectName();
  function handleProjectName() {
    (projectNameInput.value == "") ? projectName = 'My Project' : projectName = projectNameInput.value;
  }  
  const newProject = projectCreator(projectName);
  projectList.push(newProject);
  console.log(projectList);
  newProjectUl.classList.remove('active')
  // clear input field
  populateProjectsNav();
}

function populateProjectsNav() {
  projectList.forEach((project, index) => {
    console.log(index, project.name);
    const projectElement = document.createElement('button');
    if (!document.getElementById(`Project${index}`)) {
      projectElement.id = `Project${index}`;
      projectElement.classList.add('project');
      projectElement.innerText = project.name;
      projectsNav.appendChild(projectElement)
    }
    
    projectElement.addEventListener('click', makeCurrentProject)
    function makeCurrentProject() {
      console.log('current project:', index, project);
      return currentProject = project;
    }
    return currentProject  
  });

  populateProjectSelection();
  handleProjectSwitch();

  function handleProjectSwitch() {
    const projectNodeList = document.querySelectorAll('.project')
    projectNodeList.forEach((project, index) => {
      project.addEventListener('click', (e) => {
      projectNodeList.forEach(project => project.classList.remove('active-project'));
      populateTasks();
      project.classList.add('active-project')})

      // clear div
      // populate div with tasks
    });
  }
}

function populateTasks() {
  // console.log('Populate Tasks in ', currentProject);
  removeParentContent(container);
  currentProject.taskList.forEach((task, index) => {
    // console.log(index, task.name);
    const taskElement = document.createElement('div');
    if (!document.getElementById(`Task${index}`)) {
      taskElement.id = `Task${index}`;
      taskElement.classList.add('Task');
      let taskChecklist = '';
      // console.log(task.checklist);
      task.checklist.forEach((element, index) => {
      //  console.log(index, element);
          taskChecklist += `<li id="bullet${index}" class="checklist-li"><label class="task-checklist-bullet" for="bullet${index}">✦</label>${element}</li>`
          return taskChecklist
        });
      let taskNoteContent = '';
      if (task.notes != '') {
        taskNoteContent =  `<br>
      <li><div class ="task-description"> Notes: </div></li>
      <li><div class ="task-notes">${task.notes}</div></li>`;
      }

      taskElement.innerHTML =
       `<ul><li><div class="task-title">${task.name}</div>
        <div class ="${task.priority}-priority">${task.priority} priority</div></li>
        <li><div class ="task-description">${task.description}</div></li>
        <li><div class ="task-dueDate">due to: ${task.dueDate}</div></li>
        <ul class="task-checklist-ul">${taskChecklist} </ul>
        ${taskNoteContent}
            <li><button class ="edit-task-button">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMS40MzggMTYuODcybC0xLjQzOCA3LjEyOCA3LjEyNy0xLjQzOCAxMi42NDItMTIuNjQtNS42OS01LjY5LTEyLjY0MSAxMi42NHptMi4yNzEgMi4yNTNsLS44NS0uODQ5IDExLjE0MS0xMS4xMjUuODQ5Ljg0OS0xMS4xNCAxMS4xMjV6bTIwLjI5MS0xMy40MzZsLTIuODE3IDIuODE5LTUuNjktNS42OTEgMi44MTYtMi44MTcgNS42OTEgNS42ODl6Ii8+PC9zdmc+"> Edit </button>
            <button class ="save-changes-button">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjIgMnYyMmgtMjB2LTIyaDNjMS4yMyAwIDIuMTgxLTEuMDg0IDMtMmg4Yy44Mi45MTYgMS43NzEgMiAzIDJoM3ptLTExIDFjMCAuNTUyLjQ0OCAxIDEgMSAuNTUzIDAgMS0uNDQ4IDEtMXMtLjQ0Ny0xLTEtMWMtLjU1MiAwLTEgLjQ0OC0xIDF6bTkgMWgtNGwtMiAyaC0zLjg5N2wtMi4xMDMtMmgtNHYxOGgxNnYtMTh6bS0xMyA5LjcyOWwuODU1LS43OTFjMSAuNDg0IDEuNjM1Ljg1MiAyLjc2IDEuNjU0IDIuMTEzLTIuMzk5IDMuNTExLTMuNjE2IDYuMTA2LTUuMjMxbC4yNzkuNjRjLTIuMTQxIDEuODY5LTMuNzA5IDMuOTQ5LTUuOTY3IDcuOTk5LTEuMzkzLTEuNjQtMi4zMjItMi42ODYtNC4wMzMtNC4yNzF6Ii8+PC9zdmc+"> Save </button>
            <button class ="archive-task-button">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMS44IDlsLS44LTRoMjJsLS44IDRoLTIuMDI5bC4zOS0yaC0xNy4xMjJsLjQxNCAyaC0yLjA1M3ptMTguNTc1LTZsLjYwNC0yaC0xNy45NzlsLjY4OCAyaDE2LjY4N3ptMy42MjUgOGwtMiAxM2gtMjBsLTItMTNoMjR6bS04IDRjMC0uNTUyLS40NDctMS0xLTFoLTZjLS41NTMgMC0xIC40NDgtMSAxcy40NDcgMSAxIDFoNmMuNTUzIDAgMS0uNDQ4IDEtMXoiLz48L3N2Zz4="> Archive </button></li>
        `;
      
        container.appendChild(taskElement)
        handleBulletCrossing();
        makeTaskEditable();
        makeTaskArchivable();

        function makeTaskArchivable() {
          const archiveTaskButton = document.querySelector('.archive-task-button')
          archiveTaskButton.addEventListener('click', () => {
            taskList.slice(task.index, 1);
            populateTasks();
          });
        }

        function makeTaskEditable() {
          const archiveTaskButton = document.querySelector('.edit-task-button')
          const saveTaskChangesButton = document.querySelector('.save-changes-button')
          archiveTaskButton.addEventListener('click', function() {
            console.log(`edit ${task}`)
            // populateTasks();
            // archiveTaskButton.setAttribute[display] = 'none'
            // saveTaskChangesButton.setAttribute[display] = 'flex'
          });
        }
        
        function handleBulletCrossing() {
          const taskChecklistUl = document.querySelectorAll('.checklist-li')
          taskChecklistUl.forEach(bullet => {
            bullet.addEventListener('click', toggleClassCrossed);    
            function toggleClassCrossed() {
              bullet.classList.toggle('crossed')
            }
          });
        }
    }
  });
  }

  function populateProjectSelection() {
  const projectSelectionElement = document.getElementById('projects-select');
    projectList.forEach((project, index) => {
      if (!document.getElementById(`project-opt${index}}`)) {
        const projectSelectOption = document.createElement('option');
        projectSelectOption.id = `project-opt${index}`;
        projectSelectOption.innerText = project.name;
        projectSelectionElement.appendChild(projectSelectOption)
      }
    });
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
        <li><label for="priority"> Priority </label><select name="priority" id="priority-select" default="normal">
        <option value="low"> low </option>
        <option value="medium"> normal </option>
        <option value="high"> important </option>
        </select></li>
        <label for="checklist">checklist:</label><button id="add-bullet">+</button><button id="remove-bullet">-</button>
        <ul id="checklist-ul">

        <li><label class="checklist-bullet" for="bullet1">✦</label><input type="text" class="checklist-input" id="bullet2" placeholder="add your text"></li> </ul>
        <li><label for="notes">notes:</label></li>
        <li><textarea id="notes-textarea" name="task notes" placeholder="add task notes"></textarea></li>
        <div id="add-task-checklist"
          <br>
          <br>
        <li><label for="projects">chose project:</label>
        <select name="projects" id="projects-select"></select></li>
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
    taskSubmitForm.addEventListener('submit', taskSubmit);

    function taskSubmit(e) {
      e.preventDefault();
      /////////////////////
      let taskNameInput = document.getElementById('task-name-input');
      let taskDescriptionInput = document.getElementById('description-input');
      let taskDateInput = document.getElementById('date-input');
      let taskPriorityInput = document.getElementById('priority-select');
      let taskProjectsSelect = document.getElementById('projects-select');
      let taskNotesInput = document.getElementById('notes-textarea');

      let taskChecklistInput = document.querySelectorAll('.checklist-input');

      let checkListInputs = [];
      taskChecklistInput.forEach(input => {
        if (input.value != '')
        checkListInputs.push(input.value);
      });

      let selectedProjectId = taskProjectsSelect.options[taskProjectsSelect.selectedIndex].id.slice(-1);
      let selectedProject = projectList[selectedProjectId];

      console.log('selected project:', selectedProjectId, taskProjectsSelect.value); 
      const newTask = taskCreator(taskNameInput.value, taskDescriptionInput.value, taskPriorityInput.value, taskDateInput.value, checkListInputs, taskNotesInput.value);
      selectedProject.taskList.push(newTask);
      console.log(projectList);
      populateTasks();
    }

function removeParentContent(parentNode) {
    while (parentNode.firstChild)  {
      parentNode.removeChild(parentNode.lastChild);
    }
  }

  populateProjectsNav();
  populateTasks();
  ///
  mainDiv.appendChild(AddTaskModal);


}

export { handleDOMEvents }