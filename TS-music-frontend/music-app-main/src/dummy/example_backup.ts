export let CATEGORIES: any[] = [];
export let SELECTED: any[] = [];
export let JOBS_PROPS: any[] = [];
export let SAVED_JOBS: any[] = [];
export let APPLIED_JOBS: any[] = [];
export let ACTIVE_JOBS: any[] = [];
export let INACTIVE_JOBS: any[] = [];

// Fungsi umum untuk mengambil data dari API dan memetakan hasilnya
const fetchDataWithMapping = async (
  url: string,
  token: string,
  mapFn: (item: any) => any
) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Token autentikasi
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results.map(mapFn); // Peta hasil berdasarkan fungsi
};

// Fungsi untuk mengambil data CATEGORIES
export const fetchCategories = async (token: string) => {
  try {
    CATEGORIES = await fetchDataWithMapping(
      "http://localhost:3000/v1/music/small-box",
      token,
      (item) => ({
        id: item.id,
        name: item.songName,
        image: item.musicImage,
        audio: item.musicAudio,
        background: item.musicBackground,
        tags: item.tags,
        likes: item.likes,
      })
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    CATEGORIES = [];
  }
};

// Fungsi untuk mengambil data SELECTED
export const fetchSelected = async (token: string) => {
  try {
    SELECTED = await fetchDataWithMapping(
      "http://localhost:3000/v1/music/selected",
      token,
      (item) => ({
        id: item.id,
        imgSong: item.musicImage,
        singerName: item.singerName,
        songName: item.songName,
        imgComposer: item.imgComposer,
      })
    );
  } catch (error) {
    console.error("Error fetching selected:", error);
    SELECTED = [];
  }
};

// Fungsi untuk mengambil data JOBS_PROPS
export const fetchJobsProps = async (token: string) => {
  try {
    JOBS_PROPS = await fetchDataWithMapping(
      "http://localhost:3000/v1/job",
      token,
      (item) => ({
        id: item.id,
        imgSong: item.musicImage,
        singerName: item.singerName,
        songName: item.songName,
        imgComposer: item.imgComposer,
        composerName: item.composerName,
        musicStyle: item.musicStyle,
        tags: item.tags,
      })
    );
  } catch (error) {
    console.error("Error fetching jobs props:", error);
    JOBS_PROPS = [];
  }
};

// Fungsi untuk mengambil data lain seperti SAVED_JOBS, APPLIED_JOBS, ACTIVE_JOBS, INACTIVE_JOBS
const fetchJobs = async (
  url: string,
  token: string,
  additionalField: string,
  value: boolean
) => {
  try {
    return await fetchDataWithMapping(url, token, (item) => ({
      id: item.id,
      imgSong: item.musicImage,
      singerName: item.singerName,
      songName: item.songName,
      imgComposer: item.imgComposer,
      composerName: item.composerName,
      [additionalField]: value,
    }));
  } catch (error) {
    console.error(`Error fetching ${additionalField} jobs:`, error);
    return [];
  }
};

export const fetchSavedJobs = async (token: string) => {
  SAVED_JOBS = await fetchJobs(
    "http://localhost:3000/v1/music/saved-jobs",
    token,
    "savedJobs",
    true
  );
};

export const fetchAppliedJobs = async (token: string) => {
  APPLIED_JOBS = await fetchJobs(
    "http://localhost:3000/v1/music/applied-jobs",
    token,
    "appliedJobs",
    true
  );
};

export const fetchActiveJobs = async (token: string) => {
  ACTIVE_JOBS = await fetchJobs(
    "http://localhost:3000/v1/music/active-jobs",
    token,
    "activeJobs",
    true
  );
};

export const fetchInactiveJobs = async (token: string) => {
  INACTIVE_JOBS = await fetchJobs(
    "http://localhost:3000/v1/music/inactive-jobs",
    token,
    "activeJobs",
    false
  );
};

// Fungsi inisialisasi semua data
export const initializeData = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No auth token found");
    return;
  }

  await Promise.all([
    fetchCategories(token),
    fetchSelected(token),
    fetchJobsProps(token),
    fetchSavedJobs(token),
    fetchAppliedJobs(token),
    fetchActiveJobs(token),
    fetchInactiveJobs(token),
  ]);
};

// Inisialisasi data saat modul dimuat
initializeData();

