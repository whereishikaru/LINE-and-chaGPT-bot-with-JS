import { useState } from 'react'
import CreateNewPost from '../../components/posts/CreateNewPost';
import PostsSection from '../../components/posts/PostsSection'

const HomePage = () => {
    const [feedType, setFeedType] = useState('forYou');

    return (
        <div className='md:w-[600px]'>
              {/* Header */}
              <div className='sticky top-0 left-0 flex w-full h-16 items-center border-b border-gray-700 bg-black/60 backdrop-blur-md z-20'>
                  <div
                    className={`flex justify-center flex-1 p-5 hover:bg-secondary transition duration-300 cursor-pointer relative text-xl ${feedType === "forYou" ? 'font-black text-white' : 'font-semibold text-gray-700'}`}
                    onClick={() => setFeedType("forYou")}
                  >
                    For you
                    {feedType === "forYou" && (
                      <div className='absolute bottom-0 w-[60px] h-[4px] rounded-full bg-primary'></div>
                    )}
                  </div>
                  <div
                    className={`flex justify-center flex-1 p-5 hover:bg-secondary transition duration-300 cursor-pointer relative text-xl ${feedType === "following" ? 'font-black text-white' : 'font-semibold text-gray-700'}`}
                    onClick={() => setFeedType("following")}
                  >
                    Following
                    {feedType === "following" && (
                      <div className='absolute bottom-0 w-[82px]  h-[4px] rounded-full bg-primary'></div>
                    )}
                  </div>
              </div>

              {/* Create a post */}
              <CreateNewPost />

              {/* All Posts */}
              <PostsSection feedType={feedType} />
        </div>
    )
}

export default HomePage