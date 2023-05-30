import csrfFetch from "../store/csrf";

export const verifyEmailFormat = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const accountExist = async (email) => {
  try {
    const res = await csrfFetch(`/api/users?email=${email}`);
    if (res.ok) {
      const data = await res.json();
      return data.user_found;
    } else {
      throw new Error("Error checking user existence");
    }
  } catch (error) {
    throw error;
  }
};

export const demoUser = { email: "demo.user@test.com", password: "demouser" };
