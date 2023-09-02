document.addEventListener("DOMContentLoaded", function () {
    const listKeranjang = document.getElementById("brgKeranjang");
    let keranjang = []; 
  
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        const catalog = document.getElementById("barang");
  
        data.forEach(barang => {
            const barangContainer = document.createElement("div");
            barangContainer.classList.add("barang-container");

          const barangToko = document.createElement("div");
          barangToko.classList.add("barang");
  
          const barangFoto= document.createElement("img");
          barangFoto.src = barang.image;
          barangFoto.alt = barang.name;
          barangFoto.style.maxWidth = "200px";
          barangFoto.style.maxHeight = "150px";

          const barangNama = document.createElement("h2");
          barangNama.textContent = barang.name;
  
          const barangHarga = document.createElement("p");
          barangHarga.textContent = "Harga: Rp " + formatRupiah(barang.price);
  
          const barangKuantitas = document.createElement("p");
       
  
          const inputKuantitas = document.createElement("input");
          inputKuantitas.type = "number";
          inputKuantitas.value = barang.quantity || 0;
          inputKuantitas.min = 0;
          inputKuantitas.dataset.productId = barang.id;
  
          const tambahButton = document.createElement("button");
          tambahButton.textContent = "+";
          tambahButton.classList.add("custom-button");
          tambahButton.addEventListener("click", () => {
            barang.quantity = (barang.quantity || 0) + 1;
            inputKuantitas.value = barang.quantity;
          });
  
          const kurangButton = document.createElement("button");
          kurangButton.textContent = "-";
          kurangButton.classList.add("custom-button");
          kurangButton.addEventListener("click", () => {
            if (barang.quantity > 0) {
              barang.quantity = (barang.quantity || 0) - 1;
              inputKuantitas.value = barang.quantity;
            }
          });
  
          const tambahBarangButton = document.createElement("button");
          tambahBarangButton.textContent = "Tambah Barang";
          tambahBarangButton.classList.add("custom-add")
          tambahBarangButton.addEventListener("click", () => {
            const quantity = parseInt(inputKuantitas.value);
            if (quantity > 0) {
              const cartItem = {
                id: barang.id,
                name: barang.name,
                price: barang.price,
                quantity: quantity,
                image: barang.image
              };
              keranjang.push(cartItem);
              updateKeranjangDisplay();
              console.log(`Menambahkan ${quantity} ${barang.name} ke keranjang.`);
            }

          });
  
          barangToko.appendChild(barangFoto);
          barangToko.appendChild(barangNama);
          barangToko.appendChild(barangHarga);
          barangKuantitas.appendChild(kurangButton);
          barangKuantitas.appendChild(inputKuantitas);
          barangKuantitas.appendChild(tambahButton);
          barangToko.appendChild(barangKuantitas);
          barangToko.appendChild(tambahBarangButton);

          barangContainer.appendChild(barangToko);
          catalog.appendChild(barangContainer);
        });
  
        function formatRupiah(angka) {
          return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
  
        function updateKeranjangDisplay() {
            listKeranjang.innerHTML = "";
            let subtotal = 0;
          
            keranjang.forEach(brg => {
              const listBarang = document.createElement("li");
              listBarang.classList.add("list-barang");
      
        // Buat elemen gambar
        const brgFoto = document.createElement("img");
        brgFoto.src = brg.image; // Menggunakan atribut gambar dari cartItem
        brgFoto.alt = brg.name;
        brgFoto.style.maxWidth = "50px"; // Sesuaikan ukuran gambar sesuai kebutuhan Anda
        brgFoto.style.maxHeight = "50px";
      
        // Tambahkan gambar ke dalam elemen list
        listBarang.appendChild(brgFoto);
      
        // Tambahkan teks informasi lainnya
        listBarang.innerHTML += `${brg.name} ${brg.quantity} x Rp ${formatRupiah(brg.price)} = Rp ${formatRupiah(brg.price * brg.quantity)}`;
        listKeranjang.appendChild(listBarang);
      
        subtotal += brg.price * brg.quantity;
            });
          
            const pajak = 0.11; 
            const totalPajak = subtotal * pajak;
            const total = subtotal + totalPajak;
          
            const subtotalElement = document.createElement("p");
            subtotalElement.textContent = `Total Pembelian: Rp ${formatRupiah(subtotal)}`;
            listKeranjang.appendChild(subtotalElement);

            const pajakElement = document.createElement("p");
            pajakElement.textContent = `Pajak (11%): Rp ${formatRupiah(totalPajak)}`;
            listKeranjang.appendChild(pajakElement);

            const totalElement = document.createElement("p");
            totalElement.textContent = `Total Bayar: Rp ${formatRupiah(total)}`;
            listKeranjang.appendChild(totalElement);
          }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  });
  