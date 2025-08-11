
        const display = document.getElementById('display');
        const buttons = document.querySelectorAll('.calculator-grid button');
        let currentInput = '';
        let result = '';

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.dataset.value;
                handleInput(value);
            });
        });

        function handleInput(value) {
            // Handle the clear button
            if (value === 'C') {
                currentInput = '';
                result = '';
                display.textContent = '0';
                return;
            }

            // Handle the equals button
            if (value === '=') {
                try {
                    // Using eval() for simplicity in this basic example.
                    // WARNING: In production code, eval() can be a security risk.
                    // For a more robust calculator, a custom parsing engine is recommended.
                    if (currentInput === '') return;
                    result = eval(currentInput);
                    display.textContent = result;
                    currentInput = result.toString(); // Set the result as the new input
                } catch (error) {
                    display.textContent = 'Error';
                    currentInput = '';
                }
                return;
            }

            // Handle number and operator inputs
            if (display.textContent === '0' || display.textContent === 'Error') {
                display.textContent = '';
            }

            // Check for multiple operators in a row
            const lastChar = currentInput.slice(-1);
            const isLastCharOperator = ['+', '-', '*', '/'].includes(lastChar);
            const isNewCharOperator = ['+', '-', '*', '/'].includes(value);
            
            if (isLastCharOperator && isNewCharOperator) {
                // If the last character is an operator and the new one is too,
                // replace the last one instead of appending.
                currentInput = currentInput.slice(0, -1) + value;
            } else {
                currentInput += value;
            }
            display.textContent = currentInput;
        }

        // Add keyboard support
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            if (key >= '0' && key <= '9' || key === '.') {
                handleInput(key);
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                handleInput(key);
            } else if (key === 'Enter' || key === '=') {
                handleInput('=');
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                handleInput('C');
            } else if (key === 'Backspace') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            }
        });
  