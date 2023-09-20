import axios from "axios";

const API_BASE = import.meta.env.VITE_API_ENDPOINT;

export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE}/api/users/user/${userId}`, {
      withCredentials: true,
    });
    console.log(response.data.info);
    return response.data.info;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchUsersPost = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE}/api/post/user/${userId}`, {
      withCredentials: true,
    });
    return response.data.postDetail;
  } catch (error) {
    console.log(error.message);
  }
};

export async function deleteUser(userId) {
  try {
    const response = await axios.delete(
      `${API_BASE}/api/users/user/${userId}`,
      { withCredentials: true }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}

export const deletePost = async (deletedPost) => {
  try {
    await axios.delete(`${API_BASE}/api/post/delete/${deletedPost._id}`, {
      withCredentials: true,
    });
    const updatedPosts = posts.filter((post) => post._id !== deletedPost._id);
    return updatedPosts;
  } catch (error) {
    console.log(error.message);
  }
};
