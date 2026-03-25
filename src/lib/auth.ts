export const getToken = () => {
    if (typeof window === "undefined") return null; // runs only in the browser
    return localStorage.getItem("accessToken");
};

export const isAuthenticated = () => {
    return !!getToken();
};