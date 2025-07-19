import API from "./api";

export const registerUser = async (data: {
  email: string;
  password: string;
  username: string;
  role?: string;
}) => {
  const res = await API.post("/signup", data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await API.post("/login", data);
  return res.data;
};
export const getUserProfile = async () => {
  const res = await API.get("/user");
  return res.data;
};
