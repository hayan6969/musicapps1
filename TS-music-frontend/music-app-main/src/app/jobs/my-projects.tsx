import CardJobs from "@/components/card-jobs";
import { ACTIVE_JOBS, INACTIVE_JOBS } from "@/dummy/example";
import { Typography, Button } from "@material-tailwind/react";

export function MyProjects() {
  return (
    <>
      <section className="grid min-h-screen">
        <div className="py-4 flex justify-items-start items-start sm:justify-start">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
            <Button
              className="w-[11rem] py-2 normal-case text-sm text-black bg-blue-200 border-2 border-black"
              fullWidth
            >
              Post New Project
            </Button>
            <Typography variant="h5" className="font-bold" color="black">
              Active
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {ACTIVE_JOBS.map((props, key) => (
                <CardJobs key={key} {...props} />
              ))}
            </div>
            <div className="pt-[4rem]"></div>
            <Typography variant="h5" className="font-bold" color="black">
              Inactive
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {INACTIVE_JOBS.map((props, key) => (
                <CardJobs key={key} {...props} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyProjects;
