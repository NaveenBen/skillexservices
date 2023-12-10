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

const rights = ['getUser','getUsers', 'manageUsers','manageUser', 'getRequests','getRequest', 'manageRequests','manageRequest'];

const userTypes = ['donator', 'receiver', 'volunteer', 'organization'];

const allRights = {
  donator: ['getUser','manageUser','getRequests','getRequest','manageRequest','manageRequests'],
  receiver: ['getUser','manageUser','manageRequest'],
  volunteer: ['getUser','getRequests','getRequest','manageRequest','manageRequests','getUsers'],
  admin: ['getUser','getUsers','manageUsers','manageUser','getRequests','getRequest','manageRequest','manageRequests'],
};


const allRoles = {
  donator: [...allRights.donator],
  receiver: [...allRights.receiver],
  volunteer: [...allRights.volunteer],
  admin: [...allRights.admin],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
