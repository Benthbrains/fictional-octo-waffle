document.addEventListener("DOMContentLoaded", () => {
    const subjectInput = document.getElementById("subject-input");
    const startSessionBtn = document.getElementById("start-session-btn");
    const summaryContainer = document.getElementById("summary-container");
    const summaryTitle = document.getElementById("summary-title");
    const summaryContent = document.getElementById("summary-content");

    // --- IMPORTANT: INSERT YOUR API KEY HERE ---
    // Replace "YOUR_API_KEY_HERE" with the key you have.
    // Do not share this key with anyone.
    const YOUR_API_KEY = "AIzaSyDRhxr9t_ocpplGeEHLoNg_uWly4gOJFRg"; // e.g., "AIzaSyDRhxr9t_ocpplGeEHLoNg_uWly4gOJFRg"

    startSessionBtn.addEventListener("click", async () => {
        const query = subjectInput.value;
        if (!query) {
            alert("Please enter a subject to learn about.");
            return;
        }

        try {
            // Display a loading message
            summaryTitle.textContent = `Searching for information on "${query}"...`;
            summaryContent.innerHTML = "";
            summaryContainer.style.display = "block";

            // For this example, we will assume you are using an API like Google's Generative AI
            // NOTE: The actual API endpoint and request structure will depend on your chosen provider.
            // This is a hypothetical example.

            // --- Step 1 & 2: Search and Summarize with a Generative AI API ---
            summaryTitle.textContent = `Summarizing information on "${query}"...`;

            // This is a hypothetical endpoint. You MUST check your API provider's documentation.
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AIzaSyDRhxr9t_ocpplGeEHLoNg_uWly4gOJFRg}`;

            const requestBody = {
                "contents": [{
                    "parts": [{
                        // The prompt instructs the AI to search for info and summarize it for a quick lesson
                        "text": `Please provide a summary of the most important information about "${query}". The summary should be easy to understand and designed to help someone learn the key points in less than 30 minutes. Focus on core concepts, definitions, and key takeaways.`
                    }]
                }]
            };

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                // Handle potential errors like a bad request or invalid API key
                const errorData = await response.json();
                throw new Error(errorData.error.message || "An API error occurred.");
            }

            const data = await response.json();

            // The path to the text might be different depending on the API. Check the documentation.
            // For Google's Generative AI, the path is often similar to this:
            const summary = data.candidates[0].content.parts[0].text;

            // --- Step 3: Display the Summary ---
            summaryTitle.textContent = `Learn about "${query}" in Under 30 Minutes`;
            // Using a library like 'marked' (https://marked.js.org/) can render Markdown for better formatting
            summaryContent.innerHTML = `<p>${summary.replace(/\n/g, '<br>')}</p>`; // Basic formatting

        } catch (error) {
            summaryTitle.textContent = "An error occurred";
            summaryContent.innerHTML = `<p>We were unable to fetch information. Please check your API key and the console for more details.</p>`;
            console.error(error);
        }
    });
});
