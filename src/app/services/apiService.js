import { getDomain } from "@/backendDomain";

// Base URL for API calls - update this with your actual API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || getDomain();

// Default headers for API requests
const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    // Authorization header will be added dynamically for authenticated requests
};

/**
 * Helper method for making API requests
 * 
 * @param {string} endpoint - API endpoint (without base URL)
 * @param {Object} options - Fetch options (method, headers, body)
 * @returns {Promise} - Response data or error
 */
async function fetchAPI(endpoint, options = {}) {
    try {
        // Add authentication token if user is logged in
        const token = localStorage.getItem('auth_token');
        const headers = { ...DEFAULT_HEADERS, ...options.headers };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        // Make API request
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        // Handle unsuccessful responses
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        // Parse response as JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

/**
 * Posts API Methods
 */
export const postsAPI = {
    /**
     * Get a list of posts with pagination and sorting
     * 
     * @param {Object} params - Query parameters
     * @param {number} params.page - Page number (default: 1)
     * @param {number} params.page_size - Number of posts per page (default: 20)
     * @param {string} params.ordering - Sort field and order (e.g., '-upvotes', 'last_replied_at')
     * @returns {Promise} - Paginated list of posts
     */
    getPosts: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return fetchAPI(`/api/main/post/`);
    },

    /**
     * Get a single post by ID
     * 
     * @param {number} postId - Post ID
     * @returns {Promise} - Post details
     */
    getPost: (postId) => {
        return fetchAPI(`/api/main/post/${postId}/`);
    },

    /**
     * Create a new post
     * 
     * @param {Object} postData - New post data
     * @param {string} postData.title - Post title
     * @param {string} postData.content - Post content
     * @returns {Promise} - Created post
     */
    createPost: (postData) => {
        return fetchAPI('/api/main/post/', {
            method: 'POST',
            body: JSON.stringify(postData),
        });
    },

    /**
     * Update an existing post
     * 
     * @param {number} postId - Post ID
     * @param {Object} postData - Updated post data
     * @returns {Promise} - Updated post
     */
    updatePost: (postId, postData) => {
        return fetchAPI(`/api/main/post/${postId}/`, {
            method: 'PUT',
            body: JSON.stringify(postData),
        });
    },

    /**
     * Partially update an existing post
     * 
     * @param {number} postId - Post ID
     * @param {Object} postData - Partial post data to update
     * @returns {Promise} - Updated post
     */
    patchPost: (postId, postData) => {
        return fetchAPI(`/api/main/post/${postId}/`, {
            method: 'PATCH',
            body: JSON.stringify(postData),
        });
    },

    /**
     * Delete a post
     * 
     * @param {number} postId - Post ID
     * @returns {Promise} - Deletion confirmation
     */
    deletePost: (postId) => {
        return fetchAPI(`/api/main/post/${postId}/`, {
            method: 'DELETE',
        });
    },

    /**
     * Upvote a post
     * 
     * @param {number} postId - Post ID
     * @returns {Promise} - Updated post with new upvote count
     */
    upvotePost: (postId) => {
        return fetchAPI(`/api/main/post/${postId}/upvote/`, {
            method: 'POST',
        });
    },
}


/**
 * User API Methods
 */
export const userAPI = {
    /**
     * Register a new user
     * 
     * @param {Object} userData - User registration data
     * @returns {Promise} - User data and token
     */
    register: (userData) => {
        return fetchAPI('/api/user/register/', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },

    /**
     * Log in a user
     * 
     * @param {Object} credentials - Login credentials
     * @returns {Promise} - User data and token
     */
    login: (credentials) => {
        return fetchAPI('/api/user/login/', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    /**
     * Get current user profile
     * 
     * @returns {Promise} - User profile data
     */
    getProfile: () => {
        return fetchAPI('/api/user/current/');
    },

    /**
     * Update user profile
     * 
     * @param {Object} profileData - Updated profile data
     * @returns {Promise} - Updated user profile
     */
    updateProfile: (profileData) => {
        return fetchAPI('/api/user/update/', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        });
    },

    /**
     * Check selected user profile
     * 
     * @param {int} userID - Selected user ID
     * @returns {Promise} - Selected user profile data
     */
    checkProfile: () => {
        return fetchAPI(`/api/user/get/${userID}/`);
    },
};

// Export all API services
const apiService = {
    posts: postsAPI,
    user: userAPI,
};

export default apiService;