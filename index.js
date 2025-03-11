const fs = require('fs');
const readline = require('readline-sync');

const FILE_PATH = 'data.json';

// Fungsi untuk membaca database JSON
function readDatabase() {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
    }
    const data = fs.readFileSync(FILE_PATH);
    return JSON.parse(data);
}

// Fungsi untuk menulis ke database JSON
function writeDatabase(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// Fungsi untuk menampilkan semua item
function showAll() {
    const data = readDatabase();
    if (data.length === 0) {
        console.log("Database kosong.");
        return;
    }
    console.log("\nDaftar Item:");
    data.forEach((item, index) => {
        console.log(`${index + 1}. ${item.nama} - ${item.genre} - ${item.tahun}`);
    });
}

// Fungsi untuk menambahkan item baru
function addItem() {
    const nama = readline.question("Masukkan nama: ");
    const genre = readline.question("Masukkan genre: ");
    const tahun = readline.question("Masukkan tahun: ");

    const data = readDatabase();
    data.push({ nama, genre, tahun });
    writeDatabase(data);

    console.log("\nItem berhasil ditambahkan!\n");
}

// Fungsi untuk melihat satu item
function viewItem() {
    const data = readDatabase();
    if (data.length === 0) {
        console.log("Database kosong.");
        return;
    }
    const index = parseInt(readline.question("Masukkan nomor item: ")) - 1;
    if (index >= 0 && index < data.length) {
        console.log(`\nNama: ${data[index].nama}`);
        console.log(`Genre: ${data[index].genre}`);
        console.log(`Tahun: ${data[index].tahun}\n`);
    } else {
        console.log("Item tidak ditemukan.\n");
    }
}

// Fungsi untuk memperbarui item
function updateItem() {
    const data = readDatabase();
    if (data.length === 0) {
        console.log("Database kosong.");
        return;
    }
    const index = parseInt(readline.question("Masukkan nomor item yang ingin diperbarui: ")) - 1;
    if (index >= 0 && index < data.length) {
        data[index].nama = readline.question(`Nama baru (${data[index].nama}): `) || data[index].nama;
        data[index].genre = readline.question(`Genre baru (${data[index].genre}): `) || data[index].genre;
        data[index].tahun = readline.question(`Tahun baru (${data[index].tahun}): `) || data[index].tahun;
        writeDatabase(data);
        console.log("\nItem berhasil diperbarui!\n");
    } else {
        console.log("Item tidak ditemukan.\n");
    }
}

// Fungsi untuk menghapus item
function deleteItem() {
    const data = readDatabase();
    if (data.length === 0) {
        console.log("Database kosong.");
        return;
    }
    const index = parseInt(readline.question("Masukkan nomor item yang ingin dihapus: ")) - 1;
    if (index >= 0 && index < data.length) {
        console.log(`Item "${data[index].nama}" berhasil dihapus!\n`);
        data.splice(index, 1);
        writeDatabase(data);
    } else {
        console.log("Item tidak ditemukan.\n");
    }
}

// Menu utama
function main() {
    while (true) {
        console.log("\nMenu:");
        console.log("1. Lihat semua item");
        console.log("2. Tambah item baru");
        console.log("3. Lihat satu item");
        console.log("4. Perbarui item");
        console.log("5. Hapus item");
        console.log("6. Keluar");

        const choice = readline.question("Masukkan pilihan: ");

        if (choice === '1') {
            showAll();
        } else if (choice === '2') {
            addItem();
        } else if (choice === '3') {
            viewItem();
        } else if (choice === '4') {
            updateItem();
        } else if (choice === '5') {
            deleteItem();
        } else if (choice === '6') {
            console.log("Keluar...");
            break;
        } else {
            console.log("Pilihan tidak valid.");
        }
    }
}

// Jalankan program
main();
