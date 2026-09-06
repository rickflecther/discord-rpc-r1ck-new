const { Client } = require('discord.js-selfbot-v13');
const express = require('express');

const client = new Client({ checkUpdate: false });
const app = express();
const PORT = process.env.PORT || 3000;

// Web Server Sederhana (Mencegah Render Sleep & untuk UptimeRobot)
app.get('/', (req, res) => {
  res.send('Discord Rich Presence "r1ck" 24/7 is Active!');
});

app.listen(PORT, () => {
  console.log(`Web Server running on port ${PORT}`);
});

// Event Saat Bot/Akun Online
client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Menampilkan waktu mulai (untuk playtime)
  const startTime = Date.now();

  // Setting Status Rich Presence Kustom
  const setPresence = () => {
    client.user.setPresence({
      activities: [{
        name: "r1ck", // Nama/Judul aktivitas utama
        type: "PLAYING", // Tipe aktivitas (PLAYING, LISTENING, etc.)
        details: "r1ck", // Deskripsi Baris ke-1
        state: "Online 24/7", // Deskripsi Baris ke-2 (Bebas ubah teks ini)
        timestamps: { start: startTime }, // Menampilkan Durasi/Playtime
        assets: {
          // Link GIF Astolfo yang dimasukkan sebagai Large Image
          largeImage: "https://media.tenor.com/images/841e411b0231d686f030f06f52e5057a/tenor.gif", 
          largeText: "Astolfo ^_^", // Teks saat gambar di-hover
        },
        /* Jika ingin menambahkan tombol link, hapus komentar di bawah ini
        buttons: [
          { label: "Website", url: "https://yourwebsite.com" },
          { label: "Discord", url: "https://discord.gg/yourlink" }
        ]
        */
      }]
    });
  };

  // Jalankan fungsi setPresence sekali
  setPresence();
  
  console.log('Rich Presence Status for "r1ck" Successfully Deployed!');
});

// Login Menggunakan Token (Diambil dari Environment Variable di Render)
client.login(process.env.TOKEN);