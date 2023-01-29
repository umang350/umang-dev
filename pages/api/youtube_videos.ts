import { video } from "@/data/global";
import { NextApiRequest, NextApiResponse } from 'next'

const youtube = async (req: NextApiRequest, res: NextApiResponse) => {

	const data = await callAPI(req.query.pageToken as string ?? "");

	return res.status(200).json(data);
};


export const callAPI = async (pageToken: string) => {

	const key = process.env.GOOGLE_API_KEY;

	const pageTokenValid = pageToken != null && pageToken != "undefined" && pageToken != "null";

	var url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=UUGuJC8U8zMOpvKdYPsh1M2Q&maxResults=50&key=" + key + (pageTokenValid ? "&pageToken=" + pageToken : "");


	try {
		const res = await fetch(url);
		const data = await res.json();
		const idKeys = await data.items.map((item) => item.contentDetails.videoId).join("&id=");
		var urlStats = "https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=" + idKeys + "&key=" + key;
		const resStats = await fetch(urlStats);
		const dataStats = await resStats.json();
		return responseCreator(data, dataStats);
	} catch (err) {
		console.log(err);
	}
};

const responseCreator = (data, dataStats) => {

	let videos = data.items.map((item) => {
		const statItem = dataStats.items.find((stat) => stat.id == item.contentDetails.videoId);
		return {
			title: item.snippet.title,
			description: item.snippet.description,
			thumbnail: item.snippet.thumbnails.high.url,
			videoId: item.contentDetails.videoId,
			publishedAt: item.snippet.publishedAt,
			statistics: {
				viewCount: statItem.statistics.viewCount,
				likeCount: statItem.statistics.likeCount,
				dislikeCount: statItem.statistics.dislikeCount,
				commentCount: statItem.statistics.commentCount,
			}
		} as video;
	})
	

	let resObject = {
		videoList: videos,
		nextPageToken: data.nextPageToken,
		prevPageToken: data.prevPageToken,
		total: data.pageInfo.totalResults
	}

	return resObject;
}

export default youtube;