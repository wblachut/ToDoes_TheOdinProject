
function addBaseElements() {
  const mainDiv = document.getElementById('main');
  const navbar = document.createElement('nav');
  navbar.id = 'navbar';
  mainDiv.appendChild(navbar);
  
  const logoDiv = document.createElement('div');
  logoDiv.id = 'logo-div';
  logoDiv.innerHTML = `<img src="/Logo.png">`;
  navbar.appendChild(logoDiv);

  const addTaskDiv = document.createElement('div');
  addTaskDiv.id = 'add-task-div';
  addTaskDiv.innerHTML = `<button>+</button>`;
  navbar.appendChild(addTaskDiv);
}

export default addBaseElements;