import Link from "next/link";
import React, { useState } from "react";
import { randomNumberText } from "../utils/utils";
import { useEffect } from "react";
import Page from "@/components/utility/Page";

function Page404() {
  const [num404, setNum404] = useState("0000");

  useEffect(() => {
    randomNumberText("404", setNum404);
  }, []);

  return (
    <Page currentPage={"Page Not 404"} meta={{
      title: "Page Not 404",
      desc: "Page Not 404"
    }}>
      {num404 !== "0000" && (
        <div className="min-h-screen w-full flex items-center justify-center flex-col animate-fadeIn">
          <h1 className="text-4xl sm:text-7xl text-white font-monospace font-bold opacity-100">{`{ error: ${num404} }`}</h1>
          <p className="text-fun-gray text-xl mt-8 flex flex-wrap justify-center items-center">
            Sorry, looks like that page is missing!&nbsp;&nbsp;
            <Link href="./">
              <span className="w-full sm:w-auto flex-shrink border border-fun-pink-light text-base px-4 py-1 rounded-xl text-fun-pink-light bg-fun-pink-darkerer hover:bg-fun-pink hover:text-white transition-colors cursor-pointer">
                Return Home
              </span>
            </Link>
          </p>
        </div>
      )}
    </Page>
  );
}

export default Page404;
