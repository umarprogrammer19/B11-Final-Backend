const homePageUI = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ecommerce Backend Service</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        html {
            scroll-behavior: smooth;
        }
    </style>

</head>
<body class="bg-gray-100 font-sans scroll-smooth">
    <header class="bg-blue-600 text-white">
        <div class="container mx-auto px-4 py-6 flex justify-between items-center">
            <h1 class="text-2xl font-bold">UF-E-Commerce</h1>
            <nav>
                <ul class="flex space-x-4">
                    <li><a href="/" class="hover:underline">Home</a></li>
                    <li><a href="/api-docs" class="hover:underline">API Docs</a></li>
                    <li><a href="#features" class="hover:underline">Features</a></li>
                    <li><a href="#contact" class="hover:underline">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="bg-gradient-to-b from-blue-600 to-blue-400 text-white py-20">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-4xl md:text-5xl font-bold mb-6">Powerful Ecommerce Backend Solutions</h2>
                <p class="text-xl mb-8">Scale your online store with our robust and flexible API services</p>
                <a href="/api-docs" class="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold inline-flex items-center hover:bg-blue-50 transition-colors">
                    Explore API Docs
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </a>
            </div>
        </section>

        <section id="features" class="py-20">
            <div class="container mx-auto px-4">
                <h3 class="text-3xl font-bold text-center mb-12">Why Choose Our Backend?</h3>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <h4 class="text-xl font-semibold mb-2">Lightning Fast</h4>
                        <p class="text-gray-600">Optimized for speed and efficiency, ensuring quick response times for your customers.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <h4 class="text-xl font-semibold mb-2">Secure & Reliable</h4>
                        <p class="text-gray-600">Built with top-notch security measures to keep your data safe and your business running smoothly.</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <h4 class="text-xl font-semibold mb-2">Scalable Infrastructure</h4>
                        <p class="text-gray-600">Designed to grow with your business, from startup to enterprise-level operations.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-gray-200 py-20">
            <div class="container mx-auto px-4 text-center">
                <h3 class="text-3xl font-bold mb-8">Ready to Get Started?</h3>
                <p class="text-xl mb-8">Explore our comprehensive API documentation and integrate our powerful backend into your ecommerce platform today.</p>
                <a href="/api-docs" class="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center hover:bg-blue-700 transition-colors">
                    View API Documentation
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </a>
            </div>
        </section>
    </main>

    <footer id="contact" class="bg-gray-800 text-white ">
        <div class="container mx-auto px-4 pb-8">
            <div class="mt-8 pt-8 border-t border-gray-700 text-center">
                <p class="text-lg text-white">&copy; 2025 Hafiz Muhammad Umar Farooq. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>
`;

export default homePageUI;