fetch('../data/cc_data')
    .then(response => response.text())
    .then(encodedData => {
        const decodedData = decodeURIComponent(escape(window.atob(encodedData)));
        const data = JSON.parse(decodedData);
        const gallery = document.getElementById('gallery');
        const typeFilter = document.getElementById('typeFilter');
        const modal = document.getElementById('modal');
        const closeModal = document.getElementById('closeModal');
        const modalImg = document.getElementById('modalImg');
        const modalTitle = document.getElementById('modalTitle');
        const modalInfo = document.getElementById('modalInfo');
        const modalStories = document.getElementById('modalStories');

        // Build unique set of all types from comma-separated strings
        const allTypes = new Set();
        data.forEach(item => {
            item.type.split(',').forEach(t => allTypes.add(t.trim()));
        });

        allTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeFilter.appendChild(option);
        });

        function renderGallery(filter = 'all') {
            gallery.innerHTML = '';
            const filteredData = filter === 'all' 
                ? data 
                : data.filter(item => 
                    item.type.split(',').map(t => t.trim()).includes(filter)
                  );

            filteredData.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.cursor = 'pointer';

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

                card.addEventListener('click', () => {
                    modalImg.src = item.src;
                    modalTitle.textContent = item.title;
                    modalInfo.textContent = item.info;
                    modalStories.innerHTML = '';

                    item.story.split(',').forEach(story => {
                        const li = document.createElement('li');
                        li.textContent = story.trim();
                        modalStories.appendChild(li);
                    });

                    modal.style.display = 'flex';
                });

                gallery.appendChild(card);
            });
        }

        closeModal.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (e) => {
            if (e.target == modal) modal.style.display = 'none';
        };

        typeFilter.addEventListener('change', () => {
            renderGallery(typeFilter.value);
        });

        //renderGallery(); // Initial display

        // Helper to get filter from URL
        function getFilterFromPath() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('filter') || 'all';
        }

        // Apply filter from path if exists
        const initialFilter = getFilterFromPath();

        // Wait for dropdown to be populated before setting value
        typeFilter.value = initialFilter;
        renderGallery(initialFilter);
    })
    .catch(error => console.error('Error loading data:', error));
