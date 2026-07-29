/* Global Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

/* Body */
body {
    background: linear-gradient(135deg, #1f1c2c, #928DAB);
    color: white;
    line-height: 1.6;
    font-size: 18px;
}

/* Header */
header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    background: rgba(0, 0, 0, 0.7);
}

.logo {
    font-size: 2rem;
    font-weight: bold;
    color: #00FFFF;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 1rem;
}

* Navbar */
.navbar ul {
    display: flex;
    gap: 22px;
    list-style-type: none; /* Removes bullets */
    padding: 0;
    margin: 0;
}

.navbar ul li {
    display: inline-block;
}

.navbar ul li a {
    color: #fff;
    font-size: 1.2rem;
    text-transform: uppercase;
    text-decoration: none; /* Removes underline */
    transition: color 0.3s ease;
}

.navbar ul li a:hover {
    color: #ffa500;
}

/* Hero Section */
.hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5rem 2rem;
    background: #0f0c29;
}

.hero-content {
    max-width: 500px;
    text-align: left;
}

.hero-content h1 {
    font-size: 3.5rem;
    color: #FFD700;
    animation: fadeIn 2s ease-in-out;
}

.hero-content p {
    font-size: 1.2rem;
    color: #d3d3d3;
    margin-top: 20px;
    animation: fadeIn 2s ease-in-out;
}

.hero-image img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    box-shadow: 0px 0px 20px rgba(0, 255, 255, 0.6);
    animation: pulse 3s infinite;
}

/* Hero Section Animation */
@keyframes pulse {
    0% {
        transform: scale(1);
    }
