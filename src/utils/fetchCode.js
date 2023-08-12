import Prism from "prismjs";
import "../css/dracula-prism.css";

export const fetchAndDisplayCode = (pathToFile) => {
    return fetch(`https://raw.githubusercontent.com/chelseey/chelsey/main/src/components/codeBackground.js`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Network response was not ok");
          }
          return response.text();
      })
      .then(text => {
          // Use Prism.js to highlight the code
          return Prism.highlight(text, Prism.languages.javascript, 'javascript');  
      })
      .catch(error => {
          console.error("There was a problem with the fetch operation:", error.message);
      });
}