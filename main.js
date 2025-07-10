function createReferenceCard(ref) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden';

    const image = document.createElement('img');
    image.src = ref.image || 'https://placehold.co/400x250/CCCCCC/333333?text=Sem+Imagem';
    image.alt = `Imagem de referência para ${ref.title}`;
    image.className = 'w-full h-48 object-cover rounded-t-xl';
    image.onerror = function () {
        this.src = 'https://placehold.co/400x250/CCCCCC/333333?text=Erro+ao+Carregar+Imagem';
    };

    const content = document.createElement('div');
    content.className = 'p-6';

    const title = document.createElement('h3');
    title.className = 'text-xl font-semibold text-gray-900 mb-2';
    title.textContent = ref.title;

    const authorYear = document.createElement('p');
    authorYear.className = 'text-gray-600 text-sm mb-2';
    authorYear.textContent = `${ref.author} (${ref.year})`;

    const description = document.createElement('p');
    description.className = 'text-gray-700 text-base mb-4';
    description.textContent = ref.description;

    const link = document.createElement('a');
    link.href = ref.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200';
    link.innerHTML = `Ver Fonte
        <svg class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-2a1 1 0 10-2 0v2H5V7h2a1 1 0 000-2H5z"></path>
        </svg>`;

    content.appendChild(title);
    content.appendChild(authorYear);
    content.appendChild(description);
    content.appendChild(link);

    card.appendChild(image);
    card.appendChild(content);

    return card;
}

function renderReferences() {
    const container = document.getElementById('references-container');
    const loadingMessage = document.getElementById('loading-message');
    loadingMessage.remove();

    if (!window.referencesData || window.referencesData.length === 0) {
        const noReferences = document.createElement('p');
        noReferences.className = 'col-span-full text-center text-gray-600';
        noReferences.textContent = 'Nenhuma referência encontrada.';
        container.appendChild(noReferences);
        return;
    }

    window.referencesData.forEach(ref => {
        const card = createReferenceCard(ref);
        container.appendChild(card);
    });
}

function loadReferences() {
    fetch('references-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados das referências.');
            }
            return response.json();
        })
        .then(data => {
            window.referencesData = data;
            renderReferences();
        })
        .catch(error => {
            console.error('Erro:', error);
            const container = document.getElementById('references-container');
            const loadingMessage = document.getElementById('loading-message');
            if (loadingMessage) loadingMessage.remove();
            const errorMessage = document.createElement('p');
            errorMessage.className = 'col-span-full text-center text-red-600';
            errorMessage.textContent = 'Erro ao carregar as referências. Tente novamente mais tarde.';
            container.appendChild(errorMessage);
        });
}

window.addEventListener('DOMContentLoaded', loadReferences);
