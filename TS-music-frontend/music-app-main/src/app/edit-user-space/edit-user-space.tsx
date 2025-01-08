"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Textarea,
} from "@material-tailwind/react";
import Link from "next/link";
import SelectMultiple from "@/components/dropdown/select-multiple";
import {
  collaborativeOptions,
  instrumentsOptions,
  musicStylesOptions,
} from "@/default/dropdown-multiple";
import { useLocalStorage } from "@/context/LocalStorageContext";
import { Toast } from "primereact/toast";
import { defaultStateUser, IUserProfile } from "@/types/UserSpace";
import { SubmitHandler, useForm } from "react-hook-form";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { removeEmptyStrings } from "@/utils/utils";

export function EditUserSpace() {
  const toast = useRef<Toast>(null);
  const { getItem, setItem } = useLocalStorage();
  const [auth, setAuth] = useState<any>(getItem("auth", null));
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<IUserProfile>();
  const [formData, setFormData] = useState<IUserProfile>(defaultStateUser);

  const [checkedItems, setCheckedItems] = useState<string[]>([]); // Array to hold checked values
  const [isChecked, setIsChecked] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [matchedLang, setMatchedLang] = useState<typeof collaborativeOptions>(
    []
  );

  const [matchedMusicStyles, setMatchedMusicStyles] = useState<
    typeof musicStylesOptions
  >([]);

  const [matchedInstrument, setMatchedInstrument] = useState<
    typeof instrumentsOptions
  >([]);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
      setFormData((prev) => {
        const updatedData = { ...prev, ["profilePicture"]: "" };
        return updatedData;
      });
    }
    setFormData((prev) => {
      const updatedData = { ...prev, ["profilePicture"]: "" };
      return updatedData;
    });
  };

  const handleUpload = async () => {
    if (!file) {
      toast.current?.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please select a profile picture",
        life: 3000,
      });
      return;
    }

    const profilePicture = new FormData();
    profilePicture.append("profilePicture", file);

    try {
      const response = await fetch("http://localhost:3000/v1/upload/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.tokens.access.token}`,
        },
        body: profilePicture,
      });

      if (response.ok) {
        const result = await response.json();

        // Update formData with the full path from the response
        setFormData((prev) => ({
          ...prev,
          profilePicture: result.data.profilePicture, // Use the path from the response
        }));

        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Profile picture uploaded successfully!",
          life: 3000,
        });
      } else {
        const errorResult = await response.json();
        toast.current?.show({
          severity: `${errorResult.code == 422 ? "warn" : "error"}`,
          summary: `${errorResult.code == 422 ? "Warning" : "Error"}`,
          detail: `Error: ${errorResult.message || "Failed to upload profile"}`,
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error during profile upload:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "An unexpected error occurred.",
        life: 3000,
      });
    }
  };

  const handleHiring = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setIsChecked(checked); // Update the state with the checkbox's checked value
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: isChecked };
      return updatedData;
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCheckedItems((prev) => {
      if (e.target.checked) {
        // If checked, add value to the array
        const newCheckedItems = [...prev, value];

        // Transform occupation data into required format
        if (name === "occupation") {
          setFormData((prev) => {
            const updatedData = {
              ...prev,
              creationOccupation: newCheckedItems, // Store all selected occupations as array
              businessOccupation: `${
                value.charAt(0).toUpperCase() + value.slice(1)
              } Business`,
              occupation: undefined, // Remove the old occupation field
            };
            return updatedData;
          });
        }
        return newCheckedItems;
      } else {
        // If unchecked, remove value from the array
        const newCheckedItems = prev.filter((item) => item !== value);

        if (name === "occupation") {
          setFormData((prev) => {
            const updatedData = {
              ...prev,
              creationOccupation: newCheckedItems, // Update array removing unchecked item
              businessOccupation:
                newCheckedItems.length > 0
                  ? `${
                      newCheckedItems[0].charAt(0).toUpperCase() +
                      newCheckedItems[0].slice(1)
                    } Business`
                  : "",
              occupation: undefined,
            };
            return updatedData;
          });
        }
        return newCheckedItems;
      }
    });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      console.log(updatedData);
      return updatedData;
    });
  };

  const onSubmit: SubmitHandler<IUserProfile> = async (data) => {
    // Check if profile picture exists
    if (!formData.profilePicture) {
      toast.current?.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please upload a profile picture",
        life: 3000,
      });
      return;
    }

    let cleanedData = removeEmptyStrings(formData);
    try {
      const response = await fetch("http://localhost:3000/v1/user-space/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.tokens.access.token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      if (response.ok) {
        const result = await response.json();

        auth.isNewUser = false; // Update the key you want
        setItem("auth", auth);

        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Space Created successfully!",
          life: 3000,
        });
        window.location.href = "/user-space";
      } else {
        const errorResult = await response.json();
        toast.current?.show({
          severity: `${errorResult.code == 422 ? "warn" : "error"}`,
          summary: `${errorResult.code == 422 ? "Warning" : "Error"}`,
          detail: `Error: ${errorResult.message || "Failed to update space"}`,
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error during edit user space:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "An unexpected error occurred.",
        life: 3000,
      });
    }
  };

  const onUpdate: SubmitHandler<IUserProfile> = async (data) => {
    console.log(formData);
    console.log("onUpdateSpace", data);
    let cleanedData = removeEmptyStrings(formData);
    try {
      const response = await fetch(
        "http://localhost:3000/v1/user-space/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.tokens.access.token}`,
          },
          body: JSON.stringify(cleanedData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Space updated successfully!",
          life: 3000,
        });
        window.location.href = "/user-space";
      } else {
        const errorResult = await response.json();
        toast.current?.show({
          severity: `${errorResult.code == 422 ? "warn" : "error"}`,
          summary: `${errorResult.code == 422 ? "Warning" : "Error"}`,
          detail: `Error: ${errorResult.message || "Failed to update space"}`,
          life: 3000,
        });
      }
    } catch (error) {
      console.error("Error during edit user space:", error);
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "An unexpected error occurred.",
        life: 3000,
      });
    }
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(formData);
    event.preventDefault();
    console.log("Button clicked");

    if (auth.isNewUser) {
      const onSubmitResult = await handleSubmit(onSubmit)();
      console.log("Submit Space:", onSubmitResult);
    } else {
      const onUpdateSpace = await handleSubmit(onUpdate)();
      console.log("Update Space:", onUpdateSpace);
    }

    // Check if errors exist
    if (Object.keys(errors).length > 0) {
      console.log(selectMultipleValue);
      console.log("Validation errors:", errors);
    }
  };

  const selectMultipleValue = useSelector(
    (state: RootState) => state.selectMultiple.items
  );

  console.log(formData);

  const getProfileImageUrl = (userId: string, filename: string) => {
    if (!userId || !filename) return null;
    return `http://localhost:3000/uploads/${userId}/profilePicture.jpg`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/v1/user-space", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.tokens.access.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Set the image URL if profilePicture exists
          if (data.profilePicture && data.createdBy) {
            const imageUrl = `http://localhost:3000/uploads/${data.createdBy}/profilePicture.jpg`;
            setImageUrl(imageUrl);
          }

          delete data.createdBy;
          delete data.updatedBy;
          delete data.id;
          setFormData(data);
          reset(data);

          // Rest of your existing code for setting other data...
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to fetch data.",
          life: 5000,
        });
      }
    };

    if (!auth?.isNewUser) {
      fetchData();
    }
  }, [auth, reset, toast]);

  console.log(formData);
  console.log(imageUrl);
  console.log(imagePreview);

  if (auth === null) return null; // Render nothing until state is known
  return (
    <section className="flex flex-row justify-center items-center my-8">
      <Toast ref={toast} />
      <form className="flex flex-col gap-2">
        <div className="flex flex-row gap-8">
          <div className="w-96">
            <div className="mb-1 flex flex-col gap-4">
              {/* LEFT */}
              <Typography
                variant="h6"
                color="blue-gray"
                className="mb-2 font-bold"
              >
                Basic Information
              </Typography>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col justify-center items-center gap-8">
                  <div className="w-[18rem] flex flex-col justify-center items-center gap-2 font-semibold text-sm">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-[10rem] h-[10rem] border-2 border-gray-300 border-dashed rounded-full cursor-pointer bg-gray-50"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          100 x 100
                        </p>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        {imageUrl && imagePreview == null ? (
                          <img
                            src={imageUrl}
                            alt="Thumbnail"
                            className="w-[10rem] h-[10rem] rounded-full object-cover absolute"
                          />
                        ) : imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Thumbnail"
                            className="w-[10rem] h-[10rem] rounded-full object-cover absolute"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </label>
                  </div>
                  <Button
                    className={`w-[10rem] ${
                      imagePreview
                        ? "bg-blue-400"
                        : "bg-gray-400 cursor-not-allowed"
                    } normal-case shadow-none`}
                    fullWidth
                    type="button"
                    onClick={handleUpload}
                  >
                    {imageUrl ? "Change Photo" : "Upload Photo"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[26.1rem]">
            {/* RIGHT */}
            <div className="mb-1 flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-1">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="-mb-1 font-semibold"
                  >
                    First Name
                  </Typography>
                  <Input
                    crossOrigin={""}
                    size="lg"
                    placeholder=""
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={formData.firstName}
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    onChange={handleChange}
                    error={!!errors.firstName}
                  />
                  {errors.firstName ? (
                    <p style={{ color: "red" }}>{errors.firstName.message}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="-mb-1 font-semibold"
                  >
                    Last Name
                  </Typography>
                  <Input
                    crossOrigin={""}
                    size="lg"
                    placeholder=""
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    value={formData.lastName}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    onChange={handleChange}
                  />
                  {errors.lastName ? (
                    <p style={{ color: "red" }}>{errors.lastName.message}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex flex-row gap-8 items-center my-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  Occupation
                </Typography>
                <div className="flex flex-col justify-between gap-4 w-fit">
                  <div className="flex justify-between gap-4">
                    <div className="flex items-center me-4">
                      <input
                        id="inline-occupation-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        {...register("occupation", {
                          required: "At least one occupation is required",
                        })}
                        value="composer"
                        checked={checkedItems.includes("composer")} // Check if this option is included
                        onChange={handleCheckbox}
                      />
                      <label
                        htmlFor="inline-occupation-1"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        Composer
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="inline-occupation-2"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        {...register("occupation")}
                        value="arranger"
                        checked={checkedItems.includes("arranger")} // Check if this option is included
                        onChange={handleCheckbox}
                      />
                      <label
                        htmlFor="inline-occupation-2"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        Arranger
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center me-4">
                      <input
                        id="inline-occupation-3"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        {...register("occupation")}
                        value="lyricist"
                        checked={checkedItems.includes("lyricist")} // Check if this option is included
                        onChange={handleCheckbox}
                      />
                      <label
                        htmlFor="inline-occupation-3"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        Lyricist
                      </label>
                    </div>
                    <div className="flex items-center me-4">
                      <input
                        id="inline-occupation-4"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        {...register("occupation")}
                        value="producer"
                        checked={checkedItems.includes("producer")} // Check if this option is included
                        onChange={handleCheckbox}
                      />
                      <label
                        htmlFor="inline-occupation-4"
                        className="ms-2 text-sm font-medium text-gray-900 "
                      >
                        Producer
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {errors.occupation ? (
                <p style={{ color: "red" }}>{errors.occupation.message}</p>
              ) : (
                ""
              )}
              <div className="flex flex-row items-center gap-4 my-2">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                >
                  Hiring
                </Typography>
                <div className="flex items-center me-4 gap-2">
                  <input
                    id="inline-culture-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    {...register("hiring")}
                    checked={formData.hiring ? formData.hiring : isChecked} // Controlled component
                    onChange={handleHiring}
                  />
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="inline-culture-1"
                      className="ms-2 text-sm font-medium text-gray-900 "
                    >
                      Freelance Project
                    </label>
                    <label
                      htmlFor="inline-culture-1"
                      className="ms-2 text-xs font-medium text-gray-700 "
                    >
                      Available to work
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="default"
                  className="block text-sm font-semibold text-gray-900 "
                >
                  Collaboration lyrics Language
                </label>
                <SelectMultiple
                  options={collaborativeOptions}
                  label={"Select Languages"}
                  keyState={"collaborationLyricsLangs"}
                  {...register("collaborationLyricsLangs")}
                  setFormData={setFormData}
                  selectedValue={matchedLang}
                />
                {selectMultipleValue.collaborationLyricsLangs.length == 0 ? (
                  <p style={{ color: "red" }}>
                    At least one collaboration lyric language is required
                  </p>
                ) : (
                  ""
                )}
              </div>
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Proficient in musical style
              </Typography>
              <SelectMultiple
                options={musicStylesOptions}
                label={"Choose Music Styles"}
                keyState={"proficientMusicStyles"}
                {...register("proficientMusicStyles")}
                setFormData={setFormData}
                selectedValue={matchedMusicStyles}
              />
              {selectMultipleValue.proficientMusicStyles.length == 0 ? (
                <p style={{ color: "red" }}>
                  At least one Proficient music styles is required
                </p>
              ) : (
                ""
              )}
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Skilled Instrument
              </Typography>
              <SelectMultiple
                options={instrumentsOptions}
                label={"Choose an Instrument"}
                keyState={"skilledInstruments"}
                {...register("skilledInstruments")}
                setFormData={setFormData}
                selectedValue={matchedInstrument}
              />
              {selectMultipleValue.skilledInstruments.length == 0 ? (
                <p style={{ color: "red" }}>
                  At least one Skilled instruments is required
                </p>
              ) : (
                ""
              )}
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Collaborated Singers
              </Typography>
              <Textarea
                className="w-[25rem] !h-[4rem]"
                {...register("collaboratedSingers", {
                  required: "Collaborated singers are required",
                })}
                value={formData.collaboratedSingers}
                onChange={handleChange}
              />
              {errors.collaboratedSingers ? (
                <p style={{ color: "red" }}>
                  {errors.collaboratedSingers.message}
                </p>
              ) : (
                ""
              )}
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Collaborated Publishers
              </Typography>
              <Textarea
                className="w-[25rem] !h-[4rem]"
                {...register("collaboratedPublisher", {
                  required: "Collaborated publisher is required",
                })}
                value={formData.collaboratedPublisher}
                onChange={handleChange}
              />
              {errors.collaboratedPublisher ? (
                <p style={{ color: "red" }}>
                  {errors.collaboratedPublisher.message}
                </p>
              ) : (
                ""
              )}
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Company or Studio
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("companyOrStudio", {
                  required: "Company or studio is required",
                })}
                value={formData.companyOrStudio}
                onChange={handleChange}
              />
              {errors.companyOrStudio ? (
                <p style={{ color: "red" }}>{errors.companyOrStudio.message}</p>
              ) : (
                ""
              )}

              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Website URL
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("websiteUrl")}
                value={formData.websiteUrl}
                onChange={handleChange}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                About Me
              </Typography>
              <Textarea
                className="w-[25rem] !h-[15rem]"
                {...register("aboutMe", { required: "About me is required" })}
                value={formData.aboutMe}
                onChange={handleChange}
              />
              {errors.aboutMe ? (
                <p style={{ color: "red" }}>{errors.aboutMe.message}</p>
              ) : (
                ""
              )}
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Software Tool
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("softwareTool")}
                value={formData.softwareTool}
                onChange={handleChange}
              />
              <span className="mt-2"></span>
              <h5>Social Media</h5>
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Apple Music
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("appleMusic")}
                value={formData.appleMusic}
                onChange={handleChange}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Spotify
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("spotify")}
                value={formData.spotify}
                onChange={handleChange}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Bandcam
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("bandcam")}
                value={formData.bandcam}
                onChange={handleChange}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Sound Cloud
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("soundCloud")}
                value={formData.soundCloud}
                onChange={handleChange}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                X
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("x")}
                value={formData.x}
                onChange={handleChange}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Facebook
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("facebook")}
                value={formData.facebook}
                onChange={handleChange}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                iHeartRadio
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("iHeartRadio")}
                value={formData.iHeartRadio}
                onChange={handleChange}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-3 font-semibold"
              >
                Genius
              </Typography>
              <Input
                crossOrigin={""}
                size="lg"
                placeholder=""
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                {...register("Genius")}
                value={formData.Genius}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-4 my-6">
          <div className="mr-2">
            <Link href={"/user-space"} className="">
              <Button
                className="bg-blue-gray-100 text-blue-gray-800 w-[8rem]"
                color="blue-gray"
                fullWidth
              >
                Cancel
              </Button>
            </Link>
          </div>
          <div className="flex flex-row gap-6">
            <Button
              className="bg-blue-gray-100 text-blue-gray-800 w-[13rem]"
              color="blue-gray"
              fullWidth
            >
              Save as Draft
            </Button>
            <Button
              type="button"
              onClick={handleClick}
              className="w-[8rem]"
              color="blue"
              fullWidth
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default EditUserSpace;
