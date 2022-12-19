let cardTemplate = document.getElementById('laptop-card-template');
let El;
let token = 'a086b96f603f0accef75ef5bef8cf938';

fetch('https://pcfy.redberryinternship.ge/api/laptops?token=' + token)
  .then(response => response.json())
  .then(leptList => {
    leptList = Object.entries(leptList)[0][1];

    leptList.forEach(item => {
      let leptopInfo = Object.entries(item)[0];
      let userInfo = Object.entries(item)[1];

      cardTemplate.innerHTML += `
      <div id="elemnt-wrapper">
        <img src=${
          'https://pcfy.redberryinternship.ge/' + leptopInfo[1].image
        } alt="image" class="laptop-image" id="laptopImg"/>
        <div id="element-Info">
          <h2>${userInfo[1].name} ${userInfo[1].surname}</h2>
          <p>${leptopInfo[1].name}</p>
          <a href="./individual-laptop.html?laptopId=${
            leptopInfo[1].id
          }">მეტის ნახვა</a>
        </div>
      </div>
      `;
      //console.log(leptopInfo[1].id);
    });
  });
