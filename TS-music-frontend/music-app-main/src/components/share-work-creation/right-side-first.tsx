// components/share-work-creation/right-side-first.tsx
"use client";

import { Typography, Input } from "@material-tailwind/react";
import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";

interface RightSideFirstProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch?: UseFormWatch<any>;
}

const roles = [
  { id: "composer", label: "Composer" },
  { id: "lyricist", label: "Lyricist" },
  { id: "arranger", label: "Arranger" },
  { id: "producer", label: "Producer" },
];

const languages = [
  { value: "EN", label: "English" },
  { value: "JP", label: "Japanese" },
  { value: "GR", label: "German" },
  { value: "FR", label: "French" },
  { value: "IT", label: "Italian" },
  { value: "SP", label: "Spanish" },
  { value: "KR", label: "Korean" },
  { value: "CH", label: "Chinese" },
  { value: "AR", label: "Arabic" },
];

function RightSideFirst({ register, errors }: RightSideFirstProps) {
  return <div>{/* Other fields, but NO role selection here */}</div>;
}

export default RightSideFirst;
