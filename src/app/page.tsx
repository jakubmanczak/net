import { Profile } from "@/components/Profile";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="mt-8 lg:mt-24">
        <Profile />
      </div>
    </>
  );
}
