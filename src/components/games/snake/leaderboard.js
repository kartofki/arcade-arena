import { addDoc, collection, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore";
import { app } from "../../../firebase/config"; // Ensure this is the correct path to your firebase config

const AddUserInLeaderboard = async (username, game, score) => {
  const db = getFirestore(app);

  try {
    await addDoc(collection(db, "leaderboard"), {
      username: username,
      game: game,
      score: score
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

const GetLeaderboard = async (game) => {
  const db = getFirestore(app);
  const q = query(
    collection(db, "leaderboard"),
    where("game", "==", game),
    orderBy("score", "desc"),
    limit(10)
  );

  const querySnapshot = await getDocs(q);

  let leaderboard = [];
  querySnapshot.forEach((doc) => {
    leaderboard.push(doc.data());
  });
  return leaderboard;
}

const GetUserHighestScore = async (username, game) => {
  const db = getFirestore(app);
  const q = query(
    collection(db, "leaderboard"),
    where("username", "==", username),
    where("game", "==", game),
    orderBy("score", "desc"),
    limit(1)
  );

  const querySnapshot = await getDocs(q);

  let highestScore = 0;
  querySnapshot.forEach((doc) => {
    highestScore = doc.data().score;
  });
  return highestScore;
}

export { AddUserInLeaderboard, GetLeaderboard, GetUserHighestScore };
