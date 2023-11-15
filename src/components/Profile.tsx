import { ProfileCard } from "./ProfileCard";
import { ProfileInfo } from "./ProfileInfo";

const Profile = () => {
  return (
    <>
      <section className="flex flex-col lg:flex-row gap-0 lg:gap-16">
        <ProfileCard />
        <ProfileInfo />
      </section>
    </>
  );
};

export { Profile };
