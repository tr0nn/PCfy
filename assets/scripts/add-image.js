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
