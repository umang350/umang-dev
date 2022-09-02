import BlogLayout from '@/components/blog/BlogLayout';
import { Post } from '@/data/global';

export default function PostPage({ post }: { post: Post }) {

  return (
    <BlogLayout post={post}>
      
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  
}

export async function getStaticProps({ params, preview = false }) {

}
