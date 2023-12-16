import apiService from './apiService';
const userBaseUrl = '/user';

// {
//     name,
//     username,
//     semester,
//     major,
//     section,
//     gender,
//     bio,
//     avatar,
//     coverPhoto,
//   }
const updateProfile = async (userData) => {
  try {
    const response = await apiService.put(
      `${userBaseUrl}/updateprofile`,
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getProfile = async (username) => {
  try {
    const response = await apiService.get(
      `${userBaseUrl}/getprofile/${username}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const followUser = async (username) => {
  try {
    const response = await apiService.put(
      `${userBaseUrl}/follow/${username}`,
      null
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const unfollowUser = async (username) => {
  try {
    const response = await apiService.put(
      `${userBaseUrl}/unfollow/${username}`,
      null
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { updateProfile, getProfile, followUser, unfollowUser };
