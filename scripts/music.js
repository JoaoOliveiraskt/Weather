const clientId = "f7fad129f8d6487aad9390c375618ce2";
const clientSecret = "b2bda95b7e714130b0e9f3edfe7bced7";

const getTokenAuth = async () => {
  const credentials = `${clientId}:${clientSecret}`;
  const encodedCredentials = btoa(credentials);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
};

const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate();
    return `${year}-${month}-${day}}`
}

const searchTopAlbuns = async (country) => {
  const accessToken = await getTokenAuth();
  const currentDate = getCurrentDate();

  try {
    const url = `https://api.spotify.com/v1/browse/featured-playlists?locale=${country}&limit=3`;

    const response = await fetch(`${url}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      const result = data.playlists.items.map((item) => ({
        name: item.name,
        image: item.images[0].url,
      }));
      
      console.log(result);
      showPlaylist(result);
    } else {
      throw new Error;
    }
  } catch {
    console.log("The search music failed! Try again!");
  }
};

const ulElement = document.querySelector(".playlist-box");
const liElement = document.querySelectorAll("li");

const showPlaylist = (data) => {
  liElement.forEach((liElement, index) => {
    const imgElement = liElement.querySelector("img");
    const pElement = liElement.querySelector(".song-name");
    const h2Element = liElement.querySelector(".music-coutnry-name");

    imgElement.src = data[index].image;
    imgElement.style.display = "block"; 
    pElement.textContent = data[index].name;
    
  })
}
