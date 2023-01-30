/* eslint-disable react-hooks/exhaustive-deps */
import { video, videoStat } from "@/data/global";
import fetcher from "@/lib/ga/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import VideoCard from "./VideoDisplay";
import LoadingOverlay from 'react-loading-overlay-ts'
import { PacmanLoader } from "react-spinners";
import { pageInfo, pageInfoJA } from "@/data/content/videos";
import { useRouter } from "next/router";
LoadingOverlay.propTypes = undefined

type resObject = {
  videoList: video[];
  nextPageToken: string;
  prevPageToken: string;
  total: string;
}

export const VideosComponent = () => {

  const { locale } = useRouter();

  var informationData = locale === "ja" ? pageInfoJA : pageInfo;

  const [pageToken, setPageToken] = useState(null);

  const [popularFlag, setPopularFlag] = useState(false);

  const [posts, setPosts] = useState<video[]>([]);

  const { data, error, isLoading } = useSWR<resObject>('/api/youtube_videos?pageToken=' + pageToken, fetcher);

  useEffect(() => {
    if (data?.videoList) {
      setPosts(Array.from(new Set(posts.concat(data?.videoList.filter(v => (Number(v.statistics.viewCount) > 0)) ?? []))));
    }
  }, [data?.videoList])

  const [searchValue, setSearchValue] = useState("");
  const [filteredBlogPosts, setFilteredBlogPosts] = useState([])

  const updateFilteredList = () => {
    if (posts && searchValue !== "") {
      const match = new RegExp(`${searchValue}`, 'gi');
      setFilteredBlogPosts(posts.filter(item => match.test(item.title)) ?? [])
    } else {
      setFilteredBlogPosts(posts ?? [])
    }
  }
  useEffect(updateFilteredList, [posts, searchValue])

  const popularChanger = () => {
    if (popularFlag) {
      setPosts(Array.from(new Set([...posts.sort((a, b) => (Number(a.statistics.viewCount) > Number(b.statistics.viewCount)) ? -1 : 1)])))
    } else {
      setPosts(Array.from(new Set([...posts.sort((a, b) => (a.publishedAt > b.publishedAt) ? -1 : 1)])))
    }
  }
  useEffect(popularChanger, [popularFlag])

  return (<LoadingOverlay
    active={isLoading}
    spinner={<PacmanLoader color="#36d7b7" />}
    className="absolute">
    <div>
      <div className="flex flex-col items-start justify-center max-w-6xl mx-auto mb-16 mt-10">
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {
            informationData.description((data?.total + "+") ?? "infinite")
          }
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label={informationData.searchPlaceholder}
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={informationData.searchPlaceholder}
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex flex-row flex-wrap w-full">
          {searchValue && (
            !error && filteredBlogPosts && filteredBlogPosts.map((post: video) => (
              <VideoCard key={post?.videoId} item={post} />
            ))
          )
          }
        </div>
        {!isLoading && filteredBlogPosts.length === 0 && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {informationData.noDataFound}
          </p>
        )}
        <div className="justify-center relative ml-auto mr-auto">
          {searchValue && !isLoading && data && data.nextPageToken && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-96 mt-2" onClick={() => setPageToken(data?.nextPageToken ?? "")}>{informationData.loadMoreButton}</button>}
        </div>

        <div className="flex flex-row w-full ">
          <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            {informationData.allTitle}
          </h3>
          <button onClick={() => setPopularFlag(!popularFlag)} className={` ${!popularFlag ? 'bg-blue-600 text-white' : 'bg-white text-black'}  hover:bg-blue-400 font-bold py-2 px-4 rounded w-54 h-10 mt-auto mb-2 ml-auto`}>
            {informationData.recentButton}
          </button>
          <button onClick={() => setPopularFlag(!popularFlag)} className={` ${popularFlag ? 'bg-blue-600 text-white' : 'bg-white text-black'}  hover:bg-blue-400 font-bold py-2 px-4 rounded w-28 h-10 mt-auto mb-2 ml-1 mr-4`}>
            {informationData.popularButton}
          </button>
        </div>
        {!isLoading && (error || !posts || posts.length === 0) && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {informationData.noDataFound}
          </p>
        )}
        <div className="flex flex-row flex-wrap w-full">
          {!error && posts && posts.map((post: video) => (
            <VideoCard key={post?.videoId} item={post} />
          ))}
        </div>
        <div className="justify-center relative ml-auto mr-auto">
          {!isLoading && data && data.nextPageToken && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-96 mt-2" onClick={() => setPageToken(data?.nextPageToken ?? "")}>{informationData.loadMoreButton}</button>}
        </div>
      </div>
    </div></LoadingOverlay>)
}

export default VideosComponent;

