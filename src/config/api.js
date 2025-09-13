// API Configuration for Subscription System v2.0
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://infinite-carwash-backend.onrender.com'
  : 'http://localhost:5000';

export const getApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

export const apiRequest = async (endpoint, options = {}) => {
  const url = getApiUrl(endpoint);
  
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  const config = { ...defaultOptions, ...options };

  try {
    console.log(`API Request: ${config.method} ${url}`);
    
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`API Response:`, data);
    
    return data;
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

export default {
  getApiUrl,
  apiRequest,
  API_BASE_URL
};

