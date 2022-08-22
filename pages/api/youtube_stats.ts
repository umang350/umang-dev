const youtube = async (req, res) => {

  const data = await callAPI();

  return res.status(200).json(data);
};


export const callAPI = async () => {
  
  var id = process.env.YOUTUBE_CHANNEL_ID;
  var key = process.env.GOOGLE_API_KEY;

  var url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + id + "&key=" + key;

	try {
		const res = await fetch(url);
		const data = await res.json();
		return (await data);
	} catch (err) {
		console.log(err);
	}
};

export default youtube;