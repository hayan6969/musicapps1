// import { CATEGORIES } from "@/dummy/example";
import { CATEGORIES } from "@/conf/music";
import ProfileBox from "@/components/profile/profile-box";

export function HiringMusician() {
  return (
    <>
      <section className="grid min-h-screen">
        <div className="py-4 flex justify-items-start items-start sm:justify-start">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {CATEGORIES.map((props, key) => (
                <ProfileBox key={key} {...props} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HiringMusician;
