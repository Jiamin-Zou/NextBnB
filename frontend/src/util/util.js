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
      return data;
    } else {
      throw new Error("Error checking user existence");
    }
  } catch (error) {
    throw error;
  }
};

export const demoUser = { email: "demo.user@test.com", password: "demouser" };

export const convertToDate = (dateString) => {
  const date = new Date(dateString);
  const result = new Date(date.toISOString().slice(0, -1));
  return result;
};

export const randomRGB = () => {
  const min = 0;
  const max = 240;
  const randomRed = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomGreen = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomBlue = Math.floor(Math.random() * (max - min + 1)) + min;
  return `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
};
