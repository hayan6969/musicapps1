"use client";

import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocalStorage } from "@/context/LocalStorageContext";
import { removeEmptyStrings } from "@/utils/utils";
import { IMusicAsset, defaultMusicAsset } from "@/types/ShareMusicAsset"; // Adjust path as needed

const musicUse = [
  "Pop Music",
  "Folk Music",
  "Game Music",
  "Movie Music",
  "Classical Music",
  "Children Music",
  "Dance Music",
  "Travel Music",
  "Animation Music",
  "Light Music",
];

export default function ShareWorkSalesMarket() {
  const toast = useRef<Toast>(null);
  const { getItem } = useLocalStorage();
  const [auth] = useState<any>(getItem("auth", null));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMusicAsset>();

  const [formData, setFormData] = useState<IMusicAsset>(defaultMusicAsset);

  const [fileImage, setFileImage] = useState<File | null>(null);
  const [fileMusic, setFileMusic] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [musicPreview, setMusicPreview] = useState<string | null>(null);

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isPersonalUse, setIsPersonalUse] = useState(false);
  const [isCommercialUse, setIsCommercialUse] = useState(false);
  const [isContract, setIsContract] = useState(false);
  const [tags, setTags] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setCheckedItems((prev) => {
      let newCheckedItems;
      if (checked) {
        newCheckedItems = [...prev, value];
      } else {
        newCheckedItems = prev.filter((item) => item !== value);
      }
      setFormData((prev) => ({ ...prev, [name]: newCheckedItems }));
      return newCheckedItems;
    });
  };

  const handlePersonalUse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsPersonalUse(checked);
    setFormData((prev) => ({ ...prev, personalUse: checked }));
  };

  const handleCommercialUse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsCommercialUse(checked);
    setFormData((prev) => ({ ...prev, commercialUse: checked }));
  };

  const handleCollaborationContact = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = e.target;
    setIsContract(checked);
    setFormData((prev) => ({ ...prev, collaborationContact: checked }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagValue = e.target.value;
    setTags(tagValue);
    const tagArray = tagValue
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    if (tagArray.length < 3) {
      setError("Please enter at least 3 tags separated by commas.");
    } else {
      setError("");
    }
    setFormData((prev) => ({ ...prev, tags: tagValue }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setFileImage(selectedFile);
    }
  };

  const handleFileMusicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMusicPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setFileMusic(selectedFile);
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      if (!fileImage) return;
      const musicImageForm = new FormData();
      musicImageForm.append("musicImage", fileImage);

      try {
        const response = await fetch(
          "http://localhost:3000/v1/upload/music-image",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${auth.tokens.access.token}`,
            },
            body: musicImageForm,
          }
        );

        if (response.ok) {
          const result = await response.json();
          // Use the 'profilePicture' field
          setFormData((prev) => ({
            ...prev,
            musicImage: result.data.profilePicture,
          }));
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Upload Music Image successful!",
            life: 3000,
          });
        } else {
          const errorResult = await response.json();
          toast.current?.show({
            severity: errorResult.code === 422 ? "warn" : "error",
            summary: errorResult.code === 422 ? "Warning" : "Error",
            detail: `Error: ${
              errorResult.message || "Failed to upload Music Image"
            }`,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error during Upload Music Image:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "An unexpected error occurred.",
          life: 3000,
        });
      }
    };

    const uploadMusic = async () => {
      if (!fileMusic) return;
      const track = new FormData();
      track.append("track", fileMusic);

      try {
        const response = await fetch("http://localhost:3000/v1/tracks", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.tokens.access.token}`,
          },
          body: track,
        });

        if (response.ok) {
          const result = await response.json();
          // result.data is the Mongo ObjectID, use it as your music identifier
          setFormData((prev) => ({ ...prev, music: result.data }));
          toast.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Upload Music Track successful!",
            life: 3000,
          });
        } else {
          const errorResult = await response.json();
          toast.current?.show({
            severity: errorResult.code === 422 ? "warn" : "error",
            summary: errorResult.code === 422 ? "Warning" : "Error",
            detail: `Error: ${
              errorResult.message || "Failed to upload Music Track"
            }`,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error during Upload Music:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "An unexpected error occurred.",
          life: 3000,
        });
      }
    };

    if (fileImage) {
      uploadImage();
    }

    if (fileMusic) {
      uploadMusic();
    }
  }, [fileImage, fileMusic, auth]);

  const onSubmit: SubmitHandler<IMusicAsset> = async (data) => {
    const finalData = { ...formData, ...data, myRole: checkedItems };
    const cleanedData = removeEmptyStrings(finalData);

    try {
      const response = await fetch("http://localhost:3000/v1/music-asset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.tokens.access.token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        await response.json();
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Music Asset Created successfully!",
          life: 5000,
        });

        // Reload the page after success
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        const errorResult = await response.json();
        toast.current?.show({
          severity: errorResult.code == 422 ? "warn" : "error",
          summary: errorResult.code == 422 ? "Warning" : "Error",
          detail: `Error: ${
            errorResult.message || "Failed to create music asset"
          }`,
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error creating music asset:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "An unexpected error occurred.",
        life: 3000,
      });
    }
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await handleSubmit(onSubmit)();
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <section className="flex flex-row justify-center items-center my-8">
      <Toast ref={toast} />
      <form className="flex flex-col gap-2">
        <div className="flex flex-row gap-8">
          <div className="w-96">
            {/* LEFT SIDE */}
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-bold"
              >
                Music Name
              </Typography>
              <Input
                crossOrigin={undefined}
                size="lg"
                {...register("musicName", {
                  required: "Music Name is required",
                })}
                onChange={handleChange}
                error={!!errors.musicName}
              />
              {errors.musicName && (
                <p style={{ color: "red" }}>{errors.musicName.message}</p>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex justify-center items-center gap-2">
                  <div className="w-[18rem] flex flex-col justify-center items-center gap-2 font-semibold text-sm">
                    Upload Music Image
                    <label
                      htmlFor="dropzone-file"
                      className="relative flex flex-col items-center justify-center w-[10rem] h-[10rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                    >
                      {!imagePreview && (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Less than 1M</span>
                          </p>
                        </div>
                      )}
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Thumbnail"
                          className="w-[10rem] h-[10rem] object-cover shadow-md absolute hover:scale-105 rounded-md"
                        />
                      )}
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-2">
                  <div className="w-[18rem] flex flex-col justify-center items-center gap-2 font-semibold text-sm">
                    Upload Music
                    <label
                      htmlFor="dropzone-file-music"
                      className="relative flex flex-col items-center justify-center w-[10rem] h-[6rem] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                    >
                      {!musicPreview && (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">Less than 20M</span>
                          </p>
                        </div>
                      )}
                      {musicPreview && (
                        <img
                          src={musicPreview}
                          alt="music Thumbnail"
                          className="w-[10rem] h-[6rem] object-cover shadow-md absolute hover:scale-105 rounded-md"
                        />
                      )}
                      <input
                        id="dropzone-file-music"
                        type="file"
                        className="hidden"
                        onChange={handleFileMusicChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-2 max-w-[28rem]">
                  <Button
                    className="bg-blue-200 text-black normal-case w-[16rem] flex items-center justify-center"
                    color="blue"
                    variant="filled"
                  >
                    <span className="text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full bg-blue-800">
                      PRO
                    </span>
                    Upgrade to gain more attention
                  </Button>
                </div>

                <div className="flex flex-col gap-1 my-6">
                  <p className="text-black font-bold text-sm">Music Sales</p>
                  <div className="flex flex-row items-center gap-3 justify-between h-[2.7rem] max-h-[2.7rem]">
                    <div className="flex items-center">
                      <input
                        id="inline-music-sales"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        checked={isPersonalUse}
                        onChange={handlePersonalUse}
                      />
                      <label
                        htmlFor="inline-music-sales"
                        className="ms-1 text-sm font-medium text-gray-900"
                      >
                        Personal Use
                      </label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-1">
                      US$
                      <div className="max-w-[5rem]">
                        <input
                          type="number"
                          name="personalUsePrice"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row items-center gap-3 justify-between h-[2.7rem] max-h-[2.7rem]">
                    <div className="flex items-center">
                      <input
                        id="inline-music-sales-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        checked={isCommercialUse}
                        onChange={handleCommercialUse}
                      />
                      <label
                        htmlFor="inline-music-sales-2"
                        className="ms-1 text-sm font-medium text-gray-900"
                      >
                        Commercial Use
                      </label>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-1">
                      US$
                      <div className="max-w-[5rem]">
                        <input
                          type="number"
                          name="commercialUsePrice"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center h-[2.7rem] max-h-[2.7rem]">
                    <input
                      id="inline-music-sales-3"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      checked={isContract}
                      onChange={handleCollaborationContact}
                    />
                    <label
                      htmlFor="inline-music-sales-3"
                      className="ms-1 text-sm font-medium text-gray-900"
                    >
                      Collaboration Contact
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-96">
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                My Role (Multiple Choice)
              </Typography>
              <div className="flex">
                <div className="flex items-center me-4">
                  <input
                    id="inline-checkbox"
                    type="checkbox"
                    className="w-4 h-4"
                    {...register("myRole", {
                      required: "At least one Role is required",
                    })}
                    value="composer"
                    checked={checkedItems.includes("composer")}
                    onChange={handleCheckbox}
                    name="myRole"
                  />
                  <label
                    htmlFor="inline-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Composer
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    id="inline-2-checkbox"
                    type="checkbox"
                    className="w-4 h-4"
                    {...register("myRole")}
                    value="lyricist"
                    checked={checkedItems.includes("lyricist")}
                    onChange={handleCheckbox}
                    name="myRole"
                  />
                  <label
                    htmlFor="inline-2-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Lyricist
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    id="inline-3-checkbox"
                    type="checkbox"
                    className="w-4 h-4"
                    {...register("myRole")}
                    value="arranger"
                    checked={checkedItems.includes("arranger")}
                    onChange={handleCheckbox}
                    name="myRole"
                  />
                  <label
                    htmlFor="inline-3-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Arranger
                  </label>
                </div>
                <div className="flex items-center me-4">
                  <input
                    id="inline-4-checkbox"
                    type="checkbox"
                    className="w-4 h-4"
                    {...register("myRole")}
                    value="producer"
                    checked={checkedItems.includes("producer")}
                    onChange={handleCheckbox}
                    name="myRole"
                  />
                  <label
                    htmlFor="inline-4-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    Producer
                  </label>
                </div>
              </div>
              {errors.myRole && (
                <p style={{ color: "red" }}>{errors.myRole.message}</p>
              )}

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Creation Time
              </Typography>
              <Input
                crossOrigin={undefined}
                size="lg"
                {...register("creationTime", {
                  required: "Creation Time is required",
                })}
                onChange={handleChange}
                error={!!errors.creationTime}
              />
              {errors.creationTime && (
                <p style={{ color: "red" }}>{errors.creationTime.message}</p>
              )}

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="musicUsage"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Music Use
                </label>
                <select
                  id="musicUsage"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  {...register("musicUsage", {
                    required: "Music usage is required.",
                  })}
                  onChange={handleChange}
                >
                  <option value="">Select Music Use</option>
                  <option value="pop-music">Pop Music</option>
                  <option value="folk-music">Folk Music</option>
                  <option value="game-music">Game Music</option>
                  <option value="movie-music">Movie Music</option>
                  <option value="classical-music">Classical Music</option>
                  <option value="children-music">Children Music</option>
                  <option value="dance-music">Dance Music</option>
                  <option value="travel-music">Travel Music</option>
                  <option value="animation-music">Animation Music</option>
                  <option value="light-music">Light Music</option>
                </select>
                {errors.musicUsage && (
                  <p className="text-red-500 text-xs">
                    {errors.musicUsage.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="musicStyle"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Music Style
                </label>
                <select
                  id="musicStyle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  {...register("musicStyle", {
                    required: "Music Style is required.",
                  })}
                  onChange={handleChange}
                >
                  <option value="">Select Music Style</option>
                  <option value="ambient">Ambient</option>
                  <option value="blues">Blues</option>
                  <option value="cinematic">Cinematic</option>
                  <option value="classical">Classical</option>
                  <option value="country">Country</option>
                </select>
                {errors.musicStyle && (
                  <p className="text-red-500 text-xs">
                    {errors.musicStyle.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="musicMood"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Music Mood
                </label>
                <select
                  id="musicMood"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
                  {...register("musicMood", {
                    required: "Music Mood is required.",
                  })}
                  onChange={handleChange}
                >
                  <option value="">Select Music Mood</option>
                  <option value="happy">Happy</option>
                  <option value="sad">Sad</option>
                  <option value="exciting">Exciting</option>
                </select>
                {errors.musicMood && (
                  <p className="text-red-500 text-xs">
                    {errors.musicMood.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 mt-4">
          <div className="my-2 w-full">
            <div className="mb-1 flex flex-col gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Musical Instrument (Optional)
              </Typography>
              <Input
                crossOrigin={undefined}
                size="lg"
                {...register("musicInstrument")}
                onChange={handleChange}
              />

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Tags (min 3)
              </Typography>
              <Input
                crossOrigin={undefined}
                size="lg"
                placeholder="e.g., Jazz, Acoustic, Instrumental"
                value={tags}
                onChange={handleTagChange}
              />
              {error && (
                <label className="text-red-500 -mt-4 text-xs">{error}</label>
              )}

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Description
              </Typography>
              <Textarea
                className="w-96 h-56"
                {...register("description", {
                  required: "Description is required",
                })}
                onChange={handleChange}
              />
              {errors.description && (
                <p style={{ color: "red" }}>{errors.description.message}</p>
              )}

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Software Tool (Optional)
              </Typography>
              <Input
                crossOrigin={undefined}
                size="lg"
                {...register("softwareTool")}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-4 mt-4">
          <Button
            className="bg-blue-gray-100 text-black w-[8rem]"
            color="blue-gray"
            variant="outlined"
            fullWidth
            type="button"
          >
            Cancel
          </Button>
          <div className="flex flex-row gap-6">
            <Button
              className="bg-blue-gray-100 text-black w-[14rem]"
              color="blue-gray"
              variant="outlined"
              fullWidth
              type="button"
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              onClick={handleClick}
              className="w-[14rem]"
              color="blue"
              fullWidth
            >
              Publish
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
