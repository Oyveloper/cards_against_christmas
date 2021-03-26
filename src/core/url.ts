const baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "/api";

export default baseURL;
