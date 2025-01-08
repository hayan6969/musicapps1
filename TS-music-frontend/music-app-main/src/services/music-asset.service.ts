import { getAuthToken } from "@/utils/auth";

const BACKEND_URL = "http://localhost:3000/v1/music-asset";

export const MusicAssetService = {
  getMusicAssetById: async (id: string) => {
    const token = getAuthToken();
    if (!token) throw new Error("No authentication token found");

    console.log("Fetching music asset with ID:", id);
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch music asset:", await response.text());
      throw new Error("Failed to fetch music asset");
    }
    return response.json();
  },
  // other methods...
};
