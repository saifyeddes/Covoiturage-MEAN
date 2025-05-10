
        document.addEventListener('DOMContentLoaded', function() {
            // Animation for radio cards
            const radioCards = document.querySelectorAll('.radio-card');
            radioCards.forEach(card => {
                const radioInput = card.querySelector('input[type="radio"]');
                
                radioInput.addEventListener('change', function() {
                    radioCards.forEach(c => c.classList.remove('selected'));
                    if (this.checked) {
                        card.classList.add('selected');
                    }
                });
                
                // Add hover effect
                card.addEventListener('mouseenter', function() {
                    if (!radioInput.checked) {
                        card.classList.add('border-indigo-200');
                    }
                });
                
                card.addEventListener('mouseleave', function() {
                    if (!radioInput.checked) {
                        card.classList.remove('border-indigo-200');
                    }
                });
            });
            
            // Form submission
            const registerForm = document.getElementById('registerForm');
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const formData = new FormData(registerForm);
                const userData = {
                    userType: formData.get('userType'),
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    phone: formData.get('phone'),
                    terms: formData.get('terms')
                };
                
                // Here you would typically send the data to your backend
                console.log('Form submitted:', userData);
                
                // Show success message (in a real app, you would redirect or show a proper message)
                alert(`Inscription réussie! Bienvenue ${userData.name} en tant que ${userData.userType === 'driver' ? 'conducteur' : 'passager'}.`);
                
                // Reset form
                registerForm.reset();
                radioCards.forEach(c => c.classList.remove('selected'));
            });
            
            // Add animation delays to form elements
            const formElements = registerForm.querySelectorAll('div');
            formElements.forEach((el, index) => {
                el.style.animationDelay = `${0.2 + index * 0.1}s`;
                el.classList.add('animate-fade-in');
            });
        });
