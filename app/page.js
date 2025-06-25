
import YouTubeEmbed from "@/components/Yt";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="container p-2 mx-auto min-h-[40vh] flex flex-col justify-center items-center text-white gap-3">
        <div className="flex justify-center items-center text-center">  <div className="text-4xl md:text-5xl font-bold">Buy me a chai</div>
          <div className="w-22 md:w-18"><img src="./chai.gif" alt="" /></div>
        </div>
        <p>A crowd funding platform for the creators . We help you raise funds for your projects and ideas . </p>
        <div className="flex gap-2">
          <Link href={"/creators"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now</button>
          </Link>
          <Link href={"/about"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read more</button>
          </Link>
        </div>

      </div>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto p-5">

        <h2 className="text-3xl font-bold text-center my-6">Your fans can support you</h2>

        <div className="flex gap-2 justify-around items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-20 h-20 rounded-full  overflow-hidden">  <img src="man.gif" alt="" className="w-full h-full object-cover rounded-full" /></div>
            <span className="font-bold text-center">Fund yourself </span>
            <p className="w-1/2 text-center">Make a small donation to help you reach your goals</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-20 h-20  rounded-full  overflow-hidden">  <img src="coin.gif" alt="" className="w-full h-full object-cover rounded-full" /></div>
            <span className="font-bold text-center">Fund a creator</span>
            <p className="w-1/2 text-center">Make a small donation to help you reach your goals</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-20 h-20  rounded-full  overflow-hidden">  <img src="group.gif" alt="" className="w-full h-full object-cover rounded-full" /></div>
            <span className="font-bold text-center">Support a community</span>
            <p className="w-1/2 text-center">Make a small donation to help you reach your goals</p>
          </div>

        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto p-5">

        <h2 className="text-3xl font-bold text-center my-6">Learn more</h2>
        <div className="flex justify-center items-center ">
          <div className="md:w-1/3"><YouTubeEmbed /></div>

        </div>

      </div>
    </>
  );
}
