import React from "react";
import { useCall } from "../socket/CallContext";
import { FaBars, FaMicrophone, FaMicrophoneSlash, FaPhoneSlash, FaVideo, FaVideoSlash } from "react-icons/fa";

export default function CallOverlay() {
  const {
    receivingCall,
    caller,
    callAccepted,
    myVideoRef,
    receiverVideoRef,
    acceptCall,
    rejectCall,
    endCall,
    isAudioUnlocked,
    unlockAudio,
  } = useCall() || {};

  if (!receivingCall && !callAccepted) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <video ref={receiverVideoRef} autoPlay className="absolute top-0 left-0 w-full h-full object-contain" />
      <div className="absolute bottom-[75px] right-1 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <video ref={myVideoRef} autoPlay playsInline className="w-32 h-40 md:w-56 md:h-52 object-cover" />
      </div>

      {!callAccepted ? (
        <div className="relative z-10 bg-white rounded-xl p-6 shadow-xl text-center">
          <div className="text-lg font-semibold mb-2">Incoming call</div>
          <div className="text-gray-700 mb-4">{caller?.name || "Unknown"}</div>
          <div className="flex gap-4 justify-center">
            <button onClick={acceptCall} className="px-4 py-2 rounded bg-green-600 text-white">Accept</button>
            <button onClick={rejectCall} className="px-4 py-2 rounded bg-red-600 text-white">Reject</button>
          </div>
          {!isAudioUnlocked && (
            <button onClick={unlockAudio} className="mt-3 px-3 py-1 rounded bg-blue-600 text-white text-sm">
              Enable sound
            </button>
          )}
        </div>
      ) : (
        <div className="absolute bottom-6 inset-x-0 flex justify-center gap-4 z-10">
          <button onClick={endCall} className="px-4 py-2 rounded-full bg-red-600 text-white flex items-center gap-2">
            <FaPhoneSlash /> End Call
          </button>
        </div>
      )}
    </div>
  );
}


