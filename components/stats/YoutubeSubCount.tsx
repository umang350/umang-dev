function YoutubeSubCount({ytData}) {
  return (
      <div>
        <h1>Subscribers</h1>
        <h2>{ytData.items[0].statistics.subscriberCount}</h2>
      </div>
  );
}

export default YoutubeSubCount;
