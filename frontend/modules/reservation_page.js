import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let res=await fetch(config.backendEndpoint+"/reservations/");
  let data=await res.json();
  return data;
  }catch(err){
    console.log(err)
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 if(reservations.length>0){
  document.getElementById("reservation-table-parent").style.display="block";
  document.getElementById("no-reservation-banner").style.display="none";
  
  
 }
 else{
  document.getElementById("reservation-table-parent").style.display="none";
  document.getElementById("no-reservation-banner").style.display="block";
 }
 reservations.map(element=>{
  let tr=document.createElement("tr");
  tr.innerHTML+=`
      <th scope="row">${element.id}</th>
      <td>${element.name}</td>
      <td>${element.adventureName}</td>
      <td>${element.person}</td>
      <td>${new Date(element.date).toLocaleDateString("en-IN",{
      year:"numeric",
      day:"numeric",
      month:"numeric"})}</td>
      <td>${element.price}</td>
      <td>${new Date(element.time).toLocaleDateString("en-IN",{
        year:"numeric",
        day:"numeric",
        month:"long",
        hour:"numeric",
        minute:"numeric",
        second:"numeric",
        hour12:true}).replace(' at',',')}</td>
      <td><div class="reservation-visit-button" id=${element.id}>
      <a href="../detail/?adventure=${element.adventure}">Visit Adventure</a>
      </div>
      </td>
  </tr>`
  document.getElementById("reservation-table").appendChild(tr);
})



}

export { fetchReservations, addReservationToTable };
