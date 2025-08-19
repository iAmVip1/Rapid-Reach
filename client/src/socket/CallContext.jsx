import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SocketContext from "./SocketContext";
import Peer from "simple-peer/simplepeer.min.js";
import { Howl, Howler } from "howler";

const CallContext = createContext(null);

export function CallProvider({ children }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const socket = SocketContext.getSocket();

  const hasJoined = useRef(false);
  const myVideoRef = useRef(null);
  const receiverVideoRef = useRef(null);
  const connectionRef = useRef(null);
  const streamRef = useRef(null);

  const [me, setMe] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState(null);
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const [shouldPlayOnUnlock, setShouldPlayOnUnlock] = useState(false);

  const ringtone = useRef(null);

  // Join once and wire socket listeners
  useEffect(() => {
    if (!socket) return;
    if (currentUser && !hasJoined.current) {
      socket.emit("join", { id: currentUser._id, name: currentUser.username });
      hasJoined.current = true;
    }

    const onMe = (id) => setMe(id);
    const onOnlineUsers = (users) => setOnlineUsers(users || []);
    const onCallToUser = (data) => {
      setReceivingCall(true);
      setCaller(data);
      setCallerSignal(data.signal);
      if (isAudioUnlocked) {
        ringtone.current.play();
      } else {
        setShouldPlayOnUnlock(true);
      }
    };
    const onCallEnded = () => {
      endCallCleanup();
      ringtone.current.stop();
    };
    const onCallRejected = () => {
      // just stop sound and cleanup if needed
      ringtone.current.stop();
    };

    socket.on("me", onMe);
    socket.on("online-users", onOnlineUsers);
    socket.on("callToUser", onCallToUser);
    socket.on("callEnded", onCallEnded);
    socket.on("callRejected", onCallRejected);

    return () => {
      socket.off("me", onMe);
      socket.off("online-users", onOnlineUsers);
      socket.off("callToUser", onCallToUser);
      socket.off("callEnded", onCallEnded);
      socket.off("callRejected", onCallRejected);
    };
  }, [socket, currentUser, isAudioUnlocked]);

  // Create ringtone only after user gesture
  const createRingtone = () => {
    if (!ringtone.current) {
      ringtone.current = new Howl({ 
        src: ["/audio-call.mp3"], 
        loop: false, 
        volume: 1.0,
        preload: false
      });
    }
  };

  // Attempt to unlock audio on first user gesture
  useEffect(() => {
    if (isAudioUnlocked) return;
    const handler = async () => {
      try {
        createRingtone();
        if (Howler.ctx && Howler.ctx.state !== "running") {
          await Howler.ctx.resume();
        }
        setIsAudioUnlocked(true);
        // Play a silent sound to unlock audio
        if (ringtone.current) {
          ringtone.current.volume(0);
          ringtone.current.play();
          ringtone.current.volume(1.0);
        }
      } catch (e) {
        console.log("Audio unlock failed:", e);
      } finally {
        window.removeEventListener("pointerdown", handler);
        window.removeEventListener("keydown", handler);
        window.removeEventListener("touchstart", handler);
      }
    };
    window.addEventListener("pointerdown", handler, { once: true });
    window.addEventListener("keydown", handler, { once: true });
    window.addEventListener("touchstart", handler, { once: true });
    return () => {
      window.removeEventListener("pointerdown", handler);
      window.removeEventListener("keydown", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, [isAudioUnlocked]);

  // If we were asked to play ringtone before unlock, play once unlocked
  useEffect(() => {
    if (isAudioUnlocked && shouldPlayOnUnlock && receivingCall && ringtone.current) {
      ringtone.current.play();
      setShouldPlayOnUnlock(false);
    }
  }, [isAudioUnlocked, shouldPlayOnUnlock, receivingCall]);

  const startCall = async (callToUserId) => {
    if (!socket || !currentUser) return;
    try {
      setSelectedUserId(callToUserId);
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = currentStream;
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = currentStream;
        myVideoRef.current.muted = true;
        myVideoRef.current.volume = 0;
      }
      currentStream.getAudioTracks().forEach((t) => (t.enabled = true));

      const peer = new Peer({ initiator: true, trickle: false, stream: currentStream });

      peer.on("signal", (data) => {
        const fromId = socket?.id || me;
        socket.emit("callToUser", {
          callToUserId,
          signalData: data,
          from: fromId,
          name: currentUser.username,
          email: currentUser.email,
          profilepic: currentUser?.profilePicture,
        });
      });

      peer.on("stream", (remoteStream) => {
        if (receiverVideoRef.current) {
          receiverVideoRef.current.srcObject = remoteStream;
          receiverVideoRef.current.muted = false;
          receiverVideoRef.current.volume = 1.0;
        }
      });

      socket.once("callAccepted", (data) => {
        setCallAccepted(true);
        setCaller(data.from);
        peer.signal(data.signal);
      });

      connectionRef.current = peer;
    } catch (err) {
      console.error("Error accessing media device:", err);
    }
  };

  const acceptCall = async () => {
    if (!socket) return;
    if (ringtone.current) {
      ringtone.current.stop();
    }
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = currentStream;
      if (myVideoRef.current) myVideoRef.current.srcObject = currentStream;
      currentStream.getAudioTracks().forEach((t) => (t.enabled = true));
      setCallAccepted(true);
      setReceivingCall(true);

      const peer = new Peer({ initiator: false, trickle: false, stream: currentStream });
      peer.on("signal", (data) => {
        const fromId = socket?.id || me;
        socket.emit("answeredCall", { signal: data, from: fromId, to: caller.from });
      });
      peer.on("stream", (remoteStream) => {
        if (receiverVideoRef.current) {
          receiverVideoRef.current.srcObject = remoteStream;
          receiverVideoRef.current.muted = false;
          receiverVideoRef.current.volume = 1.0;
        }
      });

      if (callerSignal) peer.signal(callerSignal);
      connectionRef.current = peer;
    } catch (err) {
      console.error("Error in sending media device:", err);
    }
  };

  const rejectCall = () => {
    if (!socket || !caller) return;
    if (ringtone.current) {
      ringtone.current.stop();
    }
    setReceivingCall(false);
    setCallAccepted(false);
    socket.emit("reject-call", { to: caller.from, name: currentUser?.username, profilepic: currentUser?.profilePicture });
  };

  const endCall = () => {
    if (ringtone.current) {
      ringtone.current.stop();
    }
    let toUserId = null;
    if (caller && caller.from) toUserId = caller.from;
    else if (selectedUserId) toUserId = selectedUserId;
    if (toUserId) socket?.emit("call-ended", { to: toUserId, name: currentUser?.username });
    endCallCleanup();
  };

  const endCallCleanup = () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (receiverVideoRef.current) receiverVideoRef.current.srcObject = null;
      if (myVideoRef.current) myVideoRef.current.srcObject = null;
      connectionRef.current?.destroy();
    } finally {
      if (ringtone.current) {
        ringtone.current.stop();
      }
      streamRef.current = null;
      setReceivingCall(false);
      setCallAccepted(false);
      setSelectedUserId(null);
    }
  };

  const unlockAudio = async () => {
    try {
      createRingtone();
      if (Howler.ctx && Howler.ctx.state !== "running") {
        await Howler.ctx.resume();
      }
      setIsAudioUnlocked(true);
      // Play a silent sound to unlock audio
      if (ringtone.current) {
        ringtone.current.volume(0);
        ringtone.current.play();
        ringtone.current.volume(1.0);
      }
    } catch (e) {
      console.log("Audio unlock failed:", e);
    }
  };

  const value = useMemo(
    () => ({
      me,
      onlineUsers,
      receivingCall,
      caller,
      callerSignal,
      callAccepted,
      myVideoRef,
      receiverVideoRef,
      startCall,
      acceptCall,
      rejectCall,
      endCall,
      isAudioUnlocked,
      unlockAudio,
    }),
    [me, onlineUsers, receivingCall, caller, callerSignal, callAccepted, isAudioUnlocked]
  );

  return <CallContext.Provider value={value}>{children}</CallContext.Provider>;
}

export function useCall() {
  return useContext(CallContext);
}


