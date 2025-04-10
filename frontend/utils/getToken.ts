export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      return user.user_info.access_token;
    }
  }
  return null;
};
