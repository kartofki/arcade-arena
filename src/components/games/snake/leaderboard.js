import { addDoc, collection, getDocs, getFirestore, limit, orderBy, query, where } from "firebase/firestore";
import { app } from "../../../firebase/config";

// Function to add a score to the leaderboard
const AddUserInLeaderboard = async (username, game, score) => {
  const db = getFirestore(app);

  try {
    await addDoc(collection(db, "leaderboard"), {
      username: username,
      game: game,
      score: score,
      timestamp: new Date().getTime(), // Add timestamp for sorting
    });
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

// Function to get leaderboard data for a specific game
const GetLeaderboard = async (game) => {
  const db = getFirestore(app);
  const q = query(
    collection(db, "leaderboard"),
    where("game", "==", game),
    orderBy("score", "desc"), // Order by score to get top scores
    limit(10) // Limit to top 10 scores
  );

  const querySnapshot = await getDocs(q);

  let leaderboard = [];
  querySnapshot.forEach((doc) => {
    leaderboard.push(doc.data());
  });
  return leaderboard;
}

// Function to fetch the latest 3 scores across all games
const GetLatestScores = async () => {
  const games = ['Tetris', 'snake', 'FlappyBird']; // List of games to fetch scores for
  const db = getFirestore(app);

  let allScores = [];

  // Fetch scores for each game
  for (const game of games) {
    const q = query(
      collection(db, "leaderboard"),
      where("game", "==", game),
      orderBy("timestamp", "desc"),
      limit(3) // Get the latest 3 scores for each game
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allScores.push(doc.data());
    });
  }

  // Sort all scores by timestamp and get the latest 3 entries
  allScores.sort((a, b) => b.timestamp - a.timestamp);

  return allScores.slice(0, 3); // Return the 3 latest scores
}

// Function to get the highest score of a user for a specific game
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

export { AddUserInLeaderboard, GetLeaderboard, GetUserHighestScore, GetLatestScores };
