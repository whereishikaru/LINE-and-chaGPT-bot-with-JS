import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import PostGenerator from './post/PostGenerator'
import PostSkeleton from '../skeletons/PostSkeleton'


const PostsSection = ({ feedType }) => {
    const username = 'hikaru';
    const userId = '1234asdf';
    
    const getPostEndpoint = () => {
        switch (feedType) {
            case 'for You':
                return '/api/posts/all';
            case 'following':
                return '/api/posts/following';
            case 'posts':
                return `/api/posts/user/${username}`;
            case 'likes':
                return `api/posts/likes/${userId}`;
            default:
                return '/api/posts/all';
        }
    };
    const POST_ENDPOINT = getPostEndpoint();

    const { data: posts, isLoading, refetch, isRefetching } = useQuery({
        queryKey: ['posts'],
        queryFc: async () => {
            try {
                const res = await fetch(POST_ENDPOINT);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Oops! Something went wrong');
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    });

    useEffect(() => {
		refetch();
	}, [feedType, refetch, username]);

    return (
        <> 
            {(isLoading || isRefetching) && (
                <div>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            )}
            {!isLoading && !isRefetching && posts?.length === 0 && (
                <p>No posts in this tab.</p>
            )}
            {!isLoading && !isRefetching && posts && (
                <div>
                    {posts.map((post) => (

                        <PostGenerator key={post._id} post={post} />
                    ))}
                </div>
            )}

        </>
    )
}

export default PostsSection