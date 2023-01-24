import { Post } from '@/data/global';
import Page404 from 'pages/404';

export default function PostPage({ post }: { post: Post }) {

  return (
    <><Page404/></>
    // <BlogLayout post={post}>
      
    // </BlogLayout>
  );
}

// export async function getStaticPaths() {
  
// }

// export async function getStaticProps({ params, preview = false }) {

// }
