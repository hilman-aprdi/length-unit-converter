// memilih elemen select, options dan input dari DOM
const selects = document.querySelector(".select"),
      options = document.querySelector(".options"),
      labels = options.querySelectorAll("label"),
      input = document.querySelector("input"),
      results = document.querySelector(".results"),
      length = document.querySelector("h4");

// menambahkan event click pada elemen select
selects.addEventListener("click", () => {
  // set timeout untuk animasi dalam option
  let delay = 50;
  for(const e of labels) {
    setTimeout(() => {
      e.classList.toggle("hapus")
    }, delay)
    delay+=50;
  }
});

// reset background label
const resetBg = label => {
  document.querySelector(".results").innerHTML = "";
  for(const e of labels) {
    e.style.backgroundColor = "#e0e5ec"
    e.style.color = "#1a1a2d96"
  }
  label.style.backgroundColor = "#e068b4";
  label.style.color = "#f1f3f6";
}

// menambahkan event click pada elemen options
options.addEventListener("click", e => {
  // jika target element dari event adalah label
  if(e.target.matches("label")) {
    resetBg(e.target);
    // mengambil value input, unit dan hasil konversi
    const inputVal = input.value,
          unit = e.target.dataset.id,
          convertedVal = converter(inputVal, unit);
    length.innerHTML = e.target.innerText;
    for(const key in convertedVal) {
      const elem = document.createElement("p"),
            newText = document.createTextNode(`${convertedVal[key]} ${key}`);
      elem.appendChild(newText);
      if(key == unit) elem.style.backgroundColor = "#e0d368";
      results.appendChild(elem);
    }
  }
})

// membuat array untuk satuan panjang
const units = ["km", "hm", "dam", "m", "dm", "cm", "mm"];
// menambahkan data-id pada setiap label
labels.forEach((opt, index) => {
   opt.dataset.id = units[index];
})

// fungsi untuk melakukan konversi satuan panjang
const converter = (value, unit) => {
  // satuan yang telah dikonversi menjadi meter
  const length = {
    km: 1000,
    hm: 100, 
    dam: 10,
    m: 1,
    dm: 0.1,
    cm: 0.01,
    mm: 0.001
  };
  
  // membuat object kosong untuk menampung hasil konversi
  const convertedValues = {};
  // melakukan iterasi pada setiap satuan panjang
  for(const key in length) {
    // melakukan perhitungan konversi dan memasukkannya ke dalam object hasil konversi
    convertedValues[key] = value * length[unit] / length[key];
  };
  // mengembalikan hasil konversi dalam bentuk object
  return convertedValues;
}