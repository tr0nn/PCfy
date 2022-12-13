let downModalWindow = document.getElementById('modal-window-id');
let UpModalWindow = document.getElementById('Upmodal-windows-close-open');
let leptopBrandBody = document.getElementById('brand-select');
let leptopCPU = document.getElementById('cpu-select');
const submitInfoBtn = document.getElementById('submitInfoBtn');
let fileEl = document.getElementById('img-saveId');

let emplInfoLS = JSON.parse(localStorage.getItem('employee-info'));
let laptInfoLS = JSON.parse(localStorage.getItem('laptop-info'));

const laptopNameRegex = /^[a-zA-Z 0-9!@#$%^&*()_+=]+$/;
const onluRegexNUmbers = /^[0-9]*$/;

let imgUrl;
let cpuId; // აღარ გამომიყენებია რადგან api ში მიდის string სახით და არა id.
let leptopBrandId;
let leptopName,
  leptopBrand,
  cpu,
  cpuCore,
  cpuStream,
  ram,
  memoryType,
  Date,
  price,
  condition;

downModalWindow.style.display = 'none';

//მოდალ ფანჯარა რომ გამოჩნდეს laptop-information.html ში გავუწერო openModalWindow() buttonს. -------------------------------------------
function openModalWindow() {
  UpModalWindow.style.display = 'none';
  downModalWindow.style.display = 'block';
}

function closes() {
  window.location.href = './laptop-list.html';
  //   UpModalWindow.style.display = 'block';
  //   downModalWindow.style.display = 'none';
}

fetch('https://pcfy.redberryinternship.ge/api/brands')
  .then(response => response.json())
  .then(brandsDate => {
    brandsDate = Object.entries(brandsDate)[0][1];
    brandsDate.forEach(item => {
      document.getElementById('brand-select').innerHTML += `<option value=${
        item.name
      } id=${'brandsId-' + item.id}> ${item.name}</option>`;
    });
  });

fetch('https://pcfy.redberryinternship.ge/api/cpus')
  .then(response => response.json())
  .then(cpusDate => {
    cpusDate = Object.entries(cpusDate)[0][1];
    cpusDate.forEach(item => {
      //console.log(item.name.replaceAll(' ', ','));
      document.getElementById(
        'cpu-select'
      ).innerHTML += `<option value=${item.name.replaceAll(' ', ',')} id=${
        'cpuId-' + item.id
      }> ${item.name}</option>`;
    });
  });

leptopCPU.addEventListener('change', () => {
  fetch('https://pcfy.redberryinternship.ge/api/cpus')
    .then(response => response.json())
    .then(cpusDate => {
      cpusDate = Object.entries(cpusDate)[0][1];
      cpusDate.forEach(item => {
        if (item.name.replaceAll(' ', ',') == leptopCPU.value) {
          cpuId = item.id;
        }
      });
    });
});

leptopBrandBody.addEventListener('change', () => {
  leptopBrandBody.value == 'HP' ? (leptopBrandId = 1) : null;
  leptopBrandBody.value == 'Dell' ? (leptopBrandId = 2) : null;
  leptopBrandBody.value == 'Microsoft' ? (leptopBrandId = 3) : null;
  leptopBrandBody.value == 'Apple' ? (leptopBrandId = 4) : null;
  leptopBrandBody.value == 'Lenovo' ? (leptopBrandId = 5) : null;
  leptopBrandBody.value == 'Acer' ? (leptopBrandId = 6) : null;
});
submitInfoBtn.addEventListener('click', () => {
  leptopValidation();
});
//setItem image localstorage
fileEl.addEventListener('change', () => {
  const fr = new FileReader();

  fr.readAsDataURL(fileEl.files[0]);

  fr.addEventListener('load', () => {
    const url = fr.result;

    const img = new Image();
    img.src = url;
    imgUrl = url;
    localStorage.setItem('my-image', url);
  });
});

function leptopValidation() {
  let lepFormVal = true;
  let hddTypeVal = document.getElementById('HDDType').checked;
  let ssdTypeVal = document.getElementById('SSDType').checked;
  let newLeptVal = document.getElementById('newLept').checked;
  let usedLeptVal = document.getElementById('usedLept').checked;

  leptopName = document.getElementById('leptop-name').value;
  leptopBrand = document.getElementById('brand-select');
  cpu = document.getElementById('cpu-select');
  cpuCore = document.getElementById('cpu-core-input').value;
  cpuStream = document.getElementById('cpu-stream-input').value;
  ram = document.getElementById('ram').value;

  hddTypeVal ? (memoryType = 'HDD') : null;
  ssdTypeVal ? (memoryType = 'SSD') : null;

  date = document.getElementById('dateTime').value;
  price = document.getElementById('laptopPrice').value;

  newLeptVal ? (condition = 'new') : null;
  usedLeptVal ? (condition = 'used') : null;

  //laptopName validation
  if (laptopNameRegex.test(leptopName)) {
    document.getElementById('leptop-name').style.border = '1.8px solid #8ac0e2';
    document.getElementById('laptop-div').style.color = 'black';
  } else {
    document.getElementById('leptop-name').style.border = '1.8px solid red';
    document.getElementById('laptop-div').style.color = 'red';
    lepFormVal = false;
  }
  //laptops brand validation
  if (leptopBrand.value == 'ლეპტოპის ბრენდი') {
    leptopBrand.style.border = '1.8px solid red';
    lepFormVal = false;
  } else {
    leptopBrand.style.border = '1.8px solid black';
  }
  //CPU Validation
  if (cpu.value == 'CPU') {
    cpu.style.border = '1.8px solid red';
    lepFormVal = false;
  } else {
    cpu.style.border = '1.8px solid black';
  }
  //CPU Core Validation
  if (onluRegexNUmbers.test(cpuCore) && cpuCore !== '') {
    document.getElementById('cpu-core-input').style.border =
      '1.8px solid #8ac0e2';
    document.getElementById('cpu-core').style.color = 'black';
  } else {
    document.getElementById('cpu-core-input').style.border = '1.8px solid red';
    document.getElementById('cpu-core').style.color = 'red';
    lepFormVal = false;
  }
  //cpu Stream Validation
  if (onluRegexNUmbers.test(cpuStream) && cpuStream !== '') {
    document.getElementById('cpu-stream-input').style.border =
      '1.8px solid #8ac0e2';
    document.getElementById('cpu-stream').style.color = 'black';
  } else {
    document.getElementById('cpu-stream-input').style.border =
      '1.8px solid red';
    document.getElementById('cpu-stream').style.color = 'red';
    lepFormVal = false;
  }
  // RAM Validation
  if (onluRegexNUmbers.test(ram) && ram !== '') {
    document.getElementById('ram').style.border = '1.8px solid #8ac0e2';
    document.getElementById('ram-info').style.color = 'black';
  } else {
    document.getElementById('ram').style.border = '1.8px solid red';
    document.getElementById('ram-info').style.color = 'red';
    lepFormVal = false;
  }
  //HDD or SSD Validation
  if (!hddTypeVal && !ssdTypeVal) {
    document.getElementById('memory-label').style.color = 'red';
    document.getElementById('vect-hide').style.display = 'inline';
    lepFormVal = false;
  } else {
    document.getElementById('memory-label').style.color = 'black';
    document.getElementById('vect-hide').style.display = 'none';
  }
  //Price Validation
  if (onluRegexNUmbers.test(price) && price !== '') {
    document.getElementById('laptopPrice').style.border = '1.8px solid #8ac0e2';
    document.getElementById('price-info').style.color = 'black';
  } else {
    document.getElementById('laptopPrice').style.border = '1.8px solid red';
    document.getElementById('price-info').style.color = 'red';
    lepFormVal = false;
  }
  //new or used Validation
  if (!newLeptVal && !usedLeptVal) {
    document.getElementById('leptCondVal').style.color = 'red';
    document.getElementById('vect-hideFor').style.display = 'inline';
    lepFormVal = false;
  } else {
    document.getElementById('leptCondVal').style.color = 'black';
    document.getElementById('vect-hideFor').style.display = 'none';
  }

  if (lepFormVal) {
    window.localStorage.setItem(
      'laptop-info',
      JSON.stringify({
        laptop_name: leptopName,
        //laptop_image: imgUrl,
        laptop_brand_id: leptopBrandId,
        laptop_cpu: leptopCPU.value.replaceAll(',', ' '),
        laptop_cpu_cores: cpuCore,
        laptop_cpu_threads: cpuStream,
        laptop_ram: ram,
        laptop_hard_drive_type: memoryType,
        laptop_state: condition,
        laptop_purchase_date: date,
        laptop_price: price
      })
    );
    console.log(emplInfoLS + ' - ' + laptInfoLS);
    alert('amis mere');
    submitPostForm();
  }
}

function submitPostForm() {
  fetch('https://pcfy.redberryinternship.ge/api/laptop/create', {
    method: 'POST',
    body: JSON.stringify({
      name: emplInfoLS.name,
      surname: emplInfoLS.lastname,
      team_id: emplInfoLS.team_id,
      position_id: emplInfoLS.position_id,
      phone_number: emplInfoLS.phone_number,
      email: emplInfoLS.email,
      token: emplInfoLS.token,
      laptop_name: laptInfoLS.laptop_name,
      //laptop_image: imgUrl,
      laptop_brand_id: laptInfoLS.laptop_brand_id,
      laptop_cpu: laptInfoLS.laptop_cpu,
      laptop_cpu_cores: laptInfoLS.laptop_cpu_cores,
      laptop_cpu_threads: laptInfoLS.laptop_cpu_threads,
      laptop_ram: laptInfoLS.laptop_ram,
      laptop_hard_drive_type: laptInfoLS.laptop_hard_drive_type,
      laptop_state: laptInfoLS.laptop_state,
      laptop_purchase_date: laptInfoLS.laptop_purchase_date,
      laptop_price: laptInfoLS.laptop_price
    })
  })
    .then(response => {
      console.log(response.json());
      if (response.status <= 299) {
        alert('good');
      }
    })
    .catch(err => {
      alert(err);
    });
}
