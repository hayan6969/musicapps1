"use client";

// Struktur data untuk JOBS_PROPS, CATEGORIES, dan SELECTED
export const JOBS_PROPS: any[] = [];
export const CATEGORIES: any[] = [];
export const SELECTED: any[] = [];

// Fungsi untuk mengambil data dari backend
const fetchJobsData = async () => {
  try {
    const response = await fetch("http://localhost:3000/v1/job", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch jobs data");
    }

    const data = await response.json();
    console.log(data);

    // Format data untuk JOBS_PROPS
    data.results.forEach((job: any, index: number) => {
      JOBS_PROPS.push({
        id: job.id,
        title: job.projectTitle,
        workcontent: job.category,
        musicculture: job.cultureArea,
        descriptionjob: job.description,
        username: job.createdBy[0].name ? job.createdBy[0].name : 'Unknown User',
        fotoprofile: job.createdBy[0].profilePicture ? job.createdBy[0].profilePicture : '',
        category: job.category,
        cultureArea: job.cultureArea,
        lyricLanguage: job.lyricLanguage,
        musicUse: job.musicUse,
        budget: job.budget,
        timeFrame: job.timeFrame,
        applicantName: job.applicantName,
        createdAt: job.createdAt,

        imgSong: "https://docs.material-tailwind.com/img/face-2.jpg", // Placeholder
        singerName: "Paramore", // Default
        songName: job.projectTitle || "Untitled Project",
        imgComposer: "https://docs.material-tailwind.com/img/face-4.jpg", // Placeholder
        composerName: job.applicantName || "Unknown Composer",
        musicStyle: job.category?.[0] || "General", // Kategori pertama
        tags: job.category || ["General"], // Semua kategori
      });
    });

    // Format data untuk CATEGORIES
    const categorySet = new Set<string>();
    data.results.forEach((job: any) => {
      (job.category || []).forEach((cat: string) => {
        if (!categorySet.has(cat)) {
          categorySet.add(cat);
          CATEGORIES.push({
            id: job.id,
            imgSong: "https://docs.material-tailwind.com/img/face-2.jpg", // Placeholder
            singerName: "Paramore", // Default
            songName: cat, // Nama kategori
            imgComposer: "https://docs.material-tailwind.com/img/face-4.jpg", // Placeholder
            composerName: "Unknown Composer", // Default
            musicStyle: "Category", // Default untuk kategori
            tags: [cat], // Tags hanya berisi nama kategori
            username: job.createdBy[0].name ? job.createdBy[0].name : 'Unknown User',
            fotoprofile: job.createdBy[0].profilePicture ? job.createdBy[0].profilePicture : '',
            category: job.category,
            cultureArea: job.cultureArea,
            lyricLanguage: job.lyricLanguage,
            musicUse: job.musicUse,
            budget: job.budget,
            timeFrame: job.timeFrame,
            applicantName: job.applicantName,
            createdAt: job.createdAt,
          });
        }
      });
    });

    // Format data untuk SELECTED (hanya mengambil beberapa item)
    data.results.slice(0, 3).forEach((job: any, index: number) => {
      SELECTED.push({
        id: job.id,
        imgSong: "https://docs.material-tailwind.com/img/face-2.jpg", // Placeholder
        singerName: "Paramore", // Default
        songName: job.projectTitle || "Untitled Song", // Nama lagu
        imgComposer: "https://docs.material-tailwind.com/img/face-4.jpg", // Placeholder
        username: job.createdBy[0].name ? job.createdBy[0].name : 'Unknown User',
        fotoprofile: job.createdBy[0].profilePicture ? job.createdBy[0].profilePicture : '',
        category: job.category,
        cultureArea: job.cultureArea,
        lyricLanguage: job.lyricLanguage,
        musicUse: job.musicUse,
        budget: job.budget,
        timeFrame: job.timeFrame,
        applicantName: job.applicantName,
        createdAt: job.createdAt,
      });
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    // Kosongkan semua data jika terjadi error
    JOBS_PROPS.length = 0;
    CATEGORIES.length = 0;
    SELECTED.length = 0;
  }
};

// Eksekusi fungsi fetch saat file dimuat
fetchJobsData();
