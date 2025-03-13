document.addEventListener("DOMContentLoaded", function () {
    // Utility: Get URL parameters
    function getQueryParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Set couple names and guest name from URL or defaults
    document.getElementById('coupleNames').textContent = getQueryParameter('couple') || 'Recky & Mega';
    document.getElementById('guestName').textContent = getQueryParameter('guest') || 'Nama Tamu';

    // Invitation and Music Logic
    const openButton = document.getElementById('openButton');
    const invitationCover = document.getElementById('invitationCover');
    const invitationContent = document.getElementById('invitationContent');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const playPauseButton = document.getElementById('playPauseButton');
    const audioControls = document.getElementById('audioControl');
    let isPlaying = false;

    // Function to toggle play/pause for music
    function togglePlayPause() {
        if (isPlaying) {
            backgroundMusic.pause();
        } else {
            backgroundMusic.play();
        }
        isPlaying = !isPlaying;
        playPauseButton.src = isPlaying ? 'pause.png' : 'play-button.png';
    }

    // Event: Open invitation
    openButton.addEventListener('click', function () {
        invitationCover.style.display = 'none';
        invitationContent.style.display = 'block';
        audioControls.style.display = 'block'; // Show audio controls
        togglePlayPause();
    });

    // Event: Play/Pause music
    playPauseButton.addEventListener('click', togglePlayPause);

    lottie.loadAnimation({
        container: document.getElementById("birds-animation"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "birds.json" // Ganti dengan path file JSON animasi burung kamu
    });
    
    document.getElementById('goToSection3').addEventListener('click', function() {
        const section3 = document.getElementById('section3');
        if (section3) {
            section3.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    
    // Get the modal
    var modal1 = document.getElementById("myModal");

    // Get the modal content and caption
    var modalImg1 = document.getElementById("img01");
    var captionText1 = document.getElementById("caption");

    // Get navigation buttons
    var prevModalBtn1 = document.querySelector(".prev");
    var nextModalBtn1 = document.querySelector(".next");

    var images1 = document.querySelectorAll(".gallery img");
    var currentIndex1 = 0;

    // Function to open modal with specific image
    function openModal1(index1) {
        modal1.style.display = "block";
        modalImg1.src = images1[index1].src;
        captionText1.innerHTML = images1[index1].alt;
        currentIndex1 = index1;
    }

    // Loop through images and add click event
    images1.forEach((img1, index1) => {
        img1.onclick = function() {
            openModal1(index1);
        };
    });

    // Function to show next image
    nextModalBtn1.onclick = function() {
        currentIndex1 = (currentIndex1 + 1) % images1.length; // Loop back to first image
        openModal1(currentIndex1);
    };

    // Function to show previous image
    prevModalBtn1.onclick = function() {
        currentIndex1 = (currentIndex1 - 1 + images1.length) % images1.length; // Loop to last image
        openModal1(currentIndex1);
    };

    // Close modal when clicking the close button
    document.querySelector(".close").onclick = function() {
        modal1.style.display = "none";
    };

    // Countdown Timer Logic
    function calculateCountdown() {
        const weddingDate = new Date('2025-04-26T12:00:00');
        const currentDate = new Date();
        let timeRemaining = weddingDate - currentDate;

        if (timeRemaining <= 0) {
            clearInterval(intervalId);
            timeRemaining = 0;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    const intervalId = setInterval(calculateCountdown, 1000);
    calculateCountdown();

    // Copy Account Details Logic
    function copyAccountDetails(event) {
        const accountDetails = event.target.previousElementSibling.innerText;
        navigator.clipboard.writeText(accountDetails)
            .then(() => alert('Account details copied!'))
            .catch(err => console.error('Failed to copy: ', err));
    }

    document.querySelectorAll('.copyButton').forEach(button => {
        button.addEventListener('click', copyAccountDetails);
    });

    // Animation Observer
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    document.querySelectorAll('.fade-in, .fade-slide').forEach(element => observer.observe(element));

    const messageForm = document.getElementById('messageForm');

function getRelativeTime(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    const timeIntervals = [
        { label: 'tahun', seconds: 31536000 },
        { label: 'bulan', seconds: 2592000 },
        { label: 'hari', seconds: 86400 },
        { label: 'jam', seconds: 3600 },
        { label: 'menit', seconds: 60 },
        { label: 'detik', seconds: 1 }
    ];

    for (const interval of timeIntervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count > 0) {
            return `${count} ${interval.label} yang lalu`;
        }
    }
    return 'baru saja';
}

function loadMessages() {
    fetch('https://recky-dan-mega.glitch.me/messages')
        .then(response => response.json())
        .then(data => {
            const messageList = document.getElementById('messageList');
            if (messageList) {
                messageList.innerHTML = '';
                data.forEach(msg => {
                    const messageItem = document.createElement('div');
                    messageItem.classList.add('message');

                    const authorElement = document.createElement('div');
                    authorElement.classList.add('message-author');
                    authorElement.textContent = msg.name;

                    const timeElement = document.createElement('div');
                    timeElement.classList.add('message-time');
                    timeElement.textContent = getRelativeTime(msg.timestamp);

                    const contentElement = document.createElement('div');
                    contentElement.classList.add('message-content');
                    contentElement.textContent = msg.message;
                    
                    const bodyElement = document.createElement('div');
                    bodyElement.classList.add('message-body');
                    bodyElement.append(authorElement, timeElement, contentElement);

                    messageItem.appendChild(bodyElement);
                    messageList.appendChild(messageItem);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

if (messageForm) {
    messageForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('formGuestName').value;
        const message = document.getElementById('guestMessage').value;
        const timestamp = new Date().toISOString();

        fetch('https://recky-dan-mega.glitch.me/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, message, timestamp })
        })
            .then(response => response.json())
            .then(() => {
                loadMessages();
                messageForm.reset();
            })
            .catch(error => console.error('Error:', error));
    });
}

window.onload = loadMessages;

});
