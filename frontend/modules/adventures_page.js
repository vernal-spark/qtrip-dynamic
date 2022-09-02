
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split("=")[1];

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const res=await fetch(config.backendEndpoint+`/adventures/?city=${city}`);
    const data=await res.json();
    console.log(data)
    return data;
  }catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(element => {
    let ele=document.createElement("div");
  ele.setAttribute("class","col-12 col-sm-6 col-lg-3 mb-4");
  // ele.innerHTML+=`
  // <a href="pages/adventures/?city=${element.id}"id="${element.id}">
  //   <div class="tile">
  //     <div class="tile-text text-center">
  //       <h4>${element.city}</h4>
  //       <h5>${element.description}</h5>
  //     </div>
  //     <img src="${element.image}" />
  //   </div>
  // </a>`;
  ele.innerHTML+=`
  <a href="detail/?adventure=${element.id}"id="${element.id}">
              <div class="card activity-card" style="position:relative;margin-right:5px">
              <div class="category-banner">${element.category}</div>
                <img
                  class="card-img-top"
                  src="${element.image}"
                />

                <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title">${element.name}</h5>
                  <h6 class="card-text">${element.costPerHead}${element.currency}</h6>
                </div> 
                <div class="d-flex justify-content-between">
                  <h5 class="card-title">Duration</h5>
                  <h6 class="card-text">${element.duration}Hours</h6>
                </div>  
                </div>
                
              </div>
            </a>`;
  document.getElementById("data").appendChild(ele);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let x=list.filter(element=>element.duration>=low && element.duration<=high);
  console.log(x)
  return x;
}
//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
   
   let l=list.filter(element=>categoryList.includes(element.category));
   return l;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filterDuration = filters.duration;
  const filterDurationArr = filterDuration.split("-");
   

   
  let low = filterDurationArr[0]; 
  let high = filterDurationArr[1];
  console.log(low);
  console.log(high)
  if(filters.duration == "" && filters.category.length==0 ){
    return list;
  }
  else if(filters.duration == "" && filters.category.length>0){
    return filterByCategory(list, filters.category);
  }
  else if(filters.duration !== "" && filters.category.length==0){
    return filterByDuration(list,low,high)
  }
  else{
    let x=filterByCategory(list,filters.category)
    return filterByDuration(x,low,high)
  }
  
   
  
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let l=localStorage.getItem("filters");
  let filters=JSON.parse(l);

  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const catergorylist = document.getElementById('category-list');
 
  const catergoryArr = filters.category;
  
  catergoryArr.forEach((item)=> {
     const newdiv = document.createElement('div');
     newdiv.setAttribute('class','category-filter')
     newdiv.innerText = item;
     catergorylist.appendChild(newdiv)
    
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
