import data from '/js/gigs.json' with { type: 'json' };

let data;

document.addEventListener('DOMContentLoaded', async function() {
    await importData();
    loadPerformances();
});

async function importData() {
    const response = await fetch('/js/gigs.json');
    data = await response.json();
}

importData().then(() => {
    loadPerformances();
});

export function loadPerformances() {
    const gigs = data.gigs;
    const upcomingGigs = document.getElementById("upcomingGigs");
    const previousGigs = document.getElementById("previousGigs");

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = String(today.getFullYear());
    today = new Date(`${yyyy}-${mm}-${dd}`);

    const upcoming = [];
    const previous = [];

    gigs.forEach(gig => {
        let gigDate = new Date(gig.date);

        if (gigDate < today) {
            previous.push(gig);
        } else {
            upcoming.push(gig);
        }
    });

    // Sort upcoming gigs in chronological order
    upcoming.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB;
    });

    // Sort previous gigs in reverse chronological order
    previous.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateB - dateA;
    });


    // Append sorted upcoming gigs
    upcoming.forEach(gig => {
        let li = document.createElement("li");
        li.innerHTML = `${swapDate(gig.date)} - ${gig.performer} @ ${gig.venue}`;
        if (gig.notes) {
            li.innerHTML += ` ${gig.notes}`;
        }
        upcomingGigs.appendChild(li);
    });

    // Append sorted previous gigs
    previous.forEach(gig => {
        let li = document.createElement("li");
        li.innerHTML = `${swapDate(gig.date)} - ${gig.performer} @ ${gig.venue}`;
        if (gig.notes) {
            li.innerHTML += ` ${gig.notes}`;
        }
        previousGigs.appendChild(li);
    });

    


    function swapDate(date) {
        let tokens = date.split("-");
        let mm = tokens[1];
        let dd = tokens[2];
    
        truncateDateDigit(mm);
        truncateDateDigit(dd);

        return mm + "/" + dd + "/" + tokens[0];

        function truncateDateDigit(twoDigitMonthOrDate) {
            if (twoDigitMonthOrDate.substring(0, 1) === "0") {
                twoDigitMonthOrDate = twoDigitMonthOrDate.substring(1, 2);
            }
            return twoDigitMonthOrDate;
        }
    }

}
