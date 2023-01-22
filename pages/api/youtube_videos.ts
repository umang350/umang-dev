import { video } from "@/data/global";
import { NextApiRequest, NextApiResponse } from 'next'

const youtube = async (req: NextApiRequest, res: NextApiResponse) => {

  const data = await callAPI(req.query.pageToken as string ?? "");

  return res.status(200).json(data);
};


export const callAPI = async (pageToken: string) => {
  
  var key = process.env.GOOGLE_API_KEY;
	
  var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=UUGuJC8U8zMOpvKdYPsh1M2Q&maxResults=50&key=" + key+"&pageToken="+pageToken;

	try {
		const res = await fetch(url);
		const data = await res.json();
		return (await responseCreator(data));
	} catch (err) {
		console.log(err);
	}
};

const responseCreator = (data) => {

	let videos = data.items.map((item) => {
		return {
			title: item.snippet.title,
			description: item.snippet.description,
			thumbnail: item.snippet.thumbnails.high.url,
			videoId: item.contentDetails.videoId,
			publishedAt: item.snippet.publishedAt,
		} as video;
	})

	let resObject = {
		videoList: videos,
		nextPageToken: data.nextPageToken,
		prevPageToken: data.prevPageToken
	}

	return resObject;
}

export default youtube;