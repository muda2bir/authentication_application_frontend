import Loader from "../assets/loader.svg";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <img src={Loader} alt="Loading...." />
    </div>
  );
}
