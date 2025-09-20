export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return user.access_token;
    }
  }
  return null;
};

export const getUserId = (): string | null => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return user.userId;
    }
  }
  return null;
};
