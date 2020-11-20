import { taskCreator } from './tasks';
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
  newProjectUl.innerHTML = `<li> <input type="text" id="project-name-input" placeholder="New project name"></li>
                            <li> <button id="add-project-button">add new Project</button> </li>`
  newProjectUl.id = 'new-project-ul';
  projectsNav.insertBefore(newProjectUl, projectsNav.children[0].nextElementSibling);
  menageProjectsButton.addEventListener('click', toggleProjects);
  newProjectButton.addEventListener('click', toggleAddProjectOptionDisplay);
  
  function toggleProjects() {
    projectsNav.classList.toggle('active')
    menageProjectsButton.classList.toggle('active')
    if (menageProjectsButton.classList.contains('active')) {
      menageProjectsButton.textContent = ' Projects '
    } else {
      menageProjectsButton.textContent = '˂'
    }
  }
  
  function toggleAddProjectOptionDisplay() {
    newProjectUl.classList.toggle('active')
  }
  
  let currentProject = projectList[0];
  
  const projectNameInput = document.getElementById('project-name-input')
  const addProjectButton = document.getElementById('add-project-button');
  addProjectButton.addEventListener('click', addNewProject);

function addNewProject(e) {
  e.preventDefault();
  let projectName;
  handleProjectName();
  const newProject = projectCreator(projectName);
  projectList.push(newProject);
  // newProject.addToProjectList();
  console.log(projectList);
  newProjectUl.classList.remove('active')
  projectNameInput.value = ""
  populateProjectsNav();
  
    function handleProjectName() {
      (projectNameInput.value == "") ? projectName = 'New Project' : projectName = projectNameInput.value;
      return projectName  
    }
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
      if (index == 0){
        projectElement.classList.add('active-project')
      }
    }

    projectElement.addEventListener('click', makeCurrentProject);
    function makeCurrentProject() {
      console.log('current project:', index, project);
      return currentProject = project;
    }
    // store locally
    localStorage.setItem('projectList', JSON.stringify(projectList));
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
    });
  }
}

