const dash = document.getElementById("circle-foreground");
const button = document.getElementById("like-circle");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const clearButton = document.getElementById("clear-storage");
const likeCounter = document.getElementById("like-counter");
const heart = document.getElementById("like-heart");
const ratings = document.getElementsByClassName("rating");
const currentArtistName = document.getElementById("current-artist");

const competitionFive = [
  "Andreas Lundstedt",
  "Ella Tiritiello",
  "Tennessee Tears",
  "KAJ",
  "AmenA",
  "Måns Zelmerlöw",
];

const TOTAL_LIKES = 5;
const ARTIST_COUNT = 6;

const createArtists = () => {
  return competitionFive.map((name) => ({ name, likes: 0 }));
};

const dashArray = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
let artists = localStorage.getItem("artists")
  ? JSON.parse(localStorage.getItem("artists"))
  : createArtists();
let currentArtist = artists[0];
let dashIndex = 1;

const updateDash = (index) => {
  dash.style.strokeDasharray = `${dashArray[index]} 100`;
  dashIndex = (index + 1) % dashArray.length;
};

const refreshHearts = () => {
  Array.from(ratings).forEach((rating, i) => {
    rating.classList.toggle("disabled", i >= currentArtist.likes);
  });
};

const updateCurrentArtist = (index) => {
  currentArtist = artists[index];
  currentArtistName.innerHTML = currentArtist.name;
  refreshHearts();
};

nextButton.addEventListener("click", () => {
  const currentIndex = (artists.indexOf(currentArtist) + 1) % artists.length;
  updateCurrentArtist(currentIndex);
});

prevButton.addEventListener("click", () => {
  const currentIndex =
    (artists.indexOf(currentArtist) - 1 + artists.length) % artists.length;
  updateCurrentArtist(currentIndex);
});

clearButton.addEventListener("click", () => {
  localStorage.clear();
  artists = createArtists();
  updateCurrentArtist(0);
});

button.addEventListener("click", () => {
  if (currentArtist.likes < TOTAL_LIKES) {
    heart.style.transform = "scale(1.2)";
    setTimeout(() => {
      heart.style.transform = "scale(1)";
    }, 250);
    updateDash(dashIndex);
    if (dashIndex === 0) {
      setTimeout(() => {
        dashIndex = 0;
        updateDash(dashIndex);
      }, 250);
      currentArtist.likes++;
      refreshHearts();
    }
    localStorage.setItem("artists", JSON.stringify(artists));
  }
});

currentArtistName.innerHTML = currentArtist.name;
refreshHearts();
