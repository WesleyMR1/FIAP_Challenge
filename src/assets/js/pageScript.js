// pageScript.js

document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('a[data-page]');
    
    
    // Função para carregar o conteúdo
    function loadContent(page) {
        fetch(`/src/assets/pages/${page}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar a página: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;
                updateActiveLink(page);
                // Aqui você pode adicionar quaisquer scripts específicos para a página carregada
            }).then(() => {
                document.getElementById("titulo").textContent = `${page}`;
            })
            .catch(error => {
                contentDiv.innerHTML = `<p class="text-danger">Ocorreu um erro ao carregar o conteúdo.</p>`;
                console.error(error);
            });
    }


    
    // Função para atualizar o link ativo na navegação
    function updateActiveLink(activePage) {
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === activePage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Adiciona event listeners aos links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            const page = link.getAttribute('data-page');
            loadContent(page);
        });
    });

    
    // Carrega o conteúdo inicial (Painel Financeiro)
    loadContent('PainelFinanceiro');
});

function selectNavItem(element) {
    // Remove a classe 'nav-bar-active' de todos os itens
    var items = document.querySelectorAll('.nav-item');
    items.forEach(function(item) {
        item.classList.remove("border-bottom","border-2");
    });

    // Adiciona a classe 'nav-bar-active' ao item clicado
    element.classList.add("border-bottom","border-2");
}



