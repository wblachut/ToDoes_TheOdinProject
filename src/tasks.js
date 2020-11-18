const taskCreator = (name, description, priority, dueDate, checklist, notes = '') => {
  const setName = (newName) => {
    return this.name = newName;
  }

  return { name, description, priority, dueDate, checklist, notes, setName }
}

////////////////
export { taskCreator };
