export interface IMusicAsset {
  musicName: string;
  myRole?: Array<"composer" | "lyricist" | "arranger" | "producer">;
  creationTime: string;
  songLanguage: string;
  musicUsage: string;
  musicStyle: string;
  musicMood: string;
  personalUse: boolean;
  personalUsePrice: string;
  commercialUse: boolean;
  commercialUsePrice: string;
  collaborationContact: boolean;
  musicInstrument?: string; // Optional
  tags: string;
  description: string;
  softwareTool?: string; // Optional
  music: string;
  musicImage: string;
}

export const defaultMusicAsset: IMusicAsset = {
  musicName: "",
  myRole: [], // Default to an empty array
  creationTime: "", // Current date and time as ISO string
  songLanguage: "",
  musicUsage: "",
  musicStyle: "",
  musicMood: "",
  personalUse: false,
  personalUsePrice: "",
  commercialUse: false,
  commercialUsePrice: "",
  collaborationContact: false,
  musicInstrument: "", // Optional, can be empty
  tags: "",
  description: "",
  softwareTool: "", // Optional, can be empty
  music: "", // Default to an empty string
  musicImage: "", // Placeholder image
};
