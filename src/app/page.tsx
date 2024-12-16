import "./common.css";

export default function Home() {
    return (
        <main className={"w-full h-full flex flex-col items-center justify-center"}>
            <div className={"bg-gray-50 w-full py-5 rounded-lg text-gray-900 shadow-md ring-2 ring-gray-200 ring-offset-2 " +
                "flex flex-col justify-start items-start px-4 gap-y-2"}>
                {["dong", "you", "me", "self", ""].map((person, index) => {
                    return (
                        <div key={index}
                             className={"flex gap-x-4 items-center w-full p-2.5 border-b-2 first:pt-0 last:pb-0 last:border-none border-gray-300"}>
                            <div className={"size-12 bg-blue-400 rounded-full animate-pulse"}/>
                            {/*<div className={"w-20 h-3 bg-gray-400 rounded-full animate-pulse"}></div>*/}
                            <span className={"text-lg font-bold empty:w-24 empty:h-4 empty:rounded-full empty:animate-pulse empty:bg-gray-300"}>{person}</span>
                            {/*<div className={"w-16 h-3 bg-gray-400 rounded-full animate-pulse"}></div>*/}
                            <div
                                className={"size-8 bg-red-500 rounded-full flex flex-col items-center justify-center text-white " +
                                    "relative"}>
                                <span className={"z-10"}>{index + 1}</span>
                                <div className={"size-8 bg-red-500 rounded-full absolute animate-ping top-0 left-0"}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </main>
    );
}
