// let fileEl = document.getElementById('img-saveId');
// let btn = document.getElementById('imgBtn');

// btn.addEventListener('click', () => {
//   //getItem image localstorage

//   const LSurl = localStorage.getItem('my-image');
//   const LSimg = new Image();
//   LSimg.src = LSurl;
//   document.body.appendChild(LSimg);
// });
// fileEl.addEventListener('change', () => {
//   //setItem image localstorage
//   const fr = new FileReader();

//   fr.readAsDataURL(fileEl.files[0]);

//   fr.addEventListener('load', () => {
//     const url = fr.result;

//     const img = new Image();
//     img.src = url;

//     localStorage.setItem('my-image', url);
//   });
// });

// console.log(
//   'name - ' + emplInfoLS.name,
//   'lastname - ' + emplInfoLS.lastname,
//   'team_id -' + emplInfoLS.team_id,
//   'position_id-' + emplInfoLS.position_id,
//   'phone_numer-' + emplInfoLS.phone_number,
//   'email-' + emplInfoLS.email,
//   'token-' + emplInfoLS.token,
//   'laptop_brand_id-' + laptInfoLS.laptop_brand_id,
//   'laptop_cpu' + laptInfoLS.laptop_cpu,
//   'laptop_cpu_cores-' + laptInfoLS.laptop_cpu_cores,
//   'laptop_cpu_threads-' + laptInfoLS.laptop_cpu_threads,
//   'laptop_ram-' + laptInfoLS.laptop_ram,
//   'laptop_hard_drive_type-' + laptInfoLS.laptop_hard_drive_type,
//   'laptop_state-' + laptInfoLS.laptop_state,
//   'laptop_purchase_date-' + laptInfoLS.laptop_purchase_date,
//   'laptop_price-' + laptInfoLS.laptop_price
// );
