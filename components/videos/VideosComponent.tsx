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

  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<PacmanLoader color="#818CF8" />}
      className="absolute"
    >
      <div>
        <div className="flex flex-col items-start justify-center max-w-6xl mx-auto mb-16 mt-2">
          <p className="mb-5 text-dash-muted text-sm leading-relaxed">
            {informationData.description((data?.total + "+") ?? "infinite")}
          </p>

          {/* Search */}
          <div className="relative w-full mb-5">
            <input
              aria-label={informationData.searchPlaceholder}
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={informationData.searchPlaceholder}
              className="block w-full px-4 py-2.5 text-dash-text bg-dash-card border border-dash-border rounded-xl focus:ring-1 focus:ring-dash-acc focus:border-dash-acc text-sm placeholder-dash-muted transition-colors"
            />
            <svg
              className="absolute w-4 h-4 text-dash-muted right-3.5 top-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Search results */}
          <div className="flex flex-row flex-wrap w-full">
            {searchValue && (
              !error && filteredBlogPosts && filteredBlogPosts.map((post: video) => (
                <VideoCard key={post?.videoId} item={post} />
              ))
            )}
          </div>
          {!isLoading && filteredBlogPosts.length === 0 && (
            <p className="mb-4 text-dash-muted text-sm">{informationData.noDataFound}</p>
          )}
          <div className="justify-center relative ml-auto mr-auto">
            {searchValue && !isLoading && data && data.nextPageToken && (
              <button
                className="bg-gradient-to-r from-dash-acc to-dash-acc2 hover:opacity-90 text-white font-bold py-2.5 px-6 rounded-xl w-96 mt-2 text-sm transition-opacity"
                onClick={() => setPageToken(data?.nextPageToken ?? "")}
              >
                {informationData.loadMoreButton}
              </button>
            )}
          </div>

          {/* All videos */}
          <div className="flex flex-row w-full flex-wrap items-center mt-8 mb-5 gap-3">
            <h3 className="text-xl font-bold tracking-tight text-dash-text">
              {informationData.allTitle}
            </h3>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setPopularFlag(!popularFlag)}
                className={`text-xs font-semibold py-2 px-4 rounded-lg transition-colors ${
                  !popularFlag
                    ? 'bg-dash-acc text-white'
                    : 'bg-dash-card text-dash-muted border border-dash-border hover:border-dash-acc/30'
                }`}
              >
                {informationData.recentButton}
              </button>
              <button
                onClick={() => setPopularFlag(!popularFlag)}
                className={`text-xs font-semibold py-2 px-4 rounded-lg transition-colors ${
                  popularFlag
                    ? 'bg-dash-acc text-white'
                    : 'bg-dash-card text-dash-muted border border-dash-border hover:border-dash-acc/30'
                }`}
              >
                {informationData.popularButton}
              </button>
            </div>
          </div>

          {!isLoading && (error || !posts || posts.length === 0) && (
            <p className="mb-4 text-dash-muted text-sm">{informationData.noDataFound}</p>
          )}
          <div className="flex flex-row flex-wrap w-full">
            {!error && posts && posts.map((post: video) => (
              <VideoCard key={post?.videoId} item={post} />
            ))}
          </div>
          <div className="justify-center relative ml-auto mr-auto">
            {!isLoading && data && data.nextPageToken && (
              <button
                className="bg-gradient-to-r from-dash-acc to-dash-acc2 hover:opacity-90 text-white font-bold py-2.5 px-6 rounded-xl w-96 mt-2 text-sm transition-opacity"
                onClick={() => setPageToken(data?.nextPageToken ?? "")}
              >
                {informationData.loadMoreButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default VideosComponent;
