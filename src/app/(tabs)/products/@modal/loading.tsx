export default function defaultLoading() {
 return <div
     className={"bg-gray-900 fixed top-0 left-0 w-full h-full bg-opacity-85 flex flex-col items-start justify-start py-8 px-4 gap-4 *:text-neutral-100"}>
  <div className={"w-full h-[320px] relative"}>
  </div>
  <p className={""}>1</p>
  <p>2</p>
  <p>3</p>
  <button className={"bg-neutral-700 w-full py-3 rounded-lg cursor-pointer transition-colors hover:bg-neutral-600"}
          type={"button"}>4
  </button>
 </div>
}
