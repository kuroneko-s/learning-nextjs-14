import "./common.css";

export default function Home() {
    return (
        <main className={"w-full h-full flex flex-col items-center justify-center"}>
            <div className={"bg-gray-200 w-full py-5 rounded-lg text-gray-900 shadow-md " +
                "flex flex-col justify-start items-start px-4 gap-y-2 " +
                "sm:bg-red-100 md:bg-green-200 lg:bg-blue-100 xl:bg-purple-100 2xl:bg-orange-100 " +
                "md:flex-row md:gap-x-2 *:outline-none has-[:invalid]:ring-red-200 ring ring-transparent transition-shadow"}>
                <input type={"text"} placeholder={"Address"} required
                       className={"w-full rounded-full py-2 px-4 bg-gray-500 text-white ring-transparent " +
                           "transition-shadow focus:shadow-outline focus:ring-2 " +
                           "focus:ring-yellow-400 focus:ring-offset-2 " +
                           "placeholder:text-white invalid:focus:ring-red-500 peer is-dirty"}/>
                {/*그라데이션이 우선순위가 엄청 높음*/}
                {/*bg-gradient-to-tr from-cyan-400 via-yellow-400  to-purple-400*/}
                <span className={"text-red-500 font-medium hidden peer-invalid:block"}>Email is required</span>
                <button className={"bg-opacity-95 text-white rounded-full px-4 py-2 w-full hover:bg-gray-800 " +
                    "active:scale-90 transition-transform bg-black " +
                    "focus:ring-2 ring-yellow-400 md:w-fit peer-[.is-dirty]:peer-invalid:bg-red-500 peer-invalid:text-gray-900"}>Log
                    in
                </button>

                {/*<input type={"text"} className={"peer is-normal"} required />*/}
                {/*<button className={"bg-black peer-[.is-normal]:peer-invalid:bg-purple-200"}>Search2</button>*/}
            </div>
        </main>
    );
}
