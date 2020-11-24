// eslint-disable-next-line prettier/prettier
const taskCreator = (name, description, priority, dueDate, checklist, notes = '') => {

  const setName = (newName) => (this.name = newName);

  return { name, description, priority, dueDate, checklist, notes, setName };
};

export { taskCreator };
