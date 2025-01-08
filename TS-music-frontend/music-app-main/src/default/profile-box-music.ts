// export const SUGGESTED_PROFILE_MUSIC = [
//   {
//     id: 1,
//     imgSong: "https://docs.material-tailwind.com/img/face-2.jpg",
//     singerName: "Paramore",
//     songName: "Brick by Boring Brick",
//     imgComposer: "https://docs.material-tailwind.com/img/face-4.jpg",
//   },
//   {
//     id: 2,
//     imgSong: "https://docs.material-tailwind.com/img/face-2.jpg",
//     singerName: "Paramore",
//     songName: "Brick by Boring Brick",
//     imgComposer: "https://docs.material-tailwind.com/img/face-4.jpg",
//   },
// ];

// profile-box-music.ts
import { fetchMusicData } from '../conf/music';

export let SUGGESTED_PROFILE_MUSIC: any[] = [];

(async function initializeSuggestedProfiles() {
  try {
    SUGGESTED_PROFILE_MUSIC = await fetchMusicData();
  } catch (error) {
    console.error('Failed to initialize suggested profiles:', error);
    // Fallback data jika pengambilan dari backend gagal
    SUGGESTED_PROFILE_MUSIC = [
      {
        id: 1,
        imgSong: 'https://docs.material-tailwind.com/img/face-2.jpg',
        singerName: 'Paramore',
        songName: 'Brick by Boring Brick',
        imgComposer: 'https://docs.material-tailwind.com/img/face-4.jpg',
        composerName: 'Hayley Williams',
      },
    ];
  }
})();


