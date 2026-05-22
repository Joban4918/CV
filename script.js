// Typing animation
const words = ["Joban   "];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {
    currentWord = words[i];
    if (isDeleting) {
        document.querySelector(".typing").textContent = currentWord.substring(0, j-1);
        j--;
        if (j == 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
        }
    } else {
        document.querySelector(".typing").textContent = currentWord.substring(0, j+1);
        j++;
        if (j == currentWord.length) {
            isDeleting = true;
            setTimeout(() => {}, 1500);
        }
    }
    setTimeout(typeEffect, 150);
}
typeEffect();

// Cursor glow effect
const cursor = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 15 + "px";
    cursor.style.top = e.clientY - 15 + "px";
});

// Theme toggle
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    toggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// Smooth scroll for nav links
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        if (link.getAttribute("href") === "#") return;
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
        document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
        link.classList.add("active");
    });
});


// Small easter egg: click on the motto
document.querySelector(".money-motto")?.addEventListener("click", () => {
    alert("💰 You clicked the money motto. Good. I like your style. 💰");
});
// Web3Forms submission handling
const web3form = document.getElementById('web3form');
const formStatus = document.getElementById('form-status');

if (web3form) {
    web3form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        formStatus.innerHTML = '<span style="color: var(--purple-light);">⏳ Sending message...</span>';
        
        const formData = new FormData(web3form);
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                formStatus.innerHTML = '<span style="color: #4ade80;">✅ Message sent successfully! I\'ll get back to you soon.</span>';
                web3form.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            } else {
                formStatus.innerHTML = '<span style="color: #f87171;">❌ Something went wrong. Please try again or email me directly.</span>';
            }
        } catch (error) {
            formStatus.innerHTML = '<span style="color: #f87171;">❌ Error sending message. Please email me directly at jobanrai636@gmail.com</span>';
        }
    });
}
