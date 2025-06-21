import { axiosInstance } from "./axios.js";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};

export const getUserFriends = async () => {
  const res = await axiosInstance.get(`/user/friends`);
  return res.data.friends;
};

export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get(`/user`);
  return res.data.recommendedUsers;
};

export const getOutgoingFriendReqs = async () => {
  const res = await axiosInstance.get(`/user/outgoing-friend-requests`);
  return res.data.outgoingReqs;
};

export const sendFriendRequests = async (recipientId) => {
  const res = await axiosInstance.post(`/user/friend-requests/${recipientId}`);
  return res.data;
};

export const getFriendRequests = async () => {
  const res = await axiosInstance.get(`/user/friend-requests`);
  return res.data;
};

export const acceptFriendRequest = async (requestId) => {
  const res = await axiosInstance.put(
    `/user/friend-requests/${requestId}/accept`
  );
  return res.data;
};

export const getStreamToken = async () => {
  const res = await axiosInstance.get(`/chat/token`);
  return res.data;
};
