import {PhotoIcon} from "@heroicons/react/24/solid";

export default function ProductsModalLoading() {
 return <div className={"bg-gray-900 fixed top-0 left-0 w-full h-full bg-opacity-85 flex flex-col items-start justify-start py-8 px-4 gap-4 " +
     "*:text-neutral-100 z-[99] animate-pulse"}>
  <div className="aspect-square border-neutral-700 rounded-md flex justify-center items-center w-full overflow-hidden">
   <PhotoIcon className={"w-20"} />
  </div>
  <p className={"w-1/2 bg-neutral-400 py-2 rounded-sm"}></p>
  <p className={"w-full bg-neutral-400 py-4 rounded-sm"}></p>
  <p className={"w-1/4 bg-neutral-400 py-1 rounded-sm"}></p>
  <button className={"bg-neutral-700 w-full py-6 rounded-lg cursor-pointer transition-colors hover:bg-neutral-600"} type={"button"}></button>
 </div>
}
