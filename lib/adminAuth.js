import bcrypt from 'bcryptjs';

// Hash password for admin (run this once to create admin account)
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Verify password
export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Create admin account (run this once)
export async function createAdmin(email, password) {
  const hashedPassword = await hashPassword(password);
  return { email, password_hash: hashedPassword };
}