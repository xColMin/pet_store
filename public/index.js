window.onload = function () {
  getPics();
};

async function getPics() {
  const response = await fetch("/pet_api");
  const data = await response.json();

  function getRandomArbitrary(max) {
    return Math.floor(Math.random() * max);
  }

  let n = getRandomArbitrary(data.length);

  const img1 = document.getElementById("first-slide");
  img1.class = "d-block w-100 center-block";
  img1.width = "221";
  img1.height = "228";
  img1.src = data[n].photoUrls[0].data;
  data.shift();

  const img2 = document.getElementById("second-slide");
  img2.class = "d-block w-100";
  img2.width = "221";
  img2.height = "228";
  img2.src = data[n].photoUrls[0].data;
  data.shift();

  const img3 = document.getElementById("third-slide");
  img3.class = "d-block w-100";
  img3.width = "221";
  img3.height = "228";
  img3.src = data[n].photoUrls[0].data;
}
