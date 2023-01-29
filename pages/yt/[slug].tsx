import Page from '@/components/utility/Page';
import { video, videoStat } from '@/data/global';
import fetcher from '@/lib/ga/fetcher';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts'
import { PacmanLoader } from "react-spinners";
import useSWR from "swr";

export default function YoutubeLink() {

  const router = useRouter()
  const videoId = router.query.slug as string

  const { data, error, isLoading } = useSWR<any>('/api/youtube_video_stat?id=' + videoId, fetcher);

  return (
    <Page currentPage={'Youtube ' + videoId} meta={{
      title: videoId,
      desc: videoId
    }}>
      <LoadingOverlay
        active={isLoading}
        spinner={<PacmanLoader color="#36d7b7" />}
        className="absolute"><div
        className="heroElem w-full pt-20 m-auto flex justify-center text-center flex-col items-center z-50 sticky dark:text-white text-black">
        {
          error && <div>Failed to load</div>
        }
        {
          data &&
          <div>
          <h1 className="text-xl font-bold">{data[0].title}</h1>
          <p className="text-sm mb-4 mt-4">{data[0].description}</p>
          <p className="text-xl">Views: {Number(data[0].viewCount).toLocaleString()}</p>
          <p className="text-xl mb-8">Likes: {Number(data[0].likeCount).toLocaleString()}</p>
          </div>
        }
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allowFullScreen
        />
      </div>
    </LoadingOverlay>
    </Page>
  );
}
