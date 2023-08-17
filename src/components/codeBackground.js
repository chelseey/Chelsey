import React, { useEffect, useState, useRef } from 'react';
import { fetchAndDisplayCode } from '../utils/fetchCode.js';
import Typed from 'typed.js';
import { animate } from 'framer-motion';

import "../css/dracula-prism.css";

const CodeBackground = ({ pathToFile }) => {
    const [highlightedCode, setHighlightedCode] = useState('');
    const [lineNumbers, setLineNumbers] = useState('');
    const codeContainerRef = useRef(null);

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

            const handleScroll = () => {
                const container = codeContainerRef.current;
                const contentHeight = container.scrollHeight;
                const visibleHeight = container.offsetHeight;

                if (contentHeight > visibleHeight) {
                    const scrollAmount = container.scrollTop + 30; // Smooth scrolling instead of jumping to the end

                    animate(container.scrollTop, scrollAmount, {
                        duration: 0.5,
                        onUpdate(value) {
                            container.scrollTop = value;
                        },
                    });
                }
            };

            // Start with the first line number
            document.querySelector('.line-numbers').textContent = '1';

            const codeTyped = new Typed('.language-javascript code', codeOptions);

            const observer = new MutationObserver(() => {
                const typedContent = document.querySelector('.language-javascript code').textContent;
                const typedLines = typedContent.split('\n').length;
                const currentLineNumbers = document.querySelector('.line-numbers').textContent.split('\n').length;

                if (typedLines > currentLineNumbers) {
                    for (let i = currentLineNumbers + 1; i <= typedLines; i++) {
                        document.querySelector('.line-numbers').textContent += '\n' + i;
                    }
                    handleScroll();  // Only scroll when new line is added
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
        <div id="code-background" ref={codeContainerRef}>
            <pre className="line-numbers"></pre>
            <pre className="language-javascript">
                <code className="language-javascript"></code>
            </pre>
        </div>
    );
}

export default CodeBackground;
