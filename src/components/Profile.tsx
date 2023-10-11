import { ProfileCard } from "./ProfileCard";
import { ProfileInfo } from "./ProfileInfo";

const Profile = () => {
  return (
    <>
      <section className="flex flex-row gap-16">
        <ProfileCard />
        <ProfileInfo />
      </section>
    </>
  );
};

export { Profile };
