// Authentication utilities using localStorage

// Initialize users in localStorage
export const initializeAuth = () => {
  if (!localStorage.getItem('users')) {
    // Create demo users
    const demoUsers = [
      {
        id: 'user-1',
        name: 'Ahmed Khan',
        email: 'ahmed@example.com',
        password: 'password123', // In real app, this would be hashed
        phone: '0300-1234567',
        city: 'Karachi',
        role: 'seller',
        createdAt: '2024-01-01'
      },
      {
        id: 'user-2',
        name: 'Sara Ali',
        email: 'sara@example.com',
        password: 'password123',
        phone: '0321-9876543',
        city: 'Lahore',
        role: 'buyer',
        createdAt: '2024-01-05'
      }
    ];
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
};

// Get all users
export const getAllUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

// Register new user
export const register = (userData) => {
  const users = getAllUsers();
  
  // Check if email already exists
  if (users.find(u => u.email === userData.email)) {
    return { success: false, message: 'Email already registered' };
  }
  
  // Create new user
  const newUser = {
    id: `user-${Date.now()}`,
    name: userData.name,
    email: userData.email,
    password: userData.password, // In real app, hash this
    phone: userData.phone,
    city: userData.city,
    role: userData.role || 'buyer',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Auto login after registration
  const userSession = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    city: newUser.city,
    role: newUser.role
  };
  localStorage.setItem('currentUser', JSON.stringify(userSession));
  
  return { success: true, user: userSession };
};

// Login user
export const login = (email, password) => {
  const users = getAllUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }
  
  // Create session
  const userSession = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    role: user.role
  };
  localStorage.setItem('currentUser', JSON.stringify(userSession));
  
  return { success: true, user: userSession };
};

// Logout user
export const logout = () => {
  localStorage.removeItem('currentUser');
  return { success: true };
};

// Get current logged in user
export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

// Check if user is logged in
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// Check if user is seller
export const isSeller = () => {
  const user = getCurrentUser();
  return user && user.role === 'seller';
};

// Update user profile
export const updateUserProfile = (updates) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return { success: false, message: 'Not logged in' };
  
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found' };
  }
  
  // Update user data
  users[userIndex] = { ...users[userIndex], ...updates };
  localStorage.setItem('users', JSON.stringify(users));
  
  // Update session
  const updatedSession = {
    id: users[userIndex].id,
    name: users[userIndex].name,
    email: users[userIndex].email,
    phone: users[userIndex].phone,
    city: users[userIndex].city,
    role: users[userIndex].role
  };
  localStorage.setItem('currentUser', JSON.stringify(updatedSession));
  
  return { success: true, user: updatedSession };
};

// Change password
export const changePassword = (oldPassword, newPassword) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return { success: false, message: 'Not logged in' };
  
  const users = getAllUsers();
  const user = users.find(u => u.id === currentUser.id);
  
  if (!user) {
    return { success: false, message: 'User not found' };
  }
  
  if (user.password !== oldPassword) {
    return { success: false, message: 'Current password is incorrect' };
  }
  
  // Update password
  user.password = newPassword;
  localStorage.setItem('users', JSON.stringify(users));
  
  return { success: true, message: 'Password changed successfully' };
};

// Get user by ID
export const getUserById = (userId) => {
  const users = getAllUsers();
  return users.find(u => u.id === userId);
};

// Switch user role (buyer to seller or seller to buyer)
export const switchRole = (newRole) => {
  const currentUser = getCurrentUser();
  if (!currentUser) return { success: false, message: 'Not logged in' };
  
  if (newRole !== 'buyer' && newRole !== 'seller') {
    return { success: false, message: 'Invalid role' };
  }
  
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) {
    return { success: false, message: 'User not found' };
  }
  
  // Update user role
  users[userIndex].role = newRole;
  localStorage.setItem('users', JSON.stringify(users));
  
  // Update session
  const updatedSession = {
    ...currentUser,
    role: newRole
  };
  localStorage.setItem('currentUser', JSON.stringify(updatedSession));
  
  return { success: true, user: updatedSession, message: `Switched to ${newRole} mode successfully` };
};
