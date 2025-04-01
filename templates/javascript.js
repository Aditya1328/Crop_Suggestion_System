async function makePrediction() {
    const formData = {
        N: document.getElementById('N').value,
        P: document.getElementById('P').value,
        K: document.getElementById('K').value,
        temperature: document.getElementById('temperature').value,
        humidity: document.getElementById('humidity').value,
        ph: document.getElementById('ph').value,
        rainfall: document.getElementById('rainfall').value
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('result').innerText = `Prediction: ${result.prediction}`;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('result').innerText = "An error occurred. Please try again.";
    }
}

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Image Lightbox Effect
document.querySelectorAll('.gallery .images img, .Crops img').forEach(img => {
    img.addEventListener('click', function () {
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        const enlargedImg = document.createElement('img');
        enlargedImg.src = this.src;
        enlargedImg.style.width = '80%';
        enlargedImg.style.maxWidth = '600px';
        enlargedImg.style.border = '5px solid #FFD700';
        enlargedImg.style.borderRadius = '10px';

        modal.appendChild(enlargedImg);
        document.body.appendChild(modal);

        modal.addEventListener('click', function () {
            document.body.removeChild(modal);
        });
    });
});

// Form Validation for Crop Prediction
document.getElementById('predictionForm').addEventListener('submit', function (e) {
    const inputs = this.querySelectorAll('input');
    let valid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            valid = false;
            input.style.border = '2px solid red';
        } else {
            input.style.border = '2px solid green';
        }
    });

    if (!valid) {
        e.preventDefault();
        alert('Please fill in all fields correctly.');
    }
});

// Back-to-Top Button
const topButton = document.createElement('button');
topButton.innerText = '⬆ Back to Top';
topButton.style.position = 'fixed';
topButton.style.bottom = '20px';
topButton.style.right = '20px';
topButton.style.padding = '10px 15px';
topButton.style.backgroundColor = '#FFD700';
topButton.style.color = '#013220';
topButton.style.border = 'none';
topButton.style.borderRadius = '5px';
topButton.style.cursor = 'pointer';
topButton.style.display = 'none';
topButton.style.fontWeight = 'bold';

document.body.appendChild(topButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        topButton.style.display = 'block';
    } else {
        topButton.style.display = 'none';
    }
});

topButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animated Text Effect for Headings
document.querySelectorAll('h2').forEach(h2 => {
    h2.style.opacity = '0';
    h2.style.transform = 'translateY(20px)';
    h2.style.transition = 'all 0.5s ease-in-out';
});

window.addEventListener('scroll', () => {
    document.querySelectorAll('h2').forEach(h2 => {
        const rect = h2.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            h2.style.opacity = '1';
            h2.style.transform = 'translateY(0)';
        }
    });
});
   
    let slideIndex = 0; 
    const slides = document.querySelector(".slides");
    const totalSlides = document.querySelectorAll(".slides img").length;
    
    function showSlide(index) {
        if (index >= totalSlides) { slideIndex = 0; } 
        else if (index < 0) { slideIndex = totalSlides - 1; }
        
        // Fix: Move entire image width (100vw) instead of fixed pixels
        slides.style.transform = `translateX(${-slideIndex * 100}vw)`;
    }
    
    function nextSlide() {
        slideIndex++;
        showSlide(slideIndex);
    }
    
    function prevSlide() {
        slideIndex--;
        showSlide(slideIndex);
    }
    
    function autoSlide() {
        nextSlide();
        setTimeout(autoSlide, 3000);
    }
    
    // Start auto sliding
    setTimeout(autoSlide, 3000);