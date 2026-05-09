const dust=document.getElementById('dust');
for(let i=0;i<30;i++){
  const s=document.createElement('span');
  const sz=Math.random()*2.5+0.5;
  s.style.cssText=
  `left:${Math.random()*100}%;
  width:${sz}px;
  height:${sz}px;
  animation-duration:${Math.random()*14+7}s;
  animation-delay:${Math.random()*12}s;`;
  dust.appendChild(s);
}
function openK(){
  document.getElementById('kw').classList.add('opened');
  setTimeout(()=>{
    document.getElementById('ob').classList.add('visible');
  },550);
}
function closeK(){
  //////////////////////////////
  // reset hasil
  //////////////////////////////
  hasilBtn.innerHTML =
  'HASIL';
  //////////////////////////////
  // kosongkan semua pocket
  //////////////////////////////
  const pockets =
  document.querySelectorAll(
    '.pocket'
  );
  pockets.forEach(p=>{
    p.innerHTML = '';
  });
  //////////////////////////////
  // reset dropdown soal
  //////////////////////////////
  soalSelect.value = '';
  //////////////////////////////
  // reset dropdown sifat
  //////////////////////////////
  sifatSelect.value = '';
  //////////////////////////////
  // tutup koper
  //////////////////////////////
  document
  .getElementById('ob')
  .classList
  .remove('visible');
  setTimeout(()=>{
    document
    .getElementById('kw')
    .classList
    .remove('opened');
  },400);
}
function resetHasil(){
  hasilBtn.innerHTML = 'HASIL';
}
function animasiPembagian(){
  //////////////////////////////
  // ambil pocket
  //////////////////////////////
  const topPockets =
  document.querySelectorAll(
    '.top-pocket'
  );
  const bottomPockets =
  document.querySelectorAll(
    '.bottom-pocket'
  );
  //////////////////////////////
  // hitung total bawah
  //////////////////////////////
  let totalBawah = 0;
  bottomPockets.forEach(p=>{
    totalBawah +=
    p.querySelectorAll(
      '.filled-bead'
    ).length;
  });
  //////////////////////////////
  // hapus semua manik bawah
  //////////////////////////////
  bottomPockets.forEach(p=>{
    p.innerHTML = '';
  });
  //////////////////////////////
  // hapus manik atas
  //////////////////////////////
  let sisaHapus =
  totalBawah;
  topPockets.forEach(p=>{
    const manik =
    p.querySelectorAll(
      '.filled-bead'
    );
    if(
      manik.length > 0
      &&
      sisaHapus > 0
    ){
      manik[
        manik.length - 1
      ].remove();
      sisaHapus--;
    }
  });
}
const beads =
document.querySelectorAll('.bead');
const pockets =
document.querySelectorAll('.pocket');
//////////////////////////////
// CEK JAWABAN
//////////////////////////////
const hasilBtn =
document.getElementById('hasilBtn');
const soalSelect =
document.getElementById('soalSelect');
const sifatSelect =
document.getElementById('sifatSelect');
//////////////////////////////
// RESET SAAT GANTI
//////////////////////////////
soalSelect.addEventListener(
'change',
resetHasil
);
sifatSelect.addEventListener(
'change',
resetHasil
);
const jawabanSoal = {
  // 3² × 3⁴
  "1" : {
    bentuk:"3⁶",
    atas:[1, 1, 1, 1, 1, 1],
    bawah:[]
  },
  // 2⁶ ÷ 2²
  "2" : {
    bentuk:"2⁴",
    atas:[1,1,1,1,1,1],
    bawah:[1,1]
  },
  // (3²)³
  "3" : {
    bentuk:"3⁶",
    atas:[2,2,2],
    bawah:[]
  },
  // (2 × 3)³
  "4" : {
    bentuk:"2³ × 3³ ",
    atas:[3, 3, 3],
    bawah:[]
  },
  // 5⁰
  "5" : {
    bentuk:"1",
    atas:[],
    bawah:[]
  },
  // 6⁻²
  "6" : {
    bentuk:"1/4",
    atas:[],
    bawah:[1, 1]
  },
  // 2² × 2³ ÷ 2⁴
  "7" : {
    bentuk:"2¹",
    atas:[1,1,1,1,1],
    bawah:[1,1,1,1]
  }
};
function cekWarnaBerbeda(){
  const topPockets =
  document.querySelectorAll(
    '.top-pocket'
  );
  const warnaDipakai = [];
  topPockets.forEach(p=>{
    const bead =
    p.querySelector(
      '.filled-bead'
    );
    if(bead){
      warnaDipakai.push(
        bead.style.background
      );
    }
  });
  //////////////////////////////
  // hapus duplikat
  //////////////////////////////
  const unik =
  [...new Set(warnaDipakai)];
  //////////////////////////////
  // true jika semua beda
  //////////////////////////////
  return unik.length === warnaDipakai.length;
}
// tombol hasil
hasilBtn.addEventListener('click',()=>{
  const soalDipilih =
  soalSelect.value;
  if(!soalDipilih){
    hasilBtn.innerHTML =
    'PILIH';
    return;
  }
  const data =
  jawabanSoal[soalDipilih];
  //////////////////////////////
  // BACA KOTAK ATAS
  //////////////////////////////
  const topPockets =
  document.querySelectorAll(
    '.top-pocket'
  );
  const hasilAtas = [];
  topPockets.forEach(p=>{
    const jumlah =
    p.querySelectorAll(
      '.filled-bead'
    ).length;
    // kosong = 1
    if(jumlah > 0){
      hasilAtas.push(jumlah);
    }
  });
  //////////////////////////////
  // BACA KOTAK BAWAH
  //////////////////////////////
  const bottomPockets =
  document.querySelectorAll(
    '.bottom-pocket'
  );
  const hasilBawah = [];
  bottomPockets.forEach(p=>{
    const jumlah =
    p.querySelectorAll(
      '.filled-bead'
    ).length;
    if(jumlah > 0){
      hasilBawah.push(jumlah);
    }
  });
  //////////////////////////////
  // CEK
  //////////////////////////////
  const atasBenar =
  JSON.stringify(hasilAtas)
  ===
  JSON.stringify(data.atas);
  const bawahBenar =
  JSON.stringify(hasilBawah)
  ===
  JSON.stringify(data.bawah);
  if(
  atasBenar
  &&
  bawahBenar
){
  //////////////////////////////////
  // KHUSUS PERKALIAN DALAM
  //////////////////////////////////
  if(soalDipilih === "4"){
    const warnaBenar =
    cekWarnaBerbeda();
    if(!warnaBenar){
      hasilBtn.innerHTML =
      'WARNA';
      return;
    }
  }
  if(
  soalDipilih === "2"
  ||
  soalDipilih === "7"
  ){
    animasiPembagian();
  }
  hasilBtn.innerHTML =
  data.bentuk;
}
});
let draggedColor = null;
//////////////////////////////
// DRAG WARNA
//////////////////////////////
beads.forEach(bead=>{
  bead.addEventListener(
    'dragstart',
    ()=>{
      draggedColor =
      bead.dataset.color;
    }
  );
});
//////////////////////////////
// DROP KE KOTAK
//////////////////////////////
pockets.forEach(pocket=>{
  // izinkan drop
  pocket.addEventListener(
    'dragover',
    (e)=>{
      e.preventDefault();
    }
  );
  // ketika dijatuhkan
pocket.addEventListener(
    'drop',
    (e)=>{
      e.preventDefault();
      // wajib ada warna
      if(!draggedColor) return;
      // hitung isi
      const jumlahManik =
      pocket.querySelectorAll(
        '.filled-bead'
      ).length;
      // max 8
      if(jumlahManik >= 8){
        return;
      }
      // buat manik
      const bead =
      document.createElement('div');
      bead.classList.add(
        'filled-bead'
      );
      bead.style.background =
      draggedColor;
      // masukkan ke pocket
      pocket.appendChild(bead);
      // reset hasil
      resetHasil();
    }
  );
  //////////////////////////////
  // HAPUS MANIK
  //////////////////////////////
  pocket.addEventListener(
    'contextmenu',
    (e)=>{
      e.preventDefault();
      const manik =
      pocket.querySelectorAll(
        '.filled-bead'
      );
      if(manik.length > 0){
        manik[
          manik.length - 1
        ].remove();
        resetHasil();
      }
    }
  );
});