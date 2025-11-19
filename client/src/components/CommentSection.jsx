import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaExclamationTriangle } from "react-icons/fa";

export default function CommentSection({postId}) {
     const {currentUser} = useSelector(state => state.user);
     const [comment, setComment] = useState('');
     const handleSubmit = async (e) => {

     };
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        { currentUser ? (
            <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
                <p>Signed in as:</p>
                <img src={currentUser.profilePicture} alt="" 
                className='h-5 w-5 object-cover rounded-full' />
                <Link to ={'/dashboard?tab=profile'}
                className='text-xs text-cyan-600 hover:underline'>
                    @{currentUser.username}
                </Link>
            </div>
        ):
        (
             <div className="text-sm text-teal-500 my-5 flex gap-1">
                You should be logged in to comment. 
                <Link className='text-blue-500 hover:underline' to={'/signin'}>
                 Sign-in
                </Link>
            </div>
        )}
         {currentUser && (
            <form  className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
                <textarea placeholder="Write a comment"
            className="block w-full mt-1 border border-gray-300 rounded-md p-2 h-30"
             rows='3' maxLength='200'
             onChange={(e) => setComment(e.target.value)}
             value={comment}
            />

            <div className="flex justify-between items-center mt-5">
                    <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                    <button className='bg-gradient-to-r from-emerald-500 to-emerald-900 px-4 py-2.5 text-center leading-5 text-white rounded-lg cursor-pointer' 
                    type='submit' >
                        Submit
                    </button>
                </div>
            </form>
         )}
    </div>
  )
}
