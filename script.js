const lat=document.getElementById("lat")
const long=document.getElementById("long")
const searchInput=document.getElementById("search")
const btn=document.getElementById("btn")
const searchresult=document.getElementById("searchresult")
const currenttime=document.getElementById("currenttime")


//to get cuurent location
function getLocation(){
    console.log("get location callled")
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(current);
  }else{
    console.log("something is wrong")
  }
}

  function current(position){
    console.log("current location callled")

    var requestOptions = {
      method: 'GET',
    }

    const lati=position.coords.latitude;
    const longi=position.coords.longitude;
    
    fetch("https://api.geoapify.com/v1/geocode/reverse?lat="+lati+"&lon="+longi+"&apiKey=d47cdee39b484455a24cb97683b22198", requestOptions)
      .then(response => response.json())
      .then(function (result){
        // console.log("66")
    //   let divv=document.createElement('div');
      currenttime.innerHTML=`
    
      <ol>
                <li>
                    <div>
                        <label>Name of time Zone :</label> <span id="t-zone">${result.features[0].properties.timezone.name}</span>
                    </div>   
                </li>
                <li>
                    <div id="co-ordinate">
                        <div> 
                            <label>Lat : </label><span id="lat">${result.features[0].geometry.coordinates[0]  }</span>
                         </div>
                        <div>
                            <label>Long :</label><span id="long">${ result.features[0].geometry.coordinates[1] }</span>
                        </div>
                    </div>
                   
                </li>
                
                <li>
                    <div>
                        <label>Offset STD :</label> <span id="std">${ result.features[0].properties.timezone.offset_STD }</span>
                    </div>
                </li>
                <li>
                    <div>
                        <label>Offset STd Secounds :</label>  <span id="stds">${  result.features[0].properties.timezone.offset_STD_seconds}</span>
                   </div>
                  
                </li>
                <li>
                    <div>
                        <label>Offset DST :</label>  <span id="dst">${result.features[0].properties.timezone.offset_DST  }</span>
                   </div>
                </li>
                <li>
                    <div>
                        <label>Offset DST secounds :</label>  <span id="dsts">${ result.features[0].properties.timezone.offset_DST_seconds }</span>
                   </div>
                </li>
                <li>
                    <div>
                        <label>Country :</label>  <span id="country">${ result.features[0].properties.country }</span>
                   </div>
                </li>
                <li>
                    <div>
                        <label>Postcode :</label>  <span id="postcode">${ result.features[0].properties.postcode }</span>
                   </div>
                </li>
                <li>
                    <div>
                        <label>City :</label>  <span id="city">${ result.features[0].properties.city }</span>
                   </div>
         </ol>
    `
    // currenttime.appendChild(divv);
       
        
      })
      .catch(error => console.log('error', error));
  }
 

getLocation()

function searchdeatils(name){
  var requestOptions = {
    method: 'GET',
  };
  
  
    fetch("https://api.geoapify.com/v1/geocode/search?text="+name+"&apiKey=8679c232f00e40fda27b06ba0615f9ee", requestOptions)
    .then(response => response.json())
    .then(function (result){
       // console.log(result)
      // console.log( "Name of Time Zone :"+result.features[0].properties.timezone.name)

      let div=document.createElement('div');
      div.innerHTML=`
          <ol>
                    <li>
                        <div>
                            <label>Name of time Zone :</label> <span id="t-zone">${result.features[0].properties.timezone.name}</span>
                        </div>   
                    </li>
                    <li>
                        <div id="co-ordinate">
                            <div> 
                                <label>Lat : </label><span id="lat">${result.features[0].geometry.coordinates[0]  }</span>
                             </div>
                            <div>
                                <label>Long :</label><span id="long">${ result.features[0].geometry.coordinates[1] }</span>
                            </div>
                        </div>
                       
                    </li>
                    
                    <li>
                        <div>
                            <label>Offset STD :</label> <span id="std">${ result.features[0].properties.timezone.offset_STD }</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <label>Offset STd Secounds :</label>  <span id="stds">${  result.features[0].properties.timezone.offset_STD_seconds}</span>
                       </div>
                      
                    </li>
                    <li>
                        <div>
                            <label>Offset DST :</label>  <span id="dst">${result.features[0].properties.timezone.offset_DST  }</span>
                       </div>
                    </li>
                    <li>
                        <div>
                            <label>Offset DST secounds :</label>  <span id="dsts">${ result.features[0].properties.timezone.offset_DST_seconds }</span>
                       </div>
                    </li>
                    <li>
                        <div>
                            <label>Country :</label>  <span id="country">${ result.features[0].properties.country }</span>
                       </div>
                    </li>
                    <li>
                        <div>
                            <label>Postcode :</label>  <span id="postcode">${ result.features[0].properties.postcode }</span>
                       </div>
                    </li>
                    <li>
                        <div>
                            <label>City :</label>  <span id="city">${ result.features[0].properties.city }</span>
                       </div>
             </ol>
       
        `;
       searchresult.appendChild(div)
       
    })
    .catch(error => console.log('error', error));
    searchresult
}
//searchdeatils();

function getCityDetails(){
  const name=searchInput.value;
  if(name==""){
    document.getElementById("error").innerText="Please Enter an address"
  //  alert("fill")
  }else{
    document.getElementById("error").innerText=" "
    console.log(name)
    searchdeatils(name)
  }

}
btn.addEventListener("click",getCityDetails)


