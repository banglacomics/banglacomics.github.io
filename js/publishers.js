const publisherGrid = document.getElementById('publisherGrid');

PUBLISHERS.forEach((publisher, index) => {
    const card = document.createElement('a');
    card.className = 'publisher-card';
    card.href = `publishers/${publisher.slug}.html`;

    const media = publisher.icon
        ? `
            <div class="publisher-card-media publisher-card-media-image" style="background-image: url('${publisher.icon}')"></div>
        `
        : `
            <div class="publisher-card-media publisher-card-media-fallback" lang="bn">
                <span class="publisher-card-monogram">${publisher.monogram}</span>
            </div>
        `;

    card.innerHTML = `
        ${media}
        <h2 class="publisher-card-title" lang="bn">${publisher.name}</h2>
       <!-- <span class="publisher-card-cta" lang="bn">সংগ্রহ দেখুন</span> -->
    `;

    publisherGrid.appendChild(card);
});
