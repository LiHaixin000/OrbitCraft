// backend/testDb.js
const { createUser, getUserByUsername, updateUser, deleteUser } = require('./models/User');

const testDatabase = async () => {
  try {
    // Test user creation
    const newUser = await createUser('newtestuser', 'newtestuser@example.com', 'password123');
    console.log('New User:', newUser);

    // Test fetching user by username
    const fetchedUser = await getUserByUsername('newtestuser');
    console.log('Fetched User:', fetchedUser);

    // Test updating user
    const updatedUser = await updateUser(newUser.id, 'updateduser', 'updateduser@example.com', 'newpassword123');
    console.log('Updated User:', updatedUser);

    // Test deleting user
    await deleteUser(updatedUser.id);
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error testing database:', error);
  }
};

testDatabase();
