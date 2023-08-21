let ip = "";
window.addEventListener("load", () => {
  fetch("https://www.cloudflare.com/cdn-cgi/trace")
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
      ip = data.split("\n")[2].split("=")[1];
      console.log(ip);
      document.getElementById(
        "ip-address"
      ).textContent = `Your Current IP Address is ${ip}`;
    })
    .catch((err) => console.error("error fetching IP Add: ", err));
});

//handle button click to get details
document.getElementById("get-details").addEventListener("click", () => {
  console.log(ip);
  let ipdata;
  fetch(`https://ipinfo.io/${ip}/geo?token=83348d8a9e9983`)
    .then((res) => res.json())
    .then((data) => {
      const latlong = data.loc.split(",");
      ipdata = data;
      console.log(ipdata);
      const mapHTML = `
        <iframe src="https://maps.google.com/maps?q=${latlong[0]},${latlong[1]}&z=15&output=embed" width="360" height="270" frameborder="0" style="border:0"></iframe>`;
      document.getElementById("location").innerHTML = mapHTML;
      //get time of the user's location
      const timezone = data.timezone;
      const date = new Date(
        new Date().toLocaleString("en-US", { timeZone: timezone })
      );
      document.getElementById(
        "time"
      ).textContent = `Your local time: ${date.toLocaleTimeString()}`;

      //get post offices by pincode

      const pincode = data.postal;
      fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((res) => res.json())
        .then((postOfficesData) => {
          const postOffices = postOfficesData[0].PostOffice;
          console.log(postOffices);
          const postofficeList = document.getElementById("post-office-list");
          postOffices.forEach((postOffice) => {
            const card = document.createElement("div");
            card.classList="postal-card";
            card.innerHTML=`
            <p>Name: ${postOffice.Name}</p>
            <p>BranchType: ${postOffice.BranchType}</p>
            <p>DeliveryStatus: ${postOffice.DeliveryStatus}</p>
            <p>District: ${postOffice.District}</p>
            <p>Division: ${postOffice.Division}</p>
            `;
            postofficeList.appendChild(card);
          });
        });
    });
});
