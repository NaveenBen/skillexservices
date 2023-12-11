// roles and roleRights are used to define the roles and the rights of each role.
// for hado we have the following roles: admin, user
// admin can do everything
// users are three types: donator, receiver, volunteer,organization
// donator can create his own profile, update it, delete it.
// reciver or requestor can create his own profile, update it, delete it. and can create a request, update it, delete it.
// volunteer can see all requests and can accept or reject them or update them.
// organization can create his own profile, update it, delete it. and can create a request, update it, delete it.
// admin can create, update, delete all users and requests.

const rolesAssumed = ['user', 'admin'];
const allRights = {
  donor: ['getUser','updateUser','createUser','createRequest','updateRequest','getRequest'],
  operator: ['getUser','getUsers','getRequests','getRequest','updateRequest'],
  admin: ['getUser','getUsers','updateUser','createUser','deleteUser','createRequest','updateRequest','getRequest','getRequests','deleteRequest'],
};


const allRoles = {
  donor: [...allRights.donor],
  operator: [...allRights.operator],
  admin: [...allRights.admin],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
