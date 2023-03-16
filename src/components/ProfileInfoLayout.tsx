import { Link } from "react-router-dom";

type ProfileInfoLayoutType = {
  children: React.ReactElement[];
  type: "profile" | "edit";
};

export default function ProfileInfoLayout({
  children,
  type,
}: ProfileInfoLayoutType) {
  return (
    <>
      <div
        id="layout_container"
        className="mx-auto w-11/12 mt-3 flex flex-col max-w-3xl"
      >
        <Link
          to={".."}
          className={`text-[#2D9CDB] font-primary text-lg mb-4 ${
            type == "profile" ? "hidden" : ""
          }`}
        >
          &lt; Back
        </Link>
        <div className="md:p-14 md:border-[1px] md:border-[#bdbdbd] md:rounded-xl lg:p-11 2xl:p-9 w-full mb-2">
          {children}
        </div>
        <div
          id="footer_container"
          className="text-[#bdbdbd] flex items-center justify-between mt-auto md:mt-0 w-full"
        >
          <span>@muda2bir</span>
          <span>devChallenges.io</span>
        </div>
      </div>
    </>
  );
}
