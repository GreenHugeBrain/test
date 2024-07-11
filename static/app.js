var listButton = document.querySelector('.list');
var itemDetailsContainer = document.querySelector('.item-details');

listButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/lists');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        // Sort data by 'created_at' date in descending order
        data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        // Clear previous content
        itemDetailsContainer.innerHTML = '';

        // Add header
        const header = document.createElement('div');
        header.className = 'header';
        header.innerHTML = `
            <div>Skin</div>
            <div>Price</div>
            <div>Date</div>
            <div>User</div>
            <div>Listing</div>
        `;
        itemDetailsContainer.appendChild(header);

        const ICON_BASE_URL = "https://community.cloudflare.steamstatic.com/economy/image/";

        // Loop through sorted data
        for (const item of data) {
            var itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            
            // Determine text color and content based on item.type
            const listingStatus = item.type ? 'გაყიდვაშია' : 'მოიხსნა მარკეტიდან';
            const listingColorClass = item.type ? 'listing-active' : 'listing-inactive';

            itemDiv.innerHTML = `
                <div class="name">
                    <img src="${ICON_BASE_URL}${item.item.icon_url}" alt="Item Icon">
                    <p>${item.item.market_hash_name}</p>
                </div>
                <div class="price">$${(item.price / 100).toFixed(2)}</div>
                <div class="date">${new Date(item.created_at).toLocaleString()}</div>
                <div class="user">
                    <img src="${item.seller.avatar}" alt="User Avatar">
                    <a class='linkusername' href="https://steamcommunity.com/profiles/${item.seller.steam_id}/">${item.seller.username}</a>
                </div>
                <div class="listing ${listingColorClass}">${listingStatus}</div>
            `;
            itemDetailsContainer.appendChild(itemDiv);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
