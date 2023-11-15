import { Profile } from "@/components/Profile";

export default function Home() {
  return (
    <>
      <div className="mt-8 lg:mt-24">
        <Profile />
        <hr className="border-neutral-700 mt-0 lg:mt-8" />
        <section>
          {/* <p>This is me!</p> */}
          {/* <Image /> */}
        </section>
      </div>
    </>
  );
}
