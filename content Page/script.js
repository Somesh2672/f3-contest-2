const UserIp = document.getElementById("ipAddress");


const gMap = document.getElementById("googleMap");

// "ip": "157.33.206.169",
// "city": "Nagpur",
// "region": "Maharashtra",
// "country": "IN",
// "loc": "21.1463,79.0849",
// "org": "AS55836 Reliance Jio Infocomm Limited",
// "postal": "440003",
// "timezone": "Asia/Kolkata",
// "readme": "https://ipinfo.io/missingauth"


   
let ipadd = null;
window.addEventListener("load", async function() {
try{
        // Get IP Address on page load
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        ipadd = ipData.ip;
        UserIp.innerHTML = ipadd;
        // $("#ipAddress").text(ipAddress);
        // Fetch additional information
        await delay(1000); // Delay for 1 second (adjust as needed)
        const ipInfoResponse = await fetch(`https://ipinfo.io/${ipadd}/geo`);
        const ipInfoData = await ipInfoResponse.json();
        // console.log("IP Info:", ipInfoData);


}  
    catch (error) {
        console.error(error);
    }


    let ipdata;
fetch(`https://ipinfo.io/${ipadd}/geo?token=83348d8a9e9983`)
  .then((res) => res.json())
  .then((data) => {
    const latlong = data.loc.split(",");
    ipdata = data;
    console.log(ipdata);
    
    document.getElementById("latitude").innerHTML = latlong[0];
    document.getElementById("longitude").innerHTML = latlong[1];
  
    document.getElementById("city").innerHTML = ipdata.city;
    document.getElementById("region").innerHTML = ipdata.region;
    document.getElementById("hostName").innerHTML = ipdata.city;
    document.getElementById("organisation").innerHTML = ipdata.org;

    document.getElementById("pincode").innerHTML = ipdata.postal ;
    document.getElementById("timeZone").innerHTML = ipdata.timezone ;

    const mapHTML = `
      <iframe src="https://maps.google.com/maps?q=${latlong[0]},${latlong[1]}&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>`;
    document.getElementById("map").innerHTML = mapHTML;
    //get time of the user's location
    const timezone = data.timezone;

    const date = new Date(
      new Date().toLocaleString("en-US", { timeZone: timezone })
    );
    document.getElementById(
      "dateAndTime"
    ).textContent = ` ${date.toLocaleTimeString()}`;

    //get post offices by pincode

    const pincode = data.postal;

    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then((res) => res.json())
    .then((postOfficesData) => {
        const postOffices = postOfficesData[0].PostOffice;
        const totalPostOffices = postOffices.length;
        document.getElementById("pinfound").innerHTML = totalPostOffices;
        console.log(postOffices);

        const searchInput = document.getElementById("searchPost");
        const postofficeList = document.getElementById("post-office-list");

        function renderPostOffices(searchTerm = "") {
            postofficeList.innerHTML = ""; // Clear existing content

            if (searchTerm === "") {
                postOffices.forEach((postOffice) => {
                    const card = document.createElement("div");
                    card.classList = "card2";
                    card.innerHTML = `
                        <p>Name: ${postOffice.Name}</p>
                        <p>BranchType: ${postOffice.BranchType}</p>
                        <p>DeliveryStatus: ${postOffice.DeliveryStatus}</p>
                        <p>District: ${postOffice.District}</p>
                        <p>Division: ${postOffice.Division}</p>
                    `;
                    postofficeList.appendChild(card);
                });
            } 
            else {
                postOffices.forEach((postOffice) => {
                    // Search only by name
                    if (postOffice.Name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        const card = document.createElement("div");
                        card.classList = "card2";
                        card.innerHTML = `
                            <p>Name: ${postOffice.Name}</p>
                            <p>BranchType: ${postOffice.BranchType}</p>
                            <p>DeliveryStatus: ${postOffice.DeliveryStatus}</p>
                            <p>District: ${postOffice.District}</p>
                            <p>Division: ${postOffice.Division}</p>
                        `;
                        postofficeList.appendChild(card);
                    }
                });
            }
        }

        renderPostOffices(); // Initial rendering

        // Handle input change for search
        searchInput.addEventListener("input", function() {
            const searchTerm = searchInput.value;
            renderPostOffices(searchTerm);
        });
    });


    // fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    //   .then((res) => res.json())
    //   .then((postOfficesData) => {
    //     const postOffices = postOfficesData[0].PostOffice;
    //     console.log(postOffices);
    //     const totalPostOffices = postOffices.length;
    //     document.getElementById("pinfound").innerHTML = totalPostOffices;




    //     const postofficeList = document.getElementById("post-office-list");
    //     postOffices.forEach((postOffice) => {
    //       const card = document.createElement("div");
    //       card.classList="card2";
          
    //       card.innerHTML=`
    //       <p>Name : ${postOffice.Name}</p>
    //       <p>BranchType : ${postOffice.BranchType}</p>
    //       <p>DeliveryStatus : ${postOffice.DeliveryStatus}</p>
    //       <p>District : ${postOffice.District}</p>
    //       <p>Division : ${postOffice.Division}</p>
    //       `;
    //       postofficeList.appendChild(card);
    //     });
    //   });
  });
});
