const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/admin/login`,
    SIGNUP: `${API_BASE_URL}/auth/admin/signup`,
  },
  ADMIN: {
    LIST: `${API_BASE_URL}/admin/list`,
  },
  MATERIALS: {
    LIST: `${API_BASE_URL}/materials`,
  }
  // Add other endpoints as needed
};
