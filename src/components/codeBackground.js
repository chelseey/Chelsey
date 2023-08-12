import React, { useEffect, useState } from 'react';
import { fetchAndDisplayCode } from '../utils/fetchCode.js';
import Typed from 'typed.js';

import "../css/dracula-prism.css";

const CodeBackground = ({ pathToFile }) => {
    const [highlightedCode, setHighlightedCode] = useState('');
    const [lineNumbers, setLineNumbers] = useState('');

    useEffect(() => {
        fetchAndDisplayCode(pathToFile).then(code => {
            setHighlightedCode(code);
            const numbers = Array.from({ length: code.split('\n').length }, (_, i) => i + 1).join('\n');
            setLineNumbers(numbers);
        });
    }, [pathToFile]);

    useEffect(() => {
        if (highlightedCode && lineNumbers) {
            const codeOptions = {
                strings: [highlightedCode],
                typeSpeed: 30,
                showCursor: true,
                contentType: 'html',
            };
    
            // Start with the first line number
            document.querySelector('.line-numbers').textContent = '1';
    
            const codeTyped = new Typed('.language-javascript code', codeOptions);
    
            // Observe the content of our code box
            const observer = new MutationObserver(() => {
                const typedContent = document.querySelector('.language-javascript code').textContent;
                const typedLines = typedContent.split('\n').length;
                const currentLineNumbers = document.querySelector('.line-numbers').textContent.split('\n').length;
    
                if (typedLines > currentLineNumbers) {
                    for (let i = currentLineNumbers + 1; i <= typedLines; i++) {
                        document.querySelector('.line-numbers').textContent += '\n' + i;
                    }
                }
            });
    
            const config = { childList: true, characterData: true, subtree: true };
            observer.observe(document.querySelector('.language-javascript code'), config);
    
            return () => {
                codeTyped.destroy();
                observer.disconnect();
            };
        }
    }, [highlightedCode, lineNumbers]);
    
    
    
    

    return (
        <div id="code-background">
            <pre className="line-numbers"></pre>
            <pre className="language-javascript">
                <code className="language-javascript"></code>
            </pre>
        </div>
    );
}

export default CodeBackground;
