let allComics = [];
let filteredComics = [];
let activeFilter = null;
let currentPage = 1;
const itemsPerPage = 30;
const lockedPublisher = document.body.dataset.publisher || null;
const publisherPaths = {
    "ডায়মন্ড কমিক্স": '../data/ccdata',
    "বিশ্বসাহিত্য চিত্রকথা": '../data/bisdata'
};

function decodeMojibake(value) {
   /* if (typeof value !== 'string') return value;
    try {
        return decodeURIComponent(escape(value));
    } catch {
        return value;
    }*/
	return value;
}

function normalizeComic(comic) {
    return {
        ...comic,
        publisher: decodeMojibake(comic.publisher || ''),
        type: decodeMojibake(comic.type || ''),
        title: decodeMojibake(comic.title || ''),
        isbn: decodeMojibake(comic.isbn || ''),
        stories: decodeMojibake(comic.stories || ''),
        characters: Array.isArray(comic.characters) ? comic.characters.map(decodeMojibake) : []
    };
}

async function loadData() {
    try {
		const url = publisherPaths[lockedPublisher] || '../data/daimond-comics.json';
        const response = await fetch(url);
        const rawData_encode = await response.text();
        const decodedData = decodeURIComponent(escape(window.atob(rawData_encode)));
        const rawData = JSON.parse(decodedData)
        allComics = rawData.map(normalizeComic);
        updateCurrentPublisherLabel(lockedPublisher);
        updatePageBrand(lockedPublisher);
        renderCategories();
        applyFilters();
    } catch (e) {
        console.error('JSON লোড করতে সমস্যা হয়েছে।');
    }
}

function updateCurrentPublisherLabel(publisher) {
    const label = document.getElementById('currentPublisherLabel');
    if (!label) return;
    label.textContent = ''/* ? ` প্রকাশক: ${publisher}` : '';*/
}

function updatePageBrand(publisher) {
    const title = document.getElementById('pageBrandTitle');
    if (!title || !publisher) return;
    title.textContent = publisher;
}

function renderCategories() {
    const container = document.getElementById('categoryContainer');
    container.innerHTML = '';

    const items = [...new Set(
        allComics
            .filter(c => !lockedPublisher || c.publisher === lockedPublisher)
            .flatMap(c => c.characters)
    )];

    items.sort().forEach(item => {
        if (!item) return;
        const btn = document.createElement('button');
        btn.className = `category-pill px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${activeFilter === item ? 'active' : ''}`;
        btn.innerText = item;
        btn.onclick = () => {
            activeFilter = activeFilter === item ? null : item;
            currentPage = 1;
            renderCategories();
            applyFilters();
        };
        container.appendChild(btn);
    });
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    filteredComics = allComics.filter(c => {
        const searchText = (c.title + c.stories + c.characters.join(' ') + c.isbn).toLowerCase();
        const matchesSearch = searchText.includes(searchTerm);
        const matchesPublisher = !lockedPublisher || c.publisher === lockedPublisher;
        const matchesCharacter = !activeFilter || c.characters.includes(activeFilter);
        return matchesSearch && matchesPublisher && matchesCharacter;
    });

    renderGrid();
}

function renderGrid() {
    const grid = document.getElementById('comicsGrid');
    grid.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filteredComics.slice(start, start + itemsPerPage);

    paginated.forEach(comic => {
        grid.innerHTML += `
            <div class="comic-card rounded-2xl overflow-hidden cursor-pointer" onclick="showDetails(${comic.id})">
                <div class="aspect-[2/3] overflow-hidden bg-slate-800">
                    <img src="${comic.coverThumb}" class="w-full h-full object-cover" alt="${comic.title}" onerror="this.src='https://via.placeholder.com/300x450?text=No+Image'">
                </div>
                <div class="p-4">
                    <h3 class="font-bold text-sm leading-tight mb-1 line-clamp-2">${comic.title}</h3>
                    ${comic.isbn?.trim() ? `<p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">${comic.isbn}</p>` : ''}
                </div>
            </div>
        `;
    });

    document.getElementById('pageInfo').innerText = `Page ${String(currentPage).padStart(2, '0')}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = start + itemsPerPage >= filteredComics.length;
}

function showDetails(id) {
    const comic = allComics.find(c => c.id === id);
    const content = document.getElementById('modalContent');
    const characters = comic.characters?.length ? comic.characters.join(', ') : 'তথ্য পাওয়া যায়নি';
    const isbnLabel = comic.isbn?.trim();

    const storyItems = comic.stories.trim()
        ? comic.stories.split(',').map(s => `<li class="story-item">${s.trim()}</li>`).join('')
        : `<li class="story-item story-empty">কোনো গল্পের তালিকা পাওয়া যায়নি</li>`;

    content.innerHTML = `
        <div class="modal-cover-panel w-full md:w-[31%]">
            <div class="modal-cover-frame">
                <img src="${comic.coverLarge}" class="w-full" onerror="this.src='https://via.placeholder.com/600x900?text=No+Large+Image'">
            </div>
        </div>
        <div class="modal-info-panel w-full md:w-[69%]">
            <div class="modal-head">
                <div class="modal-head-copy">
                    <p class="modal-publisher">${comic.publisher}</p>
                    <h2 class="modal-title">${comic.title}</h2>
                </div>
                ${isbnLabel ? `<span class="modal-isbn">${isbnLabel}</span>` : ''}
            </div>
            <div class="modal-meta-card">
                <p class="modal-label">প্রধান চরিত্র</p>
                <p class="modal-meta-value">${characters}</p>
            </div>
            <div class="modal-stories">
                <h4 class="modal-stories-title">
                    <span>বইয়ের ভেতরে থাকা গল্পসমূহ</span>
                </h4>
                <ul class="modal-story-list custom-scrollbar">
                    ${storyItems}
                </ul>
            </div>
        </div>
    `;

    document.getElementById('modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

document.getElementById('searchInput').oninput = () => {
    currentPage = 1;
    applyFilters();
};

document.getElementById('prevPage').onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        renderGrid();
        window.scrollTo(0, 0);
    }
};

document.getElementById('nextPage').onclick = () => {
    if ((currentPage * itemsPerPage) < filteredComics.length) {
        currentPage++;
        renderGrid();
        window.scrollTo(0, 0);
    }
};

document.getElementById('modal').onclick = (e) => {
    if (e.target.id === 'modal') closeModal();
};

loadData();
