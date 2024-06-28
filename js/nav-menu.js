document.addEventListener("DOMContentLoaded", function () {
  const navMenu = document.getElementById("nav-menu");
  const myHeader = document.getElementById("my-header");
  const navTime = document.getElementById("nav-time");

  // Get the current date and time
  const now = new Date();

  // Extract date, day, and hour from the current date and time
  const date = now.toLocaleDateString("en-US");
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const hour = String(now.getHours()).padStart(2, "0"); // Ensure hour is two digits
  const minute = String(now.getMinutes()).padStart(2, "0"); // Ensure minute is two digits
  const second = String(now.getSeconds()).padStart(2, "0"); // Ensure second is two digits

  const hdContent = `
        <a href="../index.html" class="flex justify-center items-center" style>
       
            <h1 class="flex justify-center items-center h-6 mr-3 border-r-2 pr-3 border-slate-300 font-semibold text-slate-500 text-xs" style="color: white; font-size: 1.5vh;">
                RSJP <br> HARAPAN KITA
                </h1> <br>
            <h1 class="flex justify-center items-center h-6 p-3 rounded-md bg-cyan-500 text-white text-center font-medium font-semibold text-xs">
                HVAC</h1>
            
        
         </a>`;

  const hdContent1 = `
  <nav class="bg-white absolute z-50 h-[440px] w-[200px] m-[3vh] rounded-md flex items-center pl-6 shadow-md" style="background-color: rgba(255, 255, 255, 0.1); width:16vw; height:100vh;">
        aaaaaaaaaa
    
  </nav>
  `;

  const navContent = `
        <nav class="bg-slate-100 absolute z-50 h-[440px] w-[210px] m-[1vw] rounded-md flex items-center pl-6 shadow-md" 
        style=" width:17.5vw; height:94vh; margin:1vw; padding-top: 5vh;
        background: rgba(143, 255, 252, 0.2);
        border-radius: 5px;
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(7.6px);
        -webkit-backdrop-filter: blur(7.6px);
        border: 2px solid rgba(4, 4, 4, 0.2);">
            <ul class="block" >

            <li class="bg-cyan-500 rounded-md flex items-center pt-1 shadow-md" style="padding: 5px; width: 85%; margin-bottom: 4vh; margin-left:0vw;">

            <h1 class="flex justify-center items-center h-9 p-3 rounded-md bg-cyan-500 text-white text-center font-semibold text-[1vw] " 
            style="font-size: 1.3vw; margin-left: 1px; width:15vw; border-color:FFFFFF; text-shadow: 1px 1px 1px rgba(1, 1, 1, 1); box-shadow: 0  5px 5px rgba(0, 0, 0, 0.5);">
                HVAC RSJP <br> HARAPAN KITA 
            </h1>
        
        </li>
        

                <li class="group " >
                    <a href="../index.html" class="list-menu text-white" id="dashboard" style="font-size: 1.1vw; text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.6); color:#0a014e" >
                        <span class="pr-3 " style="font-size: 10px ; ">
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-slate-500" width="24" height="24"
                                viewBox="0 0 24 24">
                                <path d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1
                                    1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1
                                    1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1
                                    1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z" />
                            </svg>
                        </span> Dashboard</a>
                </li>
                <li class="group">
                    
                    <a href="../pages/filter.html" class="list-menu text-white" id="filter" style="font-size: 1.1vw; text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.6); color:#0a014e">
                        <span class="pr-3 ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="fill-slate-500" width="24" height="24"
                        viewBox="0 0 24 24">
                        <path d="M18.277 8c.347.596.985 1 1.723 1a2 2 0 0 0 0-4c-.738 0-1.376.404-1.723
                            1H16V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H5.723C5.376 5.404 4.738 5 4 5a2 2 0 0 0 0
                            4c.738 0 1.376-.404 1.723-1H8v.369C5.133 9.84 4.318 12.534 4.091 14H3a1 1 0 0 0-1
                            1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-.877c.197-.959.718-2.406
                            2.085-3.418A.984.984 0 0 0 9 11h6a.98.98 0 0 0 .792-.419c1.373 1.013 1.895 2.458
                            2.089 3.419H17a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-4a1 1 0 0
                            0-1-1h-1.092c-.227-1.466-1.042-4.161-3.908-5.632V8h2.277zM6 18H4v-2h2v2zm14
                            0h-2v-2h2v2zm-6-9h-4V5h4v4z" />
                    </svg>
                        </span> Cathlab Room</a>
                </li>
                
                <li class="group">
                <a href="../pages/overview.html" class="list-menu text-white" id="overview" style="font-size: 1.1vw; text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.6); color:#0a014e">
                        <span class="pr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="fill-slate-500" width="24" height="24"
                                viewBox="0 0 24 24">
                                <path d="M3 4v5h2V5h4V3H4a1 1 0 0 0-1 1zm18 5V4a1 1 0 0 0-1-1h-5v2h4v4h2zm-2
                                10h-4v2h5a1 1 0 0 0 1-1v-5h-2v4zM9 21v-2H5v-4H3v5a1 1 0 0 0 1 1h5zM2 11h20v2H2z" />
                            </svg>
                        </span> Machine Room</a>
                </li>

                

                 



                 
                
                

                
                
            </ul>

            
        </nav>
        


        
    `;
  //   myHeader.innerHTML = hdContent;
  //   navTime.innerHTML = hdContent1;
  navMenu.innerHTML = navContent;

//   setInterval(() => {
//     const now = new Date();
//     const hour = ("0" + now.getHours()).slice(-2);
//     const minute = ("0" + now.getMinutes()).slice(-2);
//     const second = ("0" + now.getSeconds()).slice(-2);
//     document.getElementById(
//       "currentDateTime"
//     ).innerHTML = `<b> ${now.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })}</b>`;
//     document.getElementById(
//       "currentTime"
//     ).innerHTML = `<b>${hour}:${minute}:${second}</b>`;
//   }, 1000);


});


{/* <li class="rounded-md flex items-center pt-1 shadow-md" style="padding: 7px; width:13vw; margin-top:4vh; ">
                    <span class="" 
                    style="padding:1vw; ">
                        
                        <span id="currentDateTime" style="color:#005fc8 ;font-size: 1.5vw; font-weight:italic">
                            <b>${new Date().toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}</b>
                        </span>
                        <span id="currentTime" style="color:#005fc8; font-size: 2vw; text-align: center;">
                            <b>00:00:00</b>
                        </span>
                    </span>
                 </li> */}