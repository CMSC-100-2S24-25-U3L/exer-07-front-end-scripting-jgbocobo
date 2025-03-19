// Add an event listener to the form submission
document.getElementById('food-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values from the form fields
    const name = document.getElementById('food-name').value;
    const description = document.getElementById('food-description').value;
    const imageUrl = document.getElementById('image-url').value;
    const rank = parseInt(document.getElementById('food-rank').value);

    const foodCardsContainer = document.getElementById('food-cards');
    const existingCards = Array.from(foodCardsContainer.children);
    
    // Check for duplicate rank
    for (let i = 0; i < existingCards.length; i++) {
        const currentRank = parseInt(existingCards[i].getAttribute('data-rank'));
        if (rank === currentRank) {
            alert("Rank already exists! Please choose a different rank.");
            return;
        }
    }

    // Create a new food card element
    const foodCard = document.createElement('div');
    foodCard.classList.add('card');
    foodCard.setAttribute('data-rank', rank);
    foodCard.innerHTML = `
        <img src="${imageUrl}" alt="${name}">
        <h4>${name}</h4>
        <p>${description}</p>
        <button class="delete-btn">Delete</button>
    `;

    // Add a delete event listener to the card
    foodCard.querySelector('.delete-btn').addEventListener('click', function() {
        foodCard.remove();
    });
    
    let inserted = false;
    
    // Insert the new card in the correct rank position
    for (let i = 0; i < existingCards.length; i++) {
        const currentRank = parseInt(existingCards[i].getAttribute('data-rank'));
        if (rank < currentRank) {
            foodCardsContainer.insertBefore(foodCard, existingCards[i]);
            inserted = true;
            break;
        }
    }

    // Append the card at the end if no earlier position was found
    if (!inserted) {
        foodCardsContainer.appendChild(foodCard);
    }

    // Reset the form after adding the card
    document.getElementById('food-form').reset();
});
