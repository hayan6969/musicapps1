import { MusicallService } from "./musicall.service";

// Default fallback data
const defaultCategories = [
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

export class CategoriesService {
  public static async getCategories() {
    try {
      const data = await MusicallService.fetchMusicAssets();
      return data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return defaultCategories;
    }
  }

  public static getFallbackData() {
    return defaultCategories;
  }

  public static async getMusicDetail(id: string) {
    try {
      const allData = await this.getCategories();
      return allData.find((item: any) => item.id === id) || null;
    } catch (error) {
      console.error("Failed to fetch music detail:", error);
      return null;
    }
  }
}
