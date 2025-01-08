import { getAuthToken } from "@/utils/auth";

interface MusicCreationData {
  musicName: string;
  myRole: string[];
  singerName?: string;
  publisher?: string;
  songLanguage?: string;
  musicUsage: string[] | string;
  musicStyle: string;
  musicMood?: string;
  musicImage: string;
  music: string;
  musicLyric?: string;
  musicPlaybackBackground?: string;
  musicInstrument?: string;
  tags: string;
  description: string;
  softwareTool?: string;
}

const BACKEND_URL = "http://localhost:3000/v1/music-creation";

export const MusicCreationService = {
  getMusicCreationById: async (id: string) => {
    const token = getAuthToken();
    if (!token) throw new Error("No authentication token found");

    const response = await fetch(`${BACKEND_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to fetch music creation");
    return response.json();
  },
  // other methods...
};
