fetch('../data/cc_data')
    .then(response => response.text())  // Read as plain text
    .then(encodedData => {
        const decodedData = atob(encodedData);   // Decode Base64 string
        const data = JSON.parse(decodedData);     // Parse the JSON

        const gallery = document.getElementById('gallery');

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.title;

            const title = document.createElement('h2');
            title.textContent = item.title;

            const info = document.createElement('p');
            info.textContent = item.info;

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(info);

            gallery.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading data:', error));
