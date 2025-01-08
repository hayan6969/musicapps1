import { Input } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import CardJobs from "@/components/card-jobs";
import { JOBS_PROPS } from "@/conf/jobsprops";
import { useState, useEffect } from "react";

interface Job {
  id: string;
  title: string;
  workcontent: string; // Changed from string[] to string
  musicculture: string;
  descriptionjob: string;
  imgSong: string;
  singerName: string;
  songName: string;
  imgComposer: string;
  composerName: string;
  musicStyle: string;
  tags: string[];
  username: string;
  fotoprofile: string;
  category: string[];
  musicUse: string[];
  cultureArea: string[];
  lyricLanguage: string;
  budget: string[];
  timeFrame: string;
  applicantName: string;
  createdAt:string;
}

interface CheckboxGroupProps {
  selectedCategories: string[];
  onCategoryChange: (category: string, isChecked: boolean) => void;
}

export function CheckboxHorizontalListGroup({ selectedCategories, onCategoryChange }: CheckboxGroupProps) {
  const categories = ["Compose", "Arrange", "Produce", "Write Lyrics"];

  return (
    <Card
      className="w-full max-h-[2.4rem] border-[0.090rem] border-blue-gray-100 shadow-none mt-[0.1rem] rounded-md"
      shadow={false}
      color={"transparent"}
    >
      <List className="flex-row p-0">
        {categories.map((category) => (
          <ListItem key={category} className="p-0">
            <label
              htmlFor={`checkbox-${category}`}
              className="flex w-full cursor-pointer items-center px-1 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  crossOrigin={""}
                  id={`checkbox-${category}`}
                  ripple={false}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => onCategoryChange(category, e.target.checked)}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium text-xs">
                {category}
              </Typography>
            </label>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

export function Freelance() {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(JOBS_PROPS);

  // Handle category checkbox changes
  const handleCategoryChange = (category: string, isChecked: boolean): void => {
    setSelectedCategories(prev => {
      if (isChecked) {
        return [...prev, category];
      } else {
        return prev.filter(c => c !== category);
      }
    });
  };

  // Filter jobs when any filter changes
  useEffect(() => {
    let filtered = [...JOBS_PROPS] as Job[];

    // Filter by search text
    if (searchText) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchText.toLowerCase()) ||
        job.descriptionjob.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filter by region
    if (selectedRegion) {
      filtered = filtered.filter(job => 
        job.musicculture === selectedRegion
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(job => 
        // Check if any selected category is included in the workcontent string
        selectedCategories.some(category => 
          job.workcontent.includes(category)
        )
      );
    }

    setFilteredJobs(filtered);
  }, [searchText, selectedRegion, selectedCategories]);

  // Get unique regions from jobs data
  const regions = Array.from(new Set(JOBS_PROPS.map(job => job.musicculture)));

  return (
    <>
      <section className="grid min-h-screen">
        <div className="flex flex-row justify-start gap-2">
          <div className="flex flex-row justify-start gap-1 w-[37rem] max-w-[37rem]">
            <Input 
              crossOrigin={""} 
              label="Search" 
              size="md"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select 
              size="md" 
              label="Music Cultural Region"
              value={selectedRegion}
              onChange={(value) => setSelectedRegion(value || "")}
            >
              <Option value="">All Regions</Option>
              {regions.map((region) => (
                <Option key={region} value={region}>{region}</Option>
              ))}
            </Select>
          </div>
          <div className="w-[28rem]">
            <CheckboxHorizontalListGroup 
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>
        </div>
        <div className="py-4 flex justify-items-start items-start sm:justify-start">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {filteredJobs.map((props, index) => (
                <CardJobs key={props.id || index} {...props} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Freelance;
