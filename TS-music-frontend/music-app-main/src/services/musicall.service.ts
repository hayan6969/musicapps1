const BACKEND_URL = "http://localhost:3000/v1/music-creation";
const BASE_URL = "http://localhost:3000";

export class MusicallService {
  // Get auth token from localStorage
  private static getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      const token = auth.tokens?.access?.token || null;
      console.log("Retrieved token:", token);
      return token;
    }
    return null;
  }

  // Get image URL with proper formatting
  public static getImageUrl(path: string): string {
    if (!path) {
      return "/image/default-picture.jpg";
    }

    if (path.startsWith("http")) {
      return path;
    }

    // Remove 'public/' from the path and ensure it starts with a slash
    const cleanPath = path.replace("public/", "");
    return `${BASE_URL}${
      cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath
    }`;
  }

  // Add new methods for API calls
  public static async fetchMusicAssets() {
    const token = this.getAuthToken();
    try {
      const response = await fetch(`${BACKEND_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching music assets:", error);
      throw error;
    }
  }

  public static async uploadMusicAsset(data: FormData) {
    const token = this.getAuthToken();
    try {
      const response = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      return await response.json();
    } catch (error) {
      console.error("Error uploading music asset:", error);
      throw error;
    }
  }

  static async getMusicDetails(id: string) {
    try {
      const token = this.getAuthToken();
      const response = await fetch(`${BACKEND_URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return {
        ...data,
        isLiked:
          data.likes?.some(
            (like: any) => like.userId === this.getCurrentUserId()
          ) || false,
        likesCount: data.likes?.length || 0,
      };
    } catch (error) {
      console.error("Error getting music details:", error);
      throw error;
    }
  }

  public static async likeMusic(musicId: string) {
    const token = this.getAuthToken();
    try {
      const response = await fetch(`${BASE_URL}/v1/music/like/${musicId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return {
        success: response.ok,
        data: data,
      };
    } catch (error) {
      console.error("Error liking music:", error);
      throw error;
    }
  }

  // Add this helper method to get current user ID
  private static getCurrentUserId(): string | null {
    if (typeof window !== "undefined") {
      const auth = JSON.parse(localStorage.getItem("auth") || "{}");
      return auth.user?.id || null;
    }
    return null;
  }
}

// Export constants if needed elsewhere
export { BACKEND_URL, BASE_URL };
