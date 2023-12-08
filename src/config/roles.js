const allRoles = {
  user: ['getUsers', 'manageUsers', 'getTodos', 'manageTodos'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
