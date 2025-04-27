fetch('./images.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.getElementById('gallery');

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <a href="${item.url}">
                    <img src="${item.src}" alt="${item.title}">
                </a>
                <h3>${item.title}</h3>
                <p>${item.info}</p>
            `;

            gallery.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading images:', error)); 
