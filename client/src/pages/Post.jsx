import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Post() {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const params = useParams()
  const { currentUser } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/post/get/${params.postId}`)
        const data = await res.json()
        if (data.success === false) {
          setError(true)
          setLoading(false)
          return
        }
        setPost(data)
        setLoading(false)
        setError(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchPost()
  }, [params.postId])

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">Error loading post</div>
  }

  console.log(post);
  

  return (
    <div className="flex items-center justify-center">
     voala
    </div>
  )
}
