import CardJobs from "@/components/card-jobs";
import { SAVED_JOBS, APPLIED_JOBS } from "@/services/jobService";
import { Typography } from "@material-tailwind/react";

export function SavedJobs() {
  return (
    <>
      <section className="grid min-h-screen">
        <div className="py-4 flex justify-items-start items-start sm:justify-start">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
            <Typography variant="h5" className="font-bold" color="black">
              Saved Jobs
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {SAVED_JOBS.map((props, key) => (
                <CardJobs key={key} {...props} />
              ))}
            </div>
            <div className="pt-[4rem]"></div>
            <Typography variant="h5" className="font-bold" color="black">
              My Application
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {APPLIED_JOBS.map((props, key) => (
                <CardJobs key={key} {...props} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SavedJobs;