function populateTasks() {
  removeParentContent(container);
  currentProject.taskList.forEach((task, index) => {
    const taskElement = document.createElement('div');
    if (!document.getElementById(`Task${index}`)) {
      taskElement.id = `Task${index}`;
      taskElement.classList.add('Task');
      let taskChecklistContent = '';
      let taskNoteContent = '';
      task.checklist.forEach((element, index) => {
      //  console.log(index, element);
          taskChecklistContent += `<li><label class="task-checklist-bullet" for="bullet${index}">✦</label><span class="task-checklist-el for-edit">${element}</span></li>`
          return taskChecklistContent
      });

      if (task.notes != '') {
        taskNoteContent =  `<br>
        <li><div class ="notes"> Notes: </div></li>
        <li><div class ="task-notes for-edit" >${task.notes}</div></li>`;
      }

      taskElement.innerHTML =
       `<div class="editing-label">editing</div><ul><li><div class="task-name for-edit">${task.name}</div>
        <div class ="task-priority ${task.priority} for-edit">${task.priority} </div></li>
        <li><div class ="task-description for-edit">${task.description}</div></li>
        <li>due to: <div class ="task-dueDate for-edit">${task.dueDate}</div></li>
        <ul class="task-checklist">${taskChecklistContent} </ul> ${taskNoteContent}
        <li><button class ="edit-task-button">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMS40MzggMTYuODcybC0xLjQzOCA3LjEyOCA3LjEyNy0xLjQzOCAxMi42NDItMTIuNjQtNS42OS01LjY5LTEyLjY0MSAxMi42NHptMi4yNzEgMi4yNTNsLS44NS0uODQ5IDExLjE0MS0xMS4xMjUuODQ5Ljg0OS0xMS4xNCAxMS4xMjV6bTIwLjI5MS0xMy40MzZsLTIuODE3IDIuODE5LTUuNjktNS42OTEgMi44MTYtMi44MTcgNS42OTEgNS42ODl6Ii8+PC9zdmc+"> Edit </button>
        <button class ="save-changes-button">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMjIgMnYyMmgtMjB2LTIyaDNjMS4yMyAwIDIuMTgxLTEuMDg0IDMtMmg4Yy44Mi45MTYgMS43NzEgMiAzIDJoM3ptLTExIDFjMCAuNTUyLjQ0OCAxIDEgMSAuNTUzIDAgMS0uNDQ4IDEtMXMtLjQ0Ny0xLTEtMWMtLjU1MiAwLTEgLjQ0OC0xIDF6bTkgMWgtNGwtMiAyaC0zLjg5N2wtMi4xMDMtMmgtNHYxOGgxNnYtMTh6bS0xMyA5LjcyOWwuODU1LS43OTFjMSAuNDg0IDEuNjM1Ljg1MiAyLjc2IDEuNjU0IDIuMTEzLTIuMzk5IDMuNTExLTMuNjE2IDYuMTA2LTUuMjMxbC4yNzkuNjRjLTIuMTQxIDEuODY5LTMuNzA5IDMuOTQ5LTUuOTY3IDcuOTk5LTEuMzkzLTEuNjQtMi4zMjItMi42ODYtNC4wMzMtNC4yNzF6Ii8+PC9zdmc+"> Save </button>
        <button class ="archive-task-button">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMS44IDlsLS44LTRoMjJsLS44IDRoLTIuMDI5bC4zOS0yaC0xNy4xMjJsLjQxNCAyaC0yLjA1M3ptMTguNTc1LTZsLjYwNC0yaC0xNy45NzlsLjY4OCAyaDE2LjY4N3ptMy42MjUgOGwtMiAxM2gtMjBsLTItMTNoMjR6bS04IDRjMC0uNTUyLS40NDctMS0xLTFoLTZjLS41NTMgMC0xIC40NDgtMSAxcy40NDcgMSAxIDFoNmMuNTUzIDAgMS0uNDQ4IDEtMXoiLz48L3N2Zz4="> Archive </button></li>
        `;
        container.appendChild(taskElement)
        makeTaskEditable();
        makeTaskArchivable();
        // handleBulletCrossing('on');

        function makeTaskArchivable() {
          let archiveTaskButton = document.querySelectorAll('.archive-task-button')[index];
          archiveTaskButton.addEventListener('click', archiveTask);
          function archiveTask() {
            currentProject.taskList.splice(index, 1);
            populateTasks();
          }
        }

        function makeTaskEditable() {
          let editTaskButton = taskElement.querySelector('.edit-task-button');
          let saveTaskChangesButton = taskElement.querySelector('.save-changes-button');
          let editableElements = taskElement.querySelectorAll('.for-edit');
          let taskPriorityElement = taskElement.querySelector('.task-priority')
          let taskDueDateElement = taskElement.querySelector('.task-dueDate')
          let taskChecklistElement = taskElement.querySelector('.task-checklist')
          let taskDate = taskDueDateElement.textContent;
          let taskPriority = taskPriorityElement.classList[1];
          
          editTaskButton.addEventListener('click', editTask);
          function editTask() {
            console.log(taskPriority);
            taskElement.classList.add('editing')
            editTaskButton.style.display = 'none';
            saveTaskChangesButton.style.display = 'inline-block';
            editableElements.forEach(element => element.contentEditable = true)
            taskPriorityElement.innerHTML = `
            <li><select name="priority" class="task-priority for-edit" selected="${taskPriority}">
            <option value="minor"> low </option>
            <option value="relevant"> normal </option>
            <option value="important"> important </option>
            </select></li>`
            taskDueDateElement.innerHTML = `<li><label for="date"></label><input type="date" class="task-dueDate for-edit" value="${taskDate}"></li>`
            taskChecklistElement.innerHTML = `<label for="checklist">checklist:</label><button class="add-bullet">+</button><button class="remove-bullet">-</button>` + taskChecklistElement.innerHTML;

            let TaskPriorityOptions = Array.from(taskElement.getElementsByTagName('option'));

            TaskPriorityOptions.forEach(element => {
              if (element.value == taskPriority) {
                element.selected = true;
              }
            });

            const editTaskAddBulletButton = document.querySelector('.add-bullet');
            editTaskAddBulletButton.addEventListener('click', addBullet);
            const editTaskRemoveBulletButton = document.querySelector('.remove-bullet');
            editTaskRemoveBulletButton.addEventListener('click', removeBullet);
            
            function addBullet(e) {
              e.preventDefault();
              const bullet = document.createElement('li')
              bullet.innerHTML = `<label class="task-checklist-bullet" for="bullet">✦</label><span class="task-checklist-el for-edit" contentEditable="true"></span>`
              taskChecklistElement.appendChild(bullet)
            }
            
            function removeBullet(e) {
              e.preventDefault();
              if (checklistUl.lastChild)
              taskChecklistElement.removeChild(taskChecklistElement.lastChild);
            }

            // while (taskElement.classList.contains('editing')) {
            //   document.querySelectorAll('.edit-task-button').removeEventListener('click', editTask)
            // }

            // handleBulletCrossing('off');
          }

        handleSavingTask();

          function handleSavingTask() {
   
              saveTaskChangesButton.addEventListener('click', (e) => {
              saveTaskChangesButton.style.display = 'none';
              editTaskButton.style.display = 'inline-block';
              let editedTaskChecklist = []
              editableElements = taskElement.querySelectorAll('.for-edit');
              editableElements.forEach(element => {
                
                let editedProperty = element.classList[0].slice(5);
                console.log(editedProperty, element)
                if (editedProperty == 'name') {
                  currentProject.taskList[index].name = element.textContent;
                } else if (editedProperty == 'description') {
                  currentProject.taskList[index].description = element.textContent;
                } else if (editedProperty == 'priority') {
                  currentProject.taskList[index].priority = element.value;
                } else if (editedProperty == 'dueDate') {
                  currentProject.taskList[index].dueDate = element.value;
                } else if (editedProperty == 'notes') {
                  currentProject.taskList[index].notes = element.textContent;
                } else if (editedProperty = 'checklist-el') {
                  if (element.textContent != '')
                  editedTaskChecklist.push(element.textContent);
                }

              })
              
              currentProject.taskList[index].checklist = editedTaskChecklist;
              console.log(editedTaskChecklist)
              console.log(currentProject.taskList[index])
              // handleBulletCrossing('on');
              populateTasks();
              editableElements.forEach(element => element.contentEditable = false);

            });
          }
        }
         

        // function handleBulletCrossing(condition) {
        //   const taskChecklistUl = taskElement.querySelectorAll('.checklist-li')
        //   taskChecklistUl.forEach(bullet => {
        //     function toggleClassCrossed() {
        //        bullet.classList.toggle('crossed');
        //     }
        //     if (condition == 'on') {
        //      bullet.addEventListener('click', toggleClassCrossed);    
        //     } else if (condition == 'off') {
        //       bullet.classList.remove('crossed');
        //       bullet.removeEventListener('click', toggleClassCrossed) 
        //     }
        //   });
        // }
      localStorage.setItem('projectList', JSON.stringify(projectList));
    }
  });
}

  function populateProjectSelection() {
  const projectSelectionElement = document.getElementById('projects-select');
    projectList.forEach((project, index) => {
      if (!document.getElementById(`project-opt${index}`)) {
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
        <option value="minor"> low </option>
        <option value="relevant"> normal </option>
        <option value="important"> important </option>
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
      let taskNameInput = document.getElementById('task-name-input');
      let taskDescriptionInput = document.getElementById('description-input');
      let taskDateInput = document.getElementById('date-input');
      let taskPriorityInput = document.getElementById('priority-select');
      let taskProjectsSelect = document.getElementById('projects-select');
      let taskNotesInput = document.getElementById('notes-textarea');
      let taskChecklistInputs = document.querySelectorAll('.checklist-input');

      let checkListArray = [];
      taskChecklistInputs.forEach(input => {
        if (input.value != '')
        checkListArray.push(input.value);
      });

      let selectedProjectId = taskProjectsSelect.options[taskProjectsSelect.selectedIndex].id.slice(-1);
      let selectedProject = projectList[selectedProjectId];

      console.log('selected project:', selectedProjectId, taskProjectsSelect.value); 
      const newTask = taskCreator(taskNameInput.value, taskDescriptionInput.value, taskPriorityInput.value, taskDateInput.value, checkListArray, taskNotesInput.value);
      selectedProject.addTask(newTask);
      console.log(projectList);
      populateTasks();
      hideAddTaskForm();

      function hideAddTaskForm() {
        taskSubmitForm.reset();
        addTaskButton.classList.toggle('active')
        AddTaskModal.classList.toggle('active')
      }
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