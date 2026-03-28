let totalGross = 0;
let totalDiscount = 0;
let netTotal = 0;

// Current Date set karein
document.getElementById('currentDate').innerText = new Date().toLocaleDateString('en-GB');

function addItem() {
    let name = document.getElementById("itemName").value;
    let price = parseFloat(document.getElementById("itemPrice").value) || 0;
    let disc = parseFloat(document.getElementById("itemDisc").value) || 0;

    if (!name || price === 0) {
        alert("Meharbani karke Book ka naam aur qeemat likhen!");
        return;
    }

    let itemFinal = price - disc;
    let tbody = document.getElementById("billBody");
    let row = tbody.insertRow();
    
    row.innerHTML = `
        <td>${name}</td>
        <td class="txt-right">${price.toFixed(2)}</td>
        <td class="txt-right">${disc.toFixed(2)}</td>
        <td class="txt-right">${itemFinal.toFixed(2)}</td>
    `;

    // Totals Update
    totalGross += price;
    totalDiscount += disc;
    netTotal += itemFinal;

    document.getElementById("subTotal").innerText = totalGross.toLocaleString();
    document.getElementById("totalDisc").innerText = totalDiscount.toLocaleString();
    document.getElementById("totalAmount").innerText = netTotal.toLocaleString();

    // Inputs Reset
    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
    document.getElementById("itemDisc").value = "";
    document.getElementById("itemName").focus();
}

function autoScaleAndPrint() {
    scaleFont();
    window.print();
}

function scaleFont() {
    const tableBody = document.getElementById("billBody");
    const container = document.getElementById("dynamicContainer");
    const rows = tableBody.rows.length;

    // Font scaling logic
    if (rows > 25) container.style.fontSize = "12px";
    else if (rows > 15) container.style.fontSize = "15px";
    else container.style.fontSize = "19px";
}

function downloadPDF() {
    const element = document.getElementById('printableInvoice');
    scaleFont();

    const opt = {
        margin:       10,
        filename:     'PAK_BOOK_CENTER_BILL.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}

function clearBill() {
    if(confirm("Naya Bill shuru karna chahte hain? Purana data saaf ho jayega.")) {
        document.getElementById("billBody").innerHTML = "";
        totalGross = 0;
        totalDiscount = 0;
        netTotal = 0;
        document.getElementById("subTotal").innerText = "0";
        document.getElementById("totalDisc").innerText = "0";
        document.getElementById("totalAmount").innerText = "0";
        document.getElementById("dynamicContainer").style.fontSize = "19px";
    }
}