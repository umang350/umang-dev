const youtube = async (req, res) => {

  const data = await callAPI();

  if (!data) {
    return res.status(500).json({ error: 'Failed to fetch YouTube stats' });
  }

  return res.status(200).json(data);
};


export const callAPI = async () => {

  var id = process.env.YOUTUBE_CHANNEL_ID;
  var key = process.env.GOOGLE_API_KEY;

  if (!id || !key) return null;

  var url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + id + "&key=" + key;

  const res = await fetch(url);
  const data = await res.json();
  return data?.items?.[0]?.statistics ?? null;
};

export default youtube;