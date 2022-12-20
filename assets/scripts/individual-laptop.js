const leptForm = document.getElementById('individual-laptop-form');
let params = new URLSearchParams(document.location.search);
let laptopId = params.get('laptopId');

fetch(
  `https://pcfy.redberryinternship.ge/api/laptop/${laptopId}?token=b1f042809f068118cc1f5c706c35bd81`
)
  .then(response => response.json())
  .then(data => {
    data = Object.entries(data)[0][1];

    let laptopData = data.laptop;
    let userData = data.user;

    //teams fetch
    fetch('https://pcfy.redberryinternship.ge/api/teams')
      .then(response => response.json())
      .then(teamsD => {
        teamsD = Object.entries(teamsD)[0][1];

        let teamsName;
        let teamPosition;
        let chosenBrand;
        let leptopCondition;

        teamsD.forEach(item => {
          if (userData.team_id === item.id) {
            teamsName = item.name;
          }
        });
        //position fetch
        fetch('https://pcfy.redberryinternship.ge/api/positions')
          .then(response => response.json())
          .then(positions => {
            positions = Object.entries(positions)[0][1];
            positions.forEach(position => {
              if (userData.position_id === position.id) {
                teamPosition = position.name;
              }
            });
            //brands fetch
            fetch('https://pcfy.redberryinternship.ge/api/brands')
              .then(response => response.json())
              .then(brands => {
                brands = Object.entries(brands)[0][1];
                brands.forEach(brand => {
                  if (laptopData.brand_id === brand.id) {
                    chosenBrand = brand.name;
                  }
                });
                //conditionals
                if (laptopData.state === 'used') {
                  leptopCondition = 'მეორადი';
                } else {
                  leptopCondition = 'ახალი';
                }

                // leptop form innerHTML
                leptForm.innerHTML += `
              <div class="mainForm">
              
                <div class="img-persInfo-wrapper">
                  <img src="${
                    'https://pcfy.redberryinternship.ge/' + laptopData.image
                  }" id="laptop-id">
                  <div class="pers-info-wrapper">
                    <div class="pers-info-label">
                      <p><b>სახელი:</b></p>
                      <p><b>თიმი:</b></p>
                      <p><b>პოზიცია:</b></p>
                      <p><b>მეილი:</b></p>
                      <p><b>ტელ-ნომერი:</b></p>
                    </div>
                    <div class="pers-info-value">
                      <p>${userData.name} ${userData.surname}</p>
                      <p>${teamsName}</p>
                      <p>${teamPosition}</p>
                      <p>${userData.email}</p>
                      <p>${userData.phone_number}</p>
                    </div>
                  </div>
                </div>

                <hr>
              
                <div class="laptop-info-cpu">
                  <div class="info-cpu-left">
                    <div class="name-ram">
                      <p><b>ლეპტოპის სახელი:</b></p>
                      <p><b>ლეპტოპის ბრენდი:</b></p>
                      <p><b>RAM:</b></p>
                      <p><b>მეხსიერების ტიპი:</b></p>
                    </div>
                    <div class="name-ram-value">
                      <p>${laptopData.name}</p>
                      <p>${chosenBrand}</p>
                      <p>${laptopData.ram}</p>
                      <p>${laptopData.hard_drive_type}</p>
                    </div>
                  </div>
                  <div class="cpu-info-right">
                    <div class="cpu-name">
                      <p><b>CPU:</b></p>
                      <p><b>CPU-ს ბირთვი:</b></p>
                      <p><b>CPU-ს ნაკადი:</b></p>
                    </div>
                    <div class="cpu-name-value">
                      <p>${laptopData.cpu.name}</p>
                      <p>${laptopData.cpu.cores}</p>
                      <p>${laptopData.cpu.threads}</p>
                    </div>
                  </div>
                </div>

                <hr>

                <div class="laptop-condition">
                  <div class="condition-left">
                    <div class="price-condition">
                      <p><b>ლეპტოპის მდგომარეობა:</b></p>
                      <p><b>ლეპტოპის ფასი:</b></p>
                    </div>
                    <div class="price-condition-value">
                      <p>${leptopCondition}</p>
                      <p>${laptopData.price} ₾</p>
                    </div>
                  </div>
                  <div class="date-right">
                    <div class="date">
                      <p><b>შეძენის თარიღი:</b></p>
                    </div>
                    <div class="date-value">
                      <p>${laptopData.purchase_date}</p>
                    </div>
                  </div>
                </div>
              </div>
                `;
              });
          });
      });
  });
