import {FansChart} from "@/charts"
import {GeneBand} from "@/charts/GeneBand"
import {GeneChart} from "@/charts/GeneChart"
import {Anim, Navigation} from "@/widgets"
import clsx from "clsx"
import {NextPage} from "next"
import Head from "next/head"
import Link from "next/link"
import styles from "./home.module.css"

const Home: NextPage = () => <>
  <Head>
    <title>王志威用于pre、课程论文、实验报告的官方网站</title>
  </Head>

  <div
    className={"flex flex-col items-center mb-20 space-y-20 overflow-hidden sm:mb-32 sm:space-y-32 md:mb-40 md:space-y-40"}>
    <header className={"relative w-full"}>
      <div className="px-4 sm:px-6 md:px-8">
        <div
          className={clsx(
            "absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-gray-50 dark:bg-[#0B1120]",
            styles.beams
          )}
        >
          <div
            className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-gray-400/[0.05] dark:bg-bottom dark:border-b dark:border-gray-100/5"
            style={{
              maskImage: "linear-gradient(to bottom, transparent, black)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent, black)"
            }}
          />
        </div>
      </div>

      <Navigation/>

      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <h1
          className="text-gray-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          Class papers、lab reports and presentations by <strong
          className={"bg-gradient-to-r from-sky-500 to-purple-700 gradient"}>Zhiwei Wang</strong>.
        </h1>
        <p className="mt-6 text-lg text-gray-600 text-center max-w-2xl mx-auto dark:text-gray-400">
          Using the digital version, you can get dynamic visualizations, freewheeling <code
          className="font-mono font-medium text-sky-500 dark:text-sky-400">interactions</code>, and beautiful <code
          className="font-mono font-medium text-sky-500 dark:text-sky-400">interface</code> to let you know what I am
          good at.
          {/*.{" "}*/}
          {/*<code className="font-mono font-medium text-sky-500 dark:text-sky-400">regulation</code>,{" "}*/}
          {/*<code className="font-mono font-medium text-sky-500 dark:text-sky-400">between</code>,{" "}*/}
          {/*<code className="font-mono font-medium text-sky-500 dark:text-sky-400">*/}
          {/*  epigenome*/}
          {/*</code>{" "}*/}
          {/*and{" "}*/}
          {/*<code className="font-mono font-medium text-sky-500 dark:text-sky-400">epitranscriptome</code>{" "}*/}
          {/*that can be composed.*/}
        </p>

        <div className={"flex flex-col items-center mt-10"}>
          <div className={"flex"}>
            <Link href={"/paper/biostatistics"}>
              <button
                className={"mr-12 px-3.5 py-2.5 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-400"}>
                quick start
              </button>
            </Link>
            <Link href={"/paper/biostatistics"}>
              <button
                className={"px-3.5 py-2.5 text-gray-500 bg-white rounded-md shadow-md hover:bg-gray-50"}>
                documentation
              </button>
            </Link>
          </div>
        </div>

      </div>

      <Anim/>
    </header>

    <FansChart/>

    <GeneBand/>

    <GeneChart/>
  </div>
</>

export default Home
