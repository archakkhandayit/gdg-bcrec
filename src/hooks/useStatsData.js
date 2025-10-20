import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from '../firebase.js'
export const useStatsData = () => {
  const [data, setData] = useState({
    totalFullCompletions: 0,
    perLabStats: {},
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const docRef = doc(db, import.meta.env.VITE_DB_COLLECTION2, import.meta.env.VITE_DB_COLLECTION2_1);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const docData = docSnap.data();
          setData({
            totalFullCompletions: docData.totalFullCompletions || 0,
            perLabStats: docData.perLabStats || {},
            loading: false,
            error: null,
          });
        } else {
          setData((prev) => ({
            ...prev,
            loading: false,
            error: "No stats document found.",
          }));
        }
      } catch (err) {
        setData({
          totalFullCompletions: 0,
          perLabStats: {},
          loading: false,
          error: err.message,
        });
      }
    };

    fetchStats();
  }, []);

  return data;
};
