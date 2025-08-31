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
          setUserPosts(data);
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Details & Documents
      </h1>
      <p className="text-sm text-center text-gray-600 mb-8">
        Manage your documents easily. View, update, or delete them anytime.
      </p>

      {userPosts.length > 0 ? (
       <div className="flex justify-center items-center w-full">
  <div className="w-full max-w-2xl space-y-6">
    {userPosts.map((post) => (
      <div
        key={post._id}
        className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition duration-300"
      >
        {/* Document Preview */}
        <a href={post.imageUrls} target="_blank" rel="noreferrer">
          <img
            src={post.imageUrls}
            alt="Post document"
            className="w-full h-40 object-cover rounded-lg mb-4 bg-gray-100"
          />
        </a>

        {/* Info */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {post.departmentName}
          </h2>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Address: </span>
            {post.address}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Contact: </span>
            {post.phoneNumber1}, {post.phoneNumber2}
          </p>
          <p className="text-sm text-gray-600 truncate">
            <span className="font-medium">Website: </span>
            <a
              href={post.website}
              target="_blank"
              className="text-blue-600 underline"
            >
              {post.website}
            </a>
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Category: </span>
            {post.category}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Reg. No: </span>
            {post.registrationNo}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email: </span>
            {post.userMail}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-5">
          <Link to={`/update-post/${post._id}`}>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
              Update
            </button>
          </Link>

          <Link to={`/post/${post._id}`}>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm">
              Visit
            </button>
          </Link>

          <button
            type="button"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
            onClick={() => handlePostDelete(post._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      ) : (
        <div className="flex justify-center">
          <Link to="/create-post">
            <button className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 shadow hover:from-purple-600 hover:to-blue-600 transition">
              + Upload Documents
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
