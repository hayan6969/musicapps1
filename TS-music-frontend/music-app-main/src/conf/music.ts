import { getAuthToken } from "@/utils/auth";

const BACKEND_URL = "http://localhost:3000/v1/music-asset"; // Music asset endpoint
const BASE_URL = "http://localhost:3000"; // Base URL backend Anda

function getImageUrl(path: string): string {
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

// Fungsi untuk mengambil data dari backend
export const fetchMusicData = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      console.error("No authentication token found");
      return [];
    }

    const response = await fetch("http://localhost:3000/v1/music-asset", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.message || "Failed to fetch music data");
    }

    const data = await response.json();
    console.log("Raw API response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching music data:", error);
    return [];
  }
};

// Variabel untuk menyimpan data
export let CATEGORIES: any[] = [];
export let JOBS_PROPS: any[] = [];

// Inisialisasi data saat aplikasi dijalankan
(async function initializeData() {
  try {
    const musicData = await fetchMusicData();
    CATEGORIES = musicData; // Mengisi CATEGORIES dengan data hasil fetch
    JOBS_PROPS = musicData; // Mengisi JOBS_PROPS dengan data hasil fetch
    console.log("Initialized CATEGORIES:", CATEGORIES);
    console.log("Initialized JOBS_PROPS:", JOBS_PROPS);
  } catch (error) {
    console.error("Failed to initialize data:", error);

    // Fallback data if backend fails
    CATEGORIES = [
      {
        id: "1",
        imgSong: "/image/default-picture.jpg",
        songName: "Melodic Dreams",
        singerName: "Sarah Chen",
        composerName: "Michael Brooks",
        musicStyle: "Pop",
        personalUsePrice: "29",
        commercialUsePrice: "99",
        musicUsage: "Background Music",
        musicMood: "Uplifting",
        personalUse: true,
        commercialUse: true,
        collaborationContact: true,
        musicInstrument: "Piano, Guitar",
        tags: ["Pop", "Upbeat"],
        description: "A melodic pop song with uplifting vibes",
        softwareTool: "Logic Pro X",
        myRole: ["composer"],
        creationTime: new Date().toISOString(),
        createdBy: "Michael Brooks",
        updatedBy: "Michael Brooks",
      },
      {
        id: "2",
        imgSong: "/image/default-picture.jpg",
        songName: "Urban Rhythm",
        singerName: "Marcus King",
        composerName: "David Wilson",
        musicStyle: "Hip Hop",
        personalUsePrice: "39",
        commercialUsePrice: "149",
        musicUsage: "Commercial",
        musicMood: "Energetic",
        personalUse: true,
        commercialUse: true,
        collaborationContact: true,
        musicInstrument: "Drums, Synth",
        tags: ["Hip Hop", "Urban"],
        description: "Modern hip hop track with strong beats",
        softwareTool: "Ableton Live",
        myRole: ["composer", "producer"],
        creationTime: new Date().toISOString(),
        createdBy: "David Wilson",
        updatedBy: "David Wilson",
      },
    ];

    JOBS_PROPS = CATEGORIES;
  }
})();
