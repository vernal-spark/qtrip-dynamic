import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlsearch=new URLSearchParams(search);
  const adventure=urlsearch.get("adventure")
  console.log(adventure);
  return adventure;

  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
    try{
      const res=await fetch(config.backendEndpoint+`/adventures/detail/?adventure=${adventureId}`);
      const data=await res.json();
      console.log(data)
      return data;
    }catch(err){
      return null;
    }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let name=document.getElementById("adventure-name");
  name.innerHTML=adventure.name;
  document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle;
  adventure.images.forEach(element => {
    document.getElementById("photo-gallery").innerHTML+=`
   <img src="${element}" class="activity-card-image"></img>`
  });
  document.getElementById("adventure-content").innerHTML=adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let x=`<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="car">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;
document.getElementById("photo-gallery").innerHTML=x;
images.forEach((element,index)=>{
  if(index==0){
    document.getElementById("car").innerHTML+=`<div class="carousel-item active">
    <img src="${element}" class="d-block w-100 activity-card-image" alt="...">
  </div>`
  }
  else{
    document.getElementById("car").innerHTML+=`<div class="carousel-item ">
    <img src="${element}" class="d-block w-100 activity-card-image" alt="...">
  </div>`
  }
})

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display='block';
    document.getElementById("reservation-panel-available").style.display='none';
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML=adventure.costPerHead*persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  
  const myform=document.getElementById("myForm")
  myform.addEventListener("submit",async(e)=>{
    e.preventDefault();
    let data=JSON.stringify({
      name:myform.elements["name"].value,
      date:myform.elements["date"].value,
      person:myform.elements["person"].value,
      adventure:adventure.id
    })


        try{
          let res=await fetch(config.backendEndpoint+"/reservations/new",{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: data,
          });
          if(res.ok){
            alert("Success!")
            window.location.reload();
          }
          else{
            let x=res.json();
            alert("Failed"+x.message);
          }
        }catch(err){
          console.log(err)
          alert("Failed to make a call")
        }
      })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display="block"
  }
  else{
    document.getElementById("reserved-banner").style.display="none"
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
