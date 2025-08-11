import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashDocuments() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/user/posts/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data); // backend returns posts array
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser._id) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handlePostDelete = async (postId) => {
    try {
      const res = await fetch(`/api/post/delete/${postId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserPosts((prev) => prev.filter((post) => post._id !== postId));
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(userPosts);

  return (
    <div className="max-w-lg mx-auto border p-8 rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold text-center">
        Details and Documents
      </h1>
      <h2 className="text-sm text-center text-gray-600 mb-6">
        (Here you can view, delete or update your documents.)
      </h2>

      {userPosts.length > 0 ? (
        <>
          {userPosts.map((post) => (
            <form key={post._id} className="mb-8">
              <div className="mb-5 flex items-center gap-4">
                <label className="w-1/3 font-bold text-base">Title:</label>
                <span className="text-base">{post.departmentName}</span>
              </div>

              <div className="mb-5 flex items-center gap-4">
                <label className="w-1/3 font-bold text-base">
                  Description:
                </label>
                <span className="text-base">{post.description}</span>
              </div>

              <div className="mb-5 flex items-center gap-4">
                <label className="w-1/3 font-bold text-base">Category:</label>
                <span className="text-base">{post.category}</span>
              </div>

              <div className="mb-5 flex items-center gap-4">
                <label className="w-1/3 font-bold text-base">Document:</label>
                <div className="w-2/3 p-2 rounded h-28 flex">
                  <a href={post && post.imageUrls} target="_blank">
                    <img
                      src={post.imageUrls}
                      alt="Post document"
                      className="w-52 h-28 object-contain bg-gray-200 rounded"
                    />
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3 mt-6">
                <Link to={`/update-post/${post._id}`}>
                  <button className="bg-purple-500 text-white py-2 px-5 rounded hover:bg-purple-600">
                    Update
                  </button>
                </Link>

                <Link to={`/post/${post._id}`}>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                    Visit Page
                  </button>
                </Link>

                <button
                  type="button"
                  className="bg-red-500 text-white py-2 px-5 rounded hover:bg-red-600"
                  onClick={() => handlePostDelete(post._id)}
                >
                  Delete
                </button>
              </div>
            </form>
          ))}
        </>
      ) : (
        <div className="flex items-center justify-center">
          <Link to="/create-post">
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent">
                + Upload Documents
              </span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
