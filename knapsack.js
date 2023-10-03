// Initialize variables to store items, capacity, and item objects with profit and weight
var items = [];
var capacity = 0;

// Function to add an item to the list
function addItem() {
    var itemName = document.querySelector(".item-name").value;
    var itemValue = parseInt(document.querySelector(".item-value").value);
    var itemWeight = parseInt(document.querySelector(".item-weight").value);

    if (itemName && !isNaN(itemValue) && !isNaN(itemWeight)) {
        items.push({
            name: itemName,
            value: itemValue,
            weight: itemWeight
        });

        alert("Item added successfully!");
        clearItemInputs();
    } else {
        alert("Please enter valid item details.");
    }
}

function clearItemInputs() {
    document.querySelector(".item-name").value = "";
    document.querySelector(".item-value").value = "";
    document.querySelector(".item-weight").value = "";
}
function calculateKnapsack() {
    capacity = parseInt(document.getElementById("capacity").value);

    if (items.length === 0 || isNaN(capacity)) {
        alert("Please add items and enter a valid knapsack capacity.");
        return;
    }
    var selectedItems = knapsack(items, capacity);
    var totalValue = 0;

    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];
        totalValue += item.value;
    }
    var knapsackOutput = document.getElementById("knapsack");
    knapsackOutput.innerHTML = "<h2>Selected Items:</h2>";

    for (var i = 0; i < selectedItems.length; i++) {
        var item = selectedItems[i];
        knapsackOutput.innerHTML += `<p>${item.name} (Value: ${item.value}, Weight: ${item.weight})</p>`;
    }

    knapsackOutput.innerHTML += `<p>Total profit: ${totalValue}</p>`;
    document.getElementById("capacity").value = capacity;
}

document.getElementById("add_item").addEventListener("click", addItem);
document.getElementById("calculate_knapsack").addEventListener("click", calculateKnapsack);

function knapsack(items, capacity) {
    var n = items.length;
    var dp = new Array(n + 1).fill(0).map(() => new Array(capacity + 1).fill(0));

    for (var i = 1; i <= n; i++) {
        for (var w = 1; w <= capacity; w++) {
            if (items[i - 1].weight <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - items[i - 1].weight] + items[i - 1].value);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    var selectedItems = [];
    var i = n;
    var w = capacity;

    while (i > 0 && w > 0) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(items[i - 1]);
            w -= items[i - 1].weight;
        }
        i--;
    }

    return selectedItems;
}
