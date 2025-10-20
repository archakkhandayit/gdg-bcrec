// src/hooks/useParticipants.js
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js"; 

export const useParticipants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const q = query(collection(db, import.meta.env.VITE_DB_COLLECTION1), orderBy("rank", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setParticipants(data);
        setLastUpdate(new Date().toLocaleString());
        setLoading(false);
        setIsLive(true);
        setError(false);
      },
      (err) => {
        setError(true);
        setLoading(false);
        setIsLive(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return {participants,setParticipants, loading, setLoading, error, setError, lastUpdate, isLive  };
};
