/**
 * EventHub Authentication API Service
 * Connects frontend React components to Express Backend API (/api/v1/users)
 */

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1/users';

/**
 * Helper to handle fetch responses and standardize errors
 */
async function handleResponse(response) {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const errorMessage =
      (isJson && data?.message) ||
      (isJson && data?.error) ||
      (typeof data === 'string' && data) ||
      `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.statusCode = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Send 6-digit verification OTP to the user's email
 * @param {string} email
 */
export async function sendOtp(email) {
  const response = await fetch(`${BASE_URL}/send-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });
  return handleResponse(response);
}

/**
 * Register a new user
 * @param {Object} userData - { name, email, phonenumber, collegename, department, password, role, otp }
 */
export async function registerUser(userData) {
  const payload = {
    name: userData.name?.trim(),
    email: userData.email?.trim().toLowerCase(),
    phonenumber: userData.phonenumber?.trim(),
    collegename: userData.collegename?.trim(),
    department: userData.department?.trim() || '',
    password: userData.password,
    role: userData.role || 'student',
    otp: String(userData.otp || '').trim(),
  };

  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}

/**
 * Log in an existing user
 * @param {Object} credentials - { email, password }
 */
export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email: credentials.email?.trim().toLowerCase(),
      password: credentials.password,
    }),
  });
  return handleResponse(response);
}

/**
 * Fetch current authenticated user session
 */
export async function getCurrentUser() {
  const response = await fetch(`${BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
  });
  return handleResponse(response);
}

/**
 * Log out user
 */
export async function logoutUser() {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return handleResponse(response);
}
