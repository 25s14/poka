let myMoney = 1000;
const suits = ['S', 'H', 'D', 'C'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const rankMap = { '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':11, 'Q':12, 'K':13, 'A':14 };

function getHandDetails() {
    let hand = [];
    let counts = {};
    for (let i = 0; i < 5; i++) {
        let v = values[Math.floor(Math.random() * values.length)];
        let s = suits[Math.floor(Math.random() * suits.length)];
        hand.push({ v, s });
        counts[v] = (counts[v] || 0) + 1;
    }
    
    let pairs = Object.values(counts).filter(c => c === 2).length;
    let threes = Object.values(counts).filter(c => c === 3).length;
    let fours = Object.values(counts).filter(c => c === 4).length;
    
    let score = 0; // Score for comparison
    let name = "High Card";
    if (fours) { score = 7; name = "Four of a Kind"; }
    else if (threes && pairs) { score = 6; name = "Full House"; }
    else if (threes) { score = 3; name = "Three of a Kind"; }
    else if (pairs === 2) { score = 2; name = "Two Pair"; }
    else if (pairs === 1) { score = 1; name = "One Pair"; }
    
    return { hand, score, name };
}

function displayCards(divId, hand) {
    const div = document.getElementById(divId);
    div.innerHTML = '';
    hand.forEach(card => {
        let code = (card.v === '10' ? '0' : card.v) + card.s;
        let img = document.createElement('img');
        img.src = `https://deckofcardsapi.com/static/img/${code}.png`;
        img.className = 'card-img';
        div.appendChild(img);
    });
}

function playGame() {
    const bet = parseInt(document.getElementById('bet-amount').value);
    if (bet > myMoney) return alert("पैसा पुगेन!");

    myMoney -= bet;
    document.getElementById('my-money').innerText = `$${myMoney}`;

    let player = getHandDetails();
    let cpu = getHandDetails();

    displayCards('player-cards', player.hand);
    displayCards('cpu-cards', cpu.hand);

    document.getElementById('player-result').innerText = player.name;
    document.getElementById('cpu-result').innerText = cpu.name;

    let outcomeText = document.getElementById('final-outcome');
    if (player.score > cpu.score) {
        myMoney += bet * 2;
        outcomeText.innerText = "तपाईंले जित्नुभयो! 🎉";
        outcomeText.style.color = "#2ecc71";
    } else if (player.score < cpu.score) {
        outcomeText.innerText = "CPU ले जित्यो! 😢";
        outcomeText.style.color = "#e74c3c";
    } else {
        myMoney += bet; // Draw: get bet back
        outcomeText.innerText = "बराबर (Draw)! 🤝";
        outcomeText.style.color = "#f1c40f";
    }

    document.getElementById('my-money').innerText = `$${myMoney}`;
}