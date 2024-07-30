import data from './gigs.json' with { type: 'json' };

export function loadPerformances() {
    const gigs = data.gigs;
    const upcomingGigs = document.getElementById("upcomingGigs");
    const previousGigs = document.getElementById("previousGigs");

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = String(today.getFullYear());
    today = yyyy + mm + dd;

    gigs.forEach(gig => {
        let li = document.createElement("li");
        li.textContent = `${gig.date} - ${gig.performer} @ ${gig.venue}`;
        if (gig.supporting) {
            li.textContent += ` (Supporting: ${gig.supporting})`;
        }
        upcomingGigs.appendChild(li);
    });


    console.log("Hello World!");

}

