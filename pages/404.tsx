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
        <div className="min-h-[60vh] w-full flex items-center justify-center flex-col animate-fadeIn">
          <h1 className="text-4xl sm:text-7xl text-dash-text font-monospace font-bold">{`{ error: ${num404} }`}</h1>
          <p className="text-dash-muted text-lg mt-8 flex flex-wrap justify-center items-center gap-4">
            Sorry, looks like that page is missing!
            <Link href="/">
              <span className="inline-flex border border-dash-acc/30 text-sm px-5 py-2 rounded-xl text-dash-acc bg-dash-acc/10 hover:bg-dash-acc hover:text-white transition-colors cursor-pointer font-semibold">
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
