interface AuthTokens {
  access: {
    token: string;
  };
  refresh: {
    token: string;
  };
}

export const getAuthToken = () => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    return auth.tokens?.access?.token;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};
