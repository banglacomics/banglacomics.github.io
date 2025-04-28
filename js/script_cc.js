function decodeBase64Unicode(str) {
    // Fix: Replace URL-safe characters if necessary (optional step if your Base64 is standard)
    str = str.replace(/-/g, '+').replace(/_/g, '/');

    // Fix: Add missing padding (if needed)
    while (str.length % 4 !== 0) {
        str += '=';
    }

    // Decode base64 and then URI-decode
    try {
        return decodeURIComponent(
            Array.prototype.map.call(atob(str), function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join('')
        );
    } catch (e) {
        console.error("Decoding error:", e);
        return null;
    }
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
