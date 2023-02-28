const userRepository = require('../repositories/users.repository');
const passwords      = require('../utils/passwords');
const authService    = require("./auth.service");


const seedUsers = async () => {
  const userCreationPayloadFromRepresentation = async (user) => ({
    ...user,
    passwordHash: await passwords.generateInitialPasswordHash(
      user.firstName,
      user.lastName
    ),
  });

  return userRepository
    .searchMissingUsers()
    .then(
      (users) => {
        console.log(`[USERS] found ${users.length} missing users...`);

        return users;
      }
    )
    .then(
      (users) => users
        .map(userCreationPayloadFromRepresentation)
    )
    .then(
      (userCreationPayloadTasks) => Promise.all(userCreationPayloadTasks)
    )
    .then(
      (userCreationPayloads) => userRepository.bulkCreate(userCreationPayloads)
    )
    .then(
      (sink) => {
        console.log(`[USERS] initialization complete.`);

        return sink;
      }
    )
  ;
};


const changePassword = (userId, currentPassword, newPassword) => userRepository.findById(userId)
  .then(
    (user) => authService.authenticateUser(
      user,
      currentPassword
    )
  )
  .then(
    (sink) => passwords
      .hashPlaintextPassword(newPassword)
      .then(
        (newPasswordHash) => userRepository
          .updateUserPassword(userId, newPasswordHash)
      )
  );


module.exports = {
  seedUsers,
  changePassword,
};
