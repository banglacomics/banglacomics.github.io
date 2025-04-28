function decodeBase64Unicode(str) {
    // Decode Base64 to bytes
    const binaryString = atob(str);
    // Convert bytes to a properly escaped UTF-8 string
    const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0));
    const decoded = new TextDecoder('utf-8').decode(bytes);
    return decoded;
}

fetch('../data/cc_data')
    .then(response => response.text())  // Read as plain text
    .then(encodedData => {
        const decodedData = decodeBase64Unicode(encodedData);   // Decode Base64 string
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
