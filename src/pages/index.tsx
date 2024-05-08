import Head from "next/head";
import React, { useRef, useEffect, useState, useContext } from "react";
import {
  ClipboardDocumentIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import CopyToClipboard from "react-copy-to-clipboard";
import dynamic from "next/dynamic";
import {
  getLastQueryParamValueFromUrl,
  shareViaWhatsApp,
  shareViaEmail,
} from "@/utils/helpers";
import { IoLogoGithub } from "react-icons/io";
import Link from "next/link";
import HomeSEO from "@/components/HomeSEO";
import { BsWhatsapp } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { format } from "date-fns";

const DynamicQrScanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  {
    ssr: false,
  }
);

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const Home = () => {
  const [value, setValue] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  let getTextToSend = (): string => {
    if (value == null) return "";
    return `CU Invoice No: ${getLastQueryParamValueFromUrl(
      value
    )}\n\nScanned on ${format(
      new Date(),
      "do MMM yyyy hh:mm aaa"
    )}\n\nScanned with https://cucopy.com\n\nQR Code Link :\n\n`;
  };

  useEffect(() => {
    // Check if the browser supports PWA installation
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the default browser prompt
      event.preventDefault();
      // Store the event to show the prompt later
      setDeferredPrompt(event);
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      // Show the browser install prompt
      deferredPrompt.prompt();
      // Wait for the user to interact with the prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        // Reset the deferred prompt
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      <Head>
        <title>CUCOPY</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <HomeSEO />

      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-1 w-full bg-black h-full">
          <div className="max-w-6xl mx-auto  bg-black h-full text-white grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Hero Text */}
            <div className="flex flex-col space-x-4 md:space-x-0 md:space-y-8 space-y-4 justify-center md:justify-start items-center md:items-start">
              <h1 className="font-display font-bold text-3xl text-center md:text-left md:text-6xl">
                Free
                <div className="inline-block relative mx-2">
                  <span className="text-blue-500">CU Invoice No</span>
                  <svg
                    height="19"
                    viewBox="0 0 101 19"
                    fill="none"
                    className="absolute bottom-0 -mb-4 w-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 14.5C11.6667 11 51.7 1.69999 96.5 6.49999"
                      stroke="#3b82f6"
                      strokeWidth="9"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                Scanner{" "}
              </h1>
              <h2 className="hidden md:inline-block text-lg md:text-3xl text-gray-200">
                Copy CU invoice numbers from physical receipts/tax invoices to
                wherever you need them.
              </h2>
              {/* Rating */}
              <div className="text-xs w-full flex md:justify-start justify-center  md:text-base space-x-2 ">
                <div>🆓 Free</div>
                <div>⛔️ Offline</div>
                <Link
                  target="_blank"
                  href={`https://github.com/DavidAmunga/cucopy`}
                  className="flex w-fit underline items-center space-x-1"
                >
                  <IoLogoGithub />
                  <span>Open Source</span>
                </Link>
              </div>
            </div>

            <div className="flex w-full  md:items-end items-center  flex-col h-fit space-y-4 md:mx-0 z-20">
              <div className="flex w-4/5 h-2/6 rounded-md overflow-hidden border-8 border-blue-600">
                <DynamicQrScanner
                  onResult={(text, result) => setValue(result.getText())}
                  styles={{
                    container: {
                      height: "100%",
                    },
                    video: { height: "100%" },
                  }}
                  onError={(error) => {
                    console.log(error?.message);
                    toast.error(error?.message ?? "There was a problem scan");
                  }}
                />
              </div>

              <div className="flex w-4/5 h-fit flex-col space-y-3 bg-white border-2 px-4 py-5 border-blue-400 rounded-md shadow-md">
                <p className="text-gray-500 text-sm">
                  Scan Tax Invoice QR Code to get CU Invoice No
                </p>
                <div className="flex flex-col space-y-1.5">
                  <div className="w-full bg-blue-200 py-2 font-bold px-2  rounded-md text-blue-900">
                    {value
                      ? getLastQueryParamValueFromUrl(value)
                      : "---- ----- ----- ---"}
                  </div>
                  {value && value.length > 0 && (
                    <CopyToClipboard
                      text={getLastQueryParamValueFromUrl(value) ?? ""}
                      onCopy={() => {
                        toast.success("Copied to Clipboard");
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <button
                          type="submit"
                          className=" flex justify-center space-x-2  bg-blue-500 hover:bg-blue-600 w-full py-4 font-bold text-xl shadow-md rounded-md"
                        >
                          <span className="">COPY</span>

                          <ClipboardDocumentIcon className="size-7" />
                        </button>
                      </motion.div>
                    </CopyToClipboard>
                  )}
                </div>
                <hr />
                {value != null && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <button
                      type="submit"
                      onClick={() => {
                        window.open(`${value}`, "__blank");
                      }}
                      className=" bg-gray-800 hover:bg-gray-900 items-center w-full flex justify-center space-x-2 py-4 font-bold text-xl shadow-md rounded-md "
                    >
                      <span>CONFIRM</span>
                      <ArrowTopRightOnSquareIcon className="size-7" />
                    </button>
                  </motion.div>
                )}
                {value && (
                  <div className="grid grid-cols-1 gap-2">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <button
                        type="submit"
                        onClick={() => {
                          shareViaWhatsApp(getTextToSend(), value);
                        }}
                        className=" bg-[#25D366] hover:opacity-90 items-center w-full flex justify-center space-x-2 py-4 font-bold text-xl shadow-md rounded-md "
                      >
                        <span>SHARE ON WHATSAPP</span>
                        <BsWhatsapp />
                      </button>
                    </motion.div>{" "}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <button
                        type="submit"
                        onClick={() => {
                          shareViaEmail(
                            `Tax Invoice for ${format(
                              new Date(),
                              "do MMM yyyy hh:mm aaa"
                            )}`,
                            `${getTextToSend()}${value}`
                          );
                        }}
                        className=" bg-gray-800 hover:bg-gray-900 w-full flex items-center justify-center space-x-2 py-4 font-bold text-xl shadow-md rounded-md "
                      >
                        <span>SHARE ON EMAIL</span>
                        <RiMailSendLine />
                      </button>
                    </motion.div>
                  </div>
                )}
              </div>
              <div className="flex-1"></div>
            </div>
          </div>
        </main>
        {deferredPrompt && (
          <div>
            <p>This app can be installed as a PWA.</p>
            <button onClick={handleInstallClick}>Install</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
