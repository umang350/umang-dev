import { google } from 'googleapis';

const youtube = async (_, res) => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY
    },
    scopes: ['https://www.googleapis.com/auth/youtube.readonly']
  });

  const youtube = google.youtube({
    auth,
    version: 'v3'
  });

  const response = await youtube.channels.list({id: ['UCGuJC8U8zMOpvKdYPsh1M2Q']},{})

  const channel = response.data.items[0];
  const { subscriberCount, viewCount } = channel.statistics;

  return res.status(200).json({
    subscriberCount,
    viewCount
  });
};

export default youtube;