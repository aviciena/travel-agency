'use client'

import { Box } from "@mui/material";
import styles from './tnc.module.css'

export default function Tnc() {
  return (
    <Box>
      <div className={`${'blue-text'} ${styles.title}`}>SYARAT & KETENTUAN RESERVASI ONLINE TRAVEL AGENCY</div>
      <Box className={`${styles.tncContainer} ${styles.card}`}>
        <Box className={styles.tncBody}>
          <p><strong>SYARAT & KETENTUAN PENUMPANG</strong></p>
          <ol className={styles.tncOl}>
            <li>
              <b>
                Penumpang hadir 15 menit sebelum waktu keberangkatan, apabila Ada kendala atau perubahan hubungi Call Center Travel Agency telpon (0562) 123 1652/WA 0812-9872-92836
              </b>
            </li>
            <li>
              <b>
                {'Anak umur >2 tahun atau tinggi badan lebih 90cm wajib akan dikenakan 1 tiket penuh'}
              </b>
            </li>
            <li>
              <b>
                {'Penumpang yang membawa barang dengan ukuran berlebihan akan dikenakan biaya bagasi sesuai harga paket yang berlaku (Penumpang hanya diperbolehkan membawa 1 tas ransel dan 1 koper ukuran 24 inch/ (P 43x L 23x T 63 cm) maks 7Kg)'}
              </b>
            </li>
            <li>
              <b>
                Untuk barang-barang berharga, mudah rusak dan pecah, dilarang dimasukkan di dalam bagasi
              </b>
            </li>
            <li>
              <b>
                Kehilangan/rusak/tertukar barang sepenuhnya merupakan tanggung jawab dari penumpang (di outlet/di dalam bagasi mobil)
              </b>
            </li>
            <li>
              <b>
                Dilarang membawa binatang/hewan peliharaan walaupun dengan kandang, terkecuali ikan hidup/hias yang sudah di packing dengan semestinya
              </b>
            </li>
            <li>
              <b>
                Dilarang membawa/mengkonsumsi makanan dengan bau menyengat di dalam kendaraan
              </b>
            </li>
            <li>
              <b>
                Tiket yang sudah di bayar/di beli tidak bisa di kembalikan uang (Hanya pindah hari,(non promo), jam dan tujuan, maksimal 1 bulan dari jadwal awal keberangkatan, itupun jika tiket yang sudah dibayar belum melewati jadwal keberangkatan
              </b>
            </li>
            <li>
              <b>
                Penumpang usia di bawah 17 tahun harus dengan pengawasan orang tua dan wajib lapor ke operator
              </b>
            </li>
          </ol>
          <Box sx={{ margin: '1.5rem 0' }}>
            <strong>KEBIJAKAN RESCHEDULE TRAVEL AGENCY</strong>
          </Box>
          <ol className={styles.tncOl}>
            <li>
              Perubahan jadwal hanya berlaku tiket normal (Tidak berlaku untuk tiket Promo)
            </li>
            <li>
              Untuk Perubahan jadwal, hubungi Call Center Travel Agency Telpon (0562) 123 1652/WA 0812-9872-92836
            </li>
            <li>
              Perubahan jadwal bisa di lakukan paling lambat 2 jam sebelum jam keberangkatan
            </li>
          </ol>
        </Box>
      </Box>
    </Box>
  );
}