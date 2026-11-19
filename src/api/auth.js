/**
 * EventHub Authentication API Service
 * Connects frontend React components directly to Express Backend API (/api/v1/users)
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
 * Safe fetch wrapper that surfaces connection errors clearly if backend is offline
 */
async function safeFetch(url, options) {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    // If it's already an ApiError with statusCode from handleResponse, rethrow it
    if (error.statusCode) {
      throw error;
    }
    // Check for network connection failure / offline backend
    if (
      error.name === 'TypeError' &&
      (error.message.includes('fetch') ||
        error.message.includes('NetworkError') ||
        error.message.includes('Failed to fetch'))
    ) {
      throw new Error(
        'Backend server offline. Please start the Express backend by running "npm run dev" in the project root (http://localhost:8000).'
      );
    }
    throw error;
  }
}

/**
 * Send 6-digit verification OTP to user's email via Express backend (/api/v1/users/send-otp)
 * @param {string} email
 */
export async function sendOtp(email) {
  return safeFetch(`${BASE_URL}/send-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.trim().toLowerCase() }),
  });
}

/**
 * Verify 6-digit OTP code against Redis session via Express backend (/api/v1/users/verify-otp)
 * @param {string} email
 * @param {string} otp
 */
export async function verifyOtp(email, otp) {
  return safeFetch(`${BASE_URL}/verify-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      otp: String(otp).trim(),
    }),
  });
}

/**
 * Register a new user in MongoDB via Express backend (/api/v1/users/register)
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

  return safeFetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

/**
 * Log in an existing user via Express backend (/api/v1/users/login)
 * Sets HTTP-only cookies and returns JWT tokens
 * @param {Object} credentials - { email, password }
 */
export async function loginUser(credentials) {
  return safeFetch(`${BASE_URL}/login`, {
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
}

/**
 * Fetch current authenticated user session (/api/v1/users/me)
 */
export async function getCurrentUser() {
  return safeFetch(`${BASE_URL}/me`, {
    method: 'GET',
    credentials: 'include',
  });
}

/**
 * Log out user and clear auth cookies (/api/v1/users/logout)
 */
export async function logoutUser() {
  return safeFetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}
