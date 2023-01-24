import { video } from "@/data/global";
import fetcher from "@/lib/ga/fetcher";
import { type } from "os";
import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import VideoCard from "./VideoDisplay";

type resObject = {
  videoList: video[];
  nextPageToken: string;
  prevPageToken: string;
}

export const BlogComponent = () => {

    const { data } = useSWR<resObject>('/api/youtube_videos', fetcher);
    console.log(data)
    const posts: video[] = data?.videoList;

    const [searchValue, setSearchValue] = useState("");
    const [filteredBlogPosts, setFilteredBlogPosts] = useState([])

    const updateFilteredList = () => {
      if(posts && searchValue!==""){
        setFilteredBlogPosts(posts.filter(item => item.title===searchValue) ?? [])
      }else {
        setFilteredBlogPosts(posts ?? [])
      }
    }
    useEffect(updateFilteredList, [posts, searchValue])

    return (<div>
        <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16 mt-10">
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {`I'm really not into writing blogs but I talk mostly about software development and tech careers.
            In total, I've created more than ${posts?.length} videos on my channel. But I have a quite useful youtube channel
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
        {!searchValue && (
          posts && posts.map((post: video) => (
            <VideoCard key={post.videoId} item={post} />
          ))
        )}
        <Suspense fallback={null}>
          <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
            All Posts
          </h3>
          {!filteredBlogPosts.length && (
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              No posts found.
            </p>
          )}
          {filteredBlogPosts.map((post: video) => (
            <VideoCard key={post.videoId} item={post} />
          ))}
        </Suspense>
      </div>
    </div>)
}

export default BlogComponent;

