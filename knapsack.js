var items = [];
var capacity = 0;
document.getElementById("show_algorithm").addEventListener("click", function () {
    var algorithmContent = document.getElementById("algorithm-content");
    if (algorithmContent.style.display === "none") {
        algorithmContent.style.display = "block";
    } else {
        algorithmContent.style.display = "none";
    }
});
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
    var { selectedItems, dpTable } = knapsack(items, capacity);
    displayDPTable(dpTable);
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
    knapsackOutput.innerHTML += `<p>Total Value: ${totalValue}</p>`;
    document.getElementById("capacity").value = capacity;
}
document.getElementById("add_item").addEventListener("click", addItem);
document.getElementById("calculate_knapsack").addEventListener("click", calculateKnapsack);
function displayDPTable(dpTable) {
    var dpTableOutput = document.getElementById("dp-table");
    dpTableOutput.innerHTML = "<h2>DP Table (Step by Step):</h2>";
    for (var step = 0; step < dpTable.length; step++) {
        dpTableOutput.innerHTML += `<h3>Step ${step + 1}:</h3>`;
        dpTableOutput.innerHTML += "<table border='1'>";
        for (var i = 0; i < dpTable[step].length; i++) {
            dpTableOutput.innerHTML += "<tr>";
            for (var j = 0; j < dpTable[step][i].length; j++) {
                dpTableOutput.innerHTML += `<td>${dpTable[step][i][j]}</td>`;
            }
            dpTableOutput.innerHTML += "</tr>";
        }
        dpTableOutput.innerHTML += "</table>";
    }
}
function knapsack(items, capacity) {
    var n = items.length;
    var dpTable = [];
    for (var step = 0; step <= n; step++) {
        dpTable.push(new Array(capacity + 1).fill(0));
    }
    for (var i = 1; i <= n; i++) {
        for (var w = 1; w <= capacity; w++) {
            if (items[i - 1].weight <= w) {
                dpTable[i][w] = Math.max(dpTable[i - 1][w], dpTable[i - 1][w - items[i - 1].weight] + items[i - 1].value);
            } else {
                dpTable[i][w] = dpTable[i - 1][w];
            }
        }
    }

    var selectedItems = [];
    var i = n;
    var w = capacity;
    while (i > 0 && w > 0) {
        if (dpTable[i][w] !== dpTable[i - 1][w]) {
            selectedItems.push(items[i - 1]);
            w -= items[i - 1].weight;
        }
        i--;
    }

    return { selectedItems, dpTable };
}
