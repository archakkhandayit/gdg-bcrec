import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Custom Hook
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
        const docRef = doc(db, "stats", "overview");
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
