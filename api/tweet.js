export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const bearerToken = process.env.TWITTER_BEARER_TOKEN;

  try {
    const userResponse = await fetch(
      "https://api.twitter.com/2/users/by/username/DenzaiGroup",
      { headers: { Authorization: `Bearer ${bearerToken}` } }
    );
    const userData = await userResponse.json();
    const userId = userData.data.id;

    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at`,
      { headers: { Authorization: `Bearer ${bearerToken}` } }
    );
    const tweets = await tweetsResponse.json();

    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
