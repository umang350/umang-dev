/* eslint-disable react-hooks/exhaustive-deps */
import { video } from "@/data/global";
import fetcher from "@/lib/ga/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import VideoCard from "./VideoDisplay";
import LoadingOverlay from 'react-loading-overlay'
import { PacmanLoader } from "react-spinners";
LoadingOverlay.propTypes = undefined

type resObject = {
  videoList: video[];
  nextPageToken: string;
  prevPageToken: string;
  total: string;
}


export const BlogComponent = () => {

  const [pageToken, setPageToken] = useState(null);

  const [posts, setPosts] = useState<video[]>([]);

  const { data, error, isLoading } = useSWR<resObject>('/api/youtube_videos?pageToken=' + pageToken, fetcher);

  useEffect(() => {
    if (data?.videoList) {
      setPosts(Array.from(new Set(posts.concat(data?.videoList ?? []))));
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

  return (<LoadingOverlay
    active={isLoading}
    spinner={<PacmanLoader color="#36d7b7" />}
    className="absolute">
    <div>
      <div className="flex flex-col items-start justify-center max-w-6xl mx-auto mb-16 mt-10">
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {`I'm really not into writing blogs but I talk mostly about software development and tech careers.
            In total, I've created more than ${data?.total + "+" ?? "infinite"} videos on my channel. But I have a quite useful youtube channel
            Use the search below to filter by title some of the things i created.`}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search videos"
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
            No posts found.
          </p>
        )}
        <div className="justify-center relative ml-auto mr-auto">
          {searchValue && !isLoading && data && data.nextPageToken && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-96" onClick={() => setPageToken(data?.nextPageToken ?? "")}>Load More</button>}
        </div>

        <div className="flex flex-row">
          <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            All Posts
          </h3>
        </div>
        {!isLoading && (error || !posts || posts.length === 0) && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No posts found.
          </p>
        )}
        <div className="flex flex-row flex-wrap w-full">
          {!error && posts && posts.map((post: video) => (
            <VideoCard key={post?.videoId} item={post} />
          ))}
        </div>
        <div className="justify-center relative ml-auto mr-auto">
          {!isLoading && data && data.nextPageToken && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-96" onClick={() => setPageToken(data?.nextPageToken ?? "")}>Load More</button>}
        </div>
      </div>
    </div></LoadingOverlay>)
}

export default BlogComponent;

