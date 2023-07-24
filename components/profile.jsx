import React from "react";
import Link from "next/link";

function Profile( { session, handleSignOut }) {
  return (
    <>
      <div className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold">Authorize User Homepage</h3>

        <div className="details">
          <h5>{session.user.name}</h5>
          <h5>{session.user.email}</h5>
        </div>

        <div className="flex justify-center">
          <button onClick={handleSignOut} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50">
            Sign Out
          </button>
        </div>

        <div className="flex justify-center">
          <Link
            href={"/profile"}
            className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
          >
            Profile Page
          </Link>
        </div>
      </div>
    </>
  );
}

export default Profile;