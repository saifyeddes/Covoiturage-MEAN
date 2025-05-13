
        // Simple insurance toggle
        document.getElementById('insurance').addEventListener('change', function() {
            const totalElement = document.querySelector('.text-xl.font-bold.text-purple-600');
            let total = 30.50;
            
            if (this.checked) {
                total += 2.50;
            }
            
            totalElement.textContent = total.toFixed(2) + ' €';
        });
