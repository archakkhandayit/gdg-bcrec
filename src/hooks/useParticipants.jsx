import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.js"; // adjust if your firebase config is in another folder

const useParticipants = () => {

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // 🟢 Firestore query ordered by rank (ascending)
    const q = query(collection(db, "board"), orderBy("rank", "asc"));

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
      },
      (err) => {
        console.error("Firestore error:", err);
        setError(err.message);
        setLoading(false);
        setIsLive(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { participants, loading, error, lastUpdate, isLive };
};

export default useParticipants;