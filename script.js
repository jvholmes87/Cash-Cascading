// This should be at the top level, ensuring it's executed once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cascadeBtn').addEventListener('click', calculate);
    document.getElementById('screenshotBtn').addEventListener('click', takeScreenshot);
    document.getElementById('shareTwitter').addEventListener('click', shareOnTwitter);
});

function calculate() {
    const initialAmountElement = document.getElementById('initialAmount');
    const initialAmount = parseFloat(initialAmountElement.value);
    const resultsElement = document.getElementById('results');

    if (isNaN(initialAmount) || initialAmount <= 0) {
        resultsElement.innerHTML = 'Please enter a valid initial amount greater than 0.';
        return;
    }

    let resultHTML = '<center><h3>Results From <a href="http://CashCascading.com">CashCascading.com</a></h3></center>';
    let amount = initialAmount;
    for (let day = 1; day <= 30; day++) {
        resultHTML += `Day ${day}: $${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br>`;
        amount *= 2;
    }
    //resultHTML += '<div class="footer-text">My Cash Cascade made at <a href="http://CashCascading.com">CashCascading.com</a></div>';
    resultsElement.innerHTML = resultHTML;
}

function takeScreenshot() {
    html2canvas(document.querySelector("#results")).then(canvas => {
        let context = canvas.getContext('2d');

        // Set the font to bold and size to 16px
        context.font = 'bold 16px Arial';
        context.fillStyle = '#000';

        // Calculate the width of the text
        let text = "";
        let textWidth = context.measureText(text).width;

        // Calculate the center position
        let xPosition = (canvas.width - textWidth) / 2;
        // Adjust y position to add space above, and consider the text height (approximated here as 16px, the font size)
        let yPosition = canvas.height - 20 - 16; // You can adjust this value to add more or less space above the text

        // Draw the text at the calculated position
        context.fillText(text, xPosition, yPosition);

        // Proceed with creating and downloading the image
        let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let link = document.createElement('a');
        link.download = 'my-cash-cascading-results.png';
        link.href = image;
        link.click();
    });
}


function shareOnTwitter() {
    const tweetText = "Check out my cascading results from http://www.cashcascading.com! Made by @jasonvholmes";
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank');
}
