import { useEffect } from 'react';
import useSWR from 'swr';

import fetcher from 'lib/ga/fetcher';

export default function ViewCounter({ slug }) {
  const { data } = useSWR<{total: number}>(`/api/views/${slug}`, fetcher);
  const views = new Number(data?.total);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST'
      });

    registerView();
  }, [slug]);

  return <span>{`${views > 0 ? views.toLocaleString() : '–––'} views`}</span>;
}
