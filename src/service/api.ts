import axios from "axios";

// Base URL en MockAPI
const API_BASE = "https://68e55d4b21dd31f22cc18b3c.mockapi.io/api/v1";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

