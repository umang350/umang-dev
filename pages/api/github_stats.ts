import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'edge'
};

export default async function handler(req: NextRequest) {
  try {
    const [userResponse, userReposResponse] = await Promise.all([
      fetch('https://api.github.com/users/umang350'),
      fetch('https://api.github.com/users/umang350/repos?per_page=100')
    ]);

    const user = await userResponse.json();
    const repositories = await userReposResponse.json();

    const mine = repositories.filter((repo) => !repo.fork);
    const stars = mine.reduce((accumulator, repository) => {
      return accumulator + repository['stargazers_count'];
    }, 0);

    return new Response(
      JSON.stringify({ followers: user.followers, stars }),
      {
        status: 200,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600'
        }
      }
    );
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to fetch GitHub stats' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}