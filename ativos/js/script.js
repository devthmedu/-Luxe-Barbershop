document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os botões "Agende Agora"
    const appointmentButtons = document.querySelectorAll('.price-card .btn');

    // Selecionar o modal e o botão para fechar o modal
    const modal = document.getElementById('modal');
    const closeModalButton = document.querySelector('.close');

    // Abrir o modal ao clicar em "Agende Agora"
    appointmentButtons.forEach(button => {
        button.addEventListener('click', () => {
            openModal();
        });
    });

    // Fechar o modal ao clicar no botão de fechar (×)
    closeModalButton.addEventListener('click', () => {
        closeModal();
    });

    // Fechar o modal ao clicar fora da área do modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Manipular o envio do formulário de agendamento
    const appointmentForm = document.getElementById('appointment-form');
    appointmentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const selectedProfessional = document.getElementById('professional').value;
        const selectedTime = document.getElementById('time').value;

        // Exemplo simples de mensagem de alerta
        alert(`Horário agendado com ${selectedProfessional} às ${selectedTime}`);

        // Fechar o modal após o agendamento
        closeModal();
    });

    // Função para abrir o modal
    function openModal() {
        modal.style.display = 'block';
    }

    // Função para fechar o modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Função para rolar até o topo da página
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Selecionar todos os links de navegação interna no cabeçalho
    const internalLinks = document.querySelectorAll('.header a[href^="#"]');

    // Adicionar evento de clique para rolar suavemente até a seção correspondente
    internalLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Selecionar o botão flutuante para rolar suavemente ao topo da página
    const floatingButton = document.querySelector('.floating-button');

    // Adicionar evento de clique para rolar suavemente ao topo da página
    floatingButton.addEventListener('click', () => {
        scrollToTop();
    });

    // Selecionar o botão do WhatsApp e adicionar atributos para abrir em nova aba
    const whatsappButton = document.querySelector('.whatsapp-button');
    whatsappButton.setAttribute('target', '_blank');
    whatsappButton.setAttribute('rel', 'noopener noreferrer');

    // Selecionar o botão hamburguer
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // Evento de clique no botão hamburguer
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });

    // Fechar o menu mobile ao clicar no ícone de fechar (×)
    const closeMenu = document.getElementById('close');
    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
    });

    // Fechar o menu mobile ao clicar em qualquer parte fora dele
    window.addEventListener('click', function(event) {
        if (event.target !== menuToggle && event.target !== mobileMenu && !mobileMenu.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // Inicializar o calendário
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        selectable: true,
        dateClick: function(info) {
            alert('Data selecionada: ' + info.dateStr);
            // Aqui você pode fazer algo com a data selecionada, como preencher um campo no formulário
        }
    });
    calendar.render();

    // Configuração do Firebase
    var firebaseConfig = {
        apiKey: "SUA_API_KEY",
        authDomain: "SEU_DOMINIO.firebaseapp.com",
        databaseURL: "https://SEU_DOMINIO.firebaseio.com",
        projectId: "SEU_PROJECT_ID",
        storageBucket: "SEU_BUCKET.appspot.com",
        messagingSenderId: "SEU_SENDER_ID",
        appId: "SEU_APP_ID"
    };
    // Inicialize o Firebase
    firebase.initializeApp(firebaseConfig);

    var form = document.getElementById('appointment-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var professional = form.professional.value;
        var time = form.time.value;
        var date = calendar.getDate(); // Suponha que você tenha uma variável 'calendar' para acessar a data selecionada

        // Salvar os dados no Firebase
        var appointmentsRef = firebase.database().ref('agendamentos');
        appointmentsRef.push({
            professional: professional,
            time: time,
            date: date.toISOString() // Salve a data como ISO string para facilitar o manuseio
        }).then(function() {
            alert('Agendamento realizado com sucesso!');
            // Aqui você pode adicionar lógica para fechar o modal ou limpar o formulário
            closeModal();
            form.reset();
        }).catch(function(error) {
            console.error('Erro ao agendar:', error);
            alert('Ocorreu um erro ao agendar. Por favor, tente novamente.');
        });
    });
});