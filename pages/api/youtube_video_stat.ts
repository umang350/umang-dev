import { videoStat } from '@/data/global';
import { NextApiRequest, NextApiResponse } from 'next'

const youtube = async (req: NextApiRequest, res: NextApiResponse) => {

	const data = await callAPI(req.query.id as string);

	return res.status(200).json(data);
};


export const callAPI = async (id: string) => {

	// var id = "Otam61b875Y";
	var key = process.env.GOOGLE_API_KEY;

	var url1 = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=" + id + "&key=" + key;

	try {
		const res = await fetch(url1);
		const data = await res.json();
		return (await data.items.map((item) => {
			return {
				id: item.id,
				title: item.snippet.title,
				description: item.snippet.description,
				thumbnail: item.snippet.thumbnails.high.url,
				viewCount: item.statistics.viewCount,
				likeCount: item.statistics.likeCount,
				dislikeCount: item.statistics.dislikeCount,
				commentCount: item.statistics.commentCount,
			};
		}));
	} catch (err) {
		console.log(err);
	}
};

export default youtube;