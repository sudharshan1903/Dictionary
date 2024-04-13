let mainHead = document.createElement("title");
document.head.append(mainHead);
mainHead.innerText = "Dictionary";

let mainDiv = document.createElement("div");
document.body.append(mainDiv);
mainDiv.classList.add("container");

// Container for search box
let searchContainer = document.createElement("div");
searchContainer.classList.add("mt-5", "mb-4");
mainDiv.appendChild(searchContainer);

let cardDict = `<div class="card">
    <div class="card-body">
        <div>English Dictionary</div>
        <input id="inputDict" type="text" name="dist" placeholder="Type a word">
        <div id="wordInput"></div>
        <button id="catchBtn" type="button" class="btn btn-primary mt-3">Search</button>
    </div>
</div>`;
searchContainer.innerHTML = cardDict;

// Container for displaying cards
let cardContainer = document.createElement("div");
cardContainer.classList.add("row");
mainDiv.appendChild(cardContainer);

let catchBtn = document.getElementById("catchBtn");
let inputDict = document.getElementById("inputDict");
let wordInput = document.getElementById("wordInput");

catchBtn.addEventListener('click', () => {
    let inputDictV = inputDict.value;
    if (inputDictV === "" || !isNaN(inputDictV)) {
        console.log("Invalid input: Please enter a non-empty and non-numeric value");
        wordInput.innerHTML = "Invalid input: Please enter a non-empty and non-numeric value";
        setTimeout(() => {
            wordInput.innerHTML = "";
            inputDict.value = "";
        }, 3000);
    } else {
        getData(inputDictV);
    }
});

let getData = async (word) => {
    try {
        let urlFetch = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!urlFetch.ok) {
            throw new Error('Failed to fetch data. Status: ' + urlFetch.status);
        }
        let data = await urlFetch.json();
        let wordWord;
        if (data[0] && data[0].meanings) {
            wordWord = `<p>Word : ${data[0].word}</p><p>Phonetic : ${data[0].phonetic}</p>`;
            data[0].meanings.forEach((meaning) => {
                wordWord += `<p>Part of Speech: ${meaning.partOfSpeech}</p><p>Definition: ${meaning.definitions[0].definition}</p>`;
            });

            // Create new card
            let newCard = document.createElement("div");
            newCard.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3");
            newCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        ${wordWord}
                    </div>
                </div>`;
            cardContainer.appendChild(newCard);

            inputDict.value = "";
        } else {
            wordInput.innerHTML = `No data or meanings found for the word.`;
        }
    } catch (error) {
        console.error('Error during data fetch:', error.message);
        wordInput.innerHTML = `No data or meanings found for the word.`;
        setTimeout(() => {
            wordInput.innerHTML = "";
            inputDict.value = "";
        }, 3000);
    }
};
