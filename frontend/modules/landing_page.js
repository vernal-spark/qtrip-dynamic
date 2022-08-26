import config from "../conf/index.js";
async function init() {
  //Fetches list of all cities along with their images and description
  console.log("init()")
  console.log(config);
  let cities = await fetchCities();
  console.log(cities)
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const res=await fetch(config.backendEndpoint+'/cities');
    const data=await res.json();
    return data;
  }catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let ele=document.createElement("div");
  ele.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-4")
  ele.innerHTML+=`
  <a href="pages/adventures/?city=${id}"id="${id}">
    <div class="tile">
      <div class="tile-text text-center">
        <h4>${city}</h4>
        <h5>${description}</h5>
      </div>
      <img src="${image}" />
    </div>
  </a>`;
  document.getElementById("data").appendChild(ele);


}

export { init, fetchCities, addCityToDOM };
