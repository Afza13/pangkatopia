        let warnaAktif = '#378ADD';

        const dataRumus = {
            'perkalian':       { judul:'Perkalian Pangkat',       utama:'aᵐ × aⁿ = aᵐ⁺ⁿ'},
            'pembagian':       { judul:'Pembagian Pangkat',       utama:'aᵐ ÷ aⁿ = aᵐ⁻ⁿ'},
            'pangkat-pangkat': { judul:'Pangkat dari Pangkat',    utama:'(aᵐ)ⁿ = aᵐˣⁿ'},
            'perkalian-dalam': { judul:'Perkalian dalam Pangkat', utama:'(a × b)ⁿ = aⁿ × bⁿ'},
            'pembagian-dalam': { judul:'Pembagian dalam Pangkat', utama:'(a ÷ b)ⁿ = aⁿ ÷ bⁿ'},
            'nol':             { judul:'Pangkat Nol',             utama:'a⁰ = 1'},
            'negatif':         { judul:'Pangkat Negatif',         utama:'a⁻ⁿ = 1 / aⁿ'},
            'campuran':        { judul:'Operasi Campuran',        utama:'Gabungan semua sifat'}
        };

        const dataSoal = {
            'perkalian': {
                teks: '3² × 3⁴ = ?',
                keterangan: '3⁶',
                baris: [
                    { label: 'Pembilang', jumlah: 10, jawaban: 2 },
                    { label: 'Penyebut', jumlah: 10, jawaban: 4 }
                ]
            },
            'pembagian': {
                teks: '2⁶ ÷ 2² = ?',
                keterangan: '2⁴',
                baris: [
                    { label: 'Pembilang', jumlah: 10, jawaban: 6 },
                    { label: 'Penyebut', jumlah: 10, jawaban: 2 }
                ]
            },
            'pangkat-pangkat': {
                teks: '(3²)⁸ = ?',
                keterangan: '3¹⁶',
                baris: [
                    { label: 'Pangkat dalam', jumlah: 10, jawaban: 2 },
                    { label: 'Pangkat luar', jumlah: 10, jawaban: 8 }
                ]
            },
            'perkalian-dalam': {
                teks: '(2 × 3)⁸ = ?',
                keterangan: '2⁸ × 3⁸',
                baris: [
                    { label: 'Basis 2 (isi pangkatnya)', jumlah: 10, jawaban: 8 },
                    { label: 'Basis 3 (isi pangkatnya)', jumlah: 10, jawaban: 8 }
                ]
            },
            'pembagian-dalam': {
                teks: '(4 ÷ 2)³ = ?',
                keterangan: '4³ ÷ 2³',
                baris: [
                    { label: 'Basis 4 (isi pangkatnya)', jumlah: 10, jawaban: 3 },
                    { label: 'Basis 2 (isi pangkatnya)', jumlah: 10, jawaban: 3 }
                ]
            },
            'nol': {
                teks: '5⁰ = ?',
                keterangan: '1',
                baris: [
                    { label: 'Pembilang', jumlah: 10, jawaban: 1 },
                    { label: 'Penyebut', jumlah: 10, jawaban: 0 }
                ]
            },
            'negatif': {
                teks: '2⁻² = ?',
                keterangan: '1/4',
                baris: [
                    { label: 'Pembilang', jumlah: 10, jawaban: 1 },
                    { label: 'Penyebut', jumlah: 10, jawaban: 4 }
                ]
            },
            'campuran': {
                teks: '2² × 2⁸ ÷ 2⁴ = ?',
                keterangan: '2⁶',
                baris: [
                    { label: 'Eksponen dari Basis 2', jumlah: 10, jawaban: 2 },
                    { label: 'Eksponen dari Basis 2', jumlah: 10, jawaban: 8 },
                    { label: 'Eksponen dari Basis 2', jumlah: 10, jawaban: 4 }
                ]
            }
        };

        // fungsi tampilkanRumus
        function tampilkanRumus() {
            const pilihan = document.getElementById('menu1').value;
            const data = dataRumus[pilihan];
            if (data) {
                document.getElementById('rumus-judul').textContent = data.judul;
                document.getElementById('rumus-utama').textContent = data.utama;
                document.getElementById('rumus-syarat').textContent = data.syarat;
                document.getElementById('rumus-box').classList.add('show');
                document.getElementById('rumus-placeholder').style.display = 'none';
            }
            document.getElementById('area-soal').classList.remove('show');
            document.getElementById('hasil-cek').className = 'hasil-cek';
            batalKotak();
        }

        function toggleDD() {
            document.getElementById('dd-btn').classList.toggle('open');
            document.getElementById('dd-list').classList.toggle('show');
        }

        // fungsi pilih()
        function pilih(el, nama, warna) {
            warnaAktif = warna;
            document.getElementById('dd-label').textContent = nama;
            document.getElementById('btn-dot').style.background = warna;
            document.querySelectorAll('.dd-item').forEach(i => i.classList.remove('selected'));
            el.classList.add('selected');
            document.getElementById('dd-btn').classList.remove('open');
            document.getElementById('dd-list').classList.remove('show');
        }

        // Fungsi mulai()
        function mulai() {
            const sifat = document.getElementById('menu1').value;
            const warnaNama = document.getElementById('dd-label').textContent;

            if (!sifat) { alert('Silakan pilih Sifat Eksponen terlebih dahulu!'); return; }
            if (warnaNama === '-- Pilih Warna --') { alert('Silakan pilih Warna terlebih dahulu!'); return; }

            const soal = dataSoal[sifat];
            document.getElementById('soal-badge').textContent = dataRumus[sifat].judul;
            document.getElementById('soal-teks').textContent = soal.teks;

            const areaKotak = document.getElementById('area-kotak');
            areaKotak.innerHTML = '';

            soal.baris.forEach((baris, idx) => {
                if (idx > 0) {
                    const garis = document.createElement('hr');
                    garis.className = 'divider';
                    areaKotak.appendChild(garis);
                }
                const label = document.createElement('div');
                label.className = 'baris-label';
                label.textContent = baris.label;
                areaKotak.appendChild(label);

                const barisDiv = document.createElement('div');
                barisDiv.className = 'baris-kotak';

                for (let i = 0; i < baris.jumlah; i++) {
                    const kotak = document.createElement('div');
                    kotak.className = 'kotak';
                    kotak.dataset.baris = idx;

                    const lingkaran = document.createElement('div');
                    lingkaran.className = 'lingkaran';
                    lingkaran.style.background = warnaAktif;

                    kotak.appendChild(lingkaran);
                    kotak.addEventListener('click', function () {
                        this.classList.toggle('aktif');
                    });
                    barisDiv.appendChild(kotak);
                }
                areaKotak.appendChild(barisDiv);
            });

            document.getElementById('hasil-cek').className = 'hasil-cek';
            document.getElementById('area-soal').classList.add('show');
            document.getElementById('area-soal').scrollIntoView({ behavior: 'smooth' });
        } 

        function cekJawaban() {
            const sifat = document.getElementById('menu1').value;
            const soal = dataSoal[sifat];
            const hasilEl = document.getElementById('hasil-cek');

            let semuaBenar = true;
            soal.baris.forEach((baris, idx) => {
                const jumlahIsi = document.querySelectorAll(`.kotak[data-baris="${idx}"].aktif`).length;
                if (jumlahIsi !== baris.jawaban) semuaBenar = false;
            });

            if (semuaBenar) {
                hasilEl.className = 'hasil-cek benar';
                hasilEl.textContent = '' + soal.keterangan;
            } else {
                hasilEl.className = 'hasil-cek salah';
                hasilEl.textContent = '❌ Belum tepat';
            }
        }

        function batalKotak() {
            document.querySelectorAll('.kotak').forEach(k => k.classList.remove('aktif'));
            document.getElementById('hasil-cek').className = 'hasil-cek';
        }

        document.addEventListener('click', function (e) {
            if (!document.getElementById('dd').contains(e.target)) {
                document.getElementById('dd-btn').classList.remove('open');
                document.getElementById('dd-list').classList.remove('show');
            }
        });