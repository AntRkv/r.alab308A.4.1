// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_4OJnOdzVbOwSg8P05fpEqrDIte4EVuwnYAgU5ct2ldvDrtLPspCqmHVwG6hQ6SWS";


// /**
//  * 1. Create an async function "initialLoad" that does the following:
//  * - Retrieve a list of breeds from the cat API using fetch().
//  * - Create new <options> for each of these breeds, and append them to breedSelect.
//  *  - Each option should have a value attribute equal to the id of the breed.
//  *  - Each option should display text equal to the name of the breed.
//  * This function should execute immediately.
//  */

async function initialLoad() {
  try {
    const breedSelect = document.getElementById("breedSelect");

    const response = await fetch("https://api.thecatapi.com/v1/breeds", {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Error response");
    }

    const breeds = await response.json();
    console.log("Data recieved", breeds);

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    if (breeds.length > 0) {
      handleBreedSelect({ target: { value: breeds[0].id } });
    }
  } catch (error) {
    console.error("Err req", error);
  }
}



// /**
//  * 2. Create an event handler for breedSelect that does the following:

//  * - Retrieve information on the selected breed from the cat API using fetch().

//  *  - Make sure your request is receiving multiple array items!

//  *  - Check the API documentation if you're only getting a single object.

//  * - For each object in the response array, create a new element for the carousel.
//  *  - Append each of these new elements to the carousel.
//  * - Use the other data you have been given to create an informational section within the infoDump element.
//  *  - Be creative with how you create DOM elements and HTML.
//  *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
//  *  - Remember that functionality comes first, but user experience and design are important.
//  * - Each new selection should clear, re-populate, and restart the Carousel.
//  * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
//  */



async function handleBreedSelect(event) {
  try {
    const breedId = event.target.value;

    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}&limit=5`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error images");
    }

    const catImages = await response.json();
    console.log("img recv:", catImages);

    const carouselInner = document.getElementById("carouselInner");
    const infoDump = document.getElementById("infoDump");

    if (carouselInner) {
      carouselInner.innerHTML = "";
    }

    if (infoDump) {
      infoDump.innerHTML = "";
    }

    catImages.forEach((catImage, index) => {
      const carouselItem = document.createElement("div");
      carouselItem.className = "carousel-item" + (index === 0 ? " active" : "");

      const imgElement = document.createElement("img");
      imgElement.src = catImage.url;
      imgElement.className = "d-block w-100";
      imgElement.alt = "Cat image";

      carouselItem.appendChild(imgElement);
      carouselInner.appendChild(carouselItem);
    });

    if (catImages.length > 0 && catImages[0].breeds.length > 0) {
      const breedInfo = catImages[0].breeds[0];
      const breedDetails = `
        <h2>${breedInfo.name}</h2>
        <p>${breedInfo.description}</p>
        <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
        <p><strong>Origin:</strong> ${breedInfo.origin}</p>
      `;
      infoDump.innerHTML = breedDetails;
    }

    const carouselElement = document.querySelector("#carouselExampleControls");
    if (carouselElement) {
      const existingCarousel = bootstrap.Carousel.getInstance(carouselElement);
      if (existingCarousel) {
        existingCarousel.dispose();
      }

      new bootstrap.Carousel(carouselElement, {
        interval: 2000,
        ride: "carousel",
      });
    }
  } catch (error) {
    console.error("Error retrieving breed information:", error);
  }
}

breedSelect.addEventListener("change", handleBreedSelect);

initialLoad();







// /**
//  * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
//  */
// /**
//  * 4. Change all of your fetch() functions to axios!
//  * - axios has already been imported for you within index.js.
//  * - If you've done everything correctly up to this point, this should be simple.
//  * - If it is not simple, take a moment to re-evaluate your original code.
//  * - Hint: Axios has the ability to set default headers. Use this to your advantage
//  *   by setting a default header with your API key so that you do not have to
//  *   send it manually with all of your requests! You can also set a default base URL!
//  */
// /**
 