import data from './gigs.json' with { type: 'json' };

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
        let gigDateStr = gig.date.slice(0, 4) + '-' + gig.date.slice(4, 6) + '-' + gig.date.slice(6);
        let gigDate = new Date(gigDateStr);

        if (gigDate < today) {
            previous.push(gig);
        } else {
            upcoming.push(gig);
        }
    });

    // Sort upcoming gigs in chronological order
    upcoming.sort((a, b) => {
        let dateA = new Date(a.date.slice(0, 4) + '-' + a.date.slice(4, 6) + '-' + a.date.slice(6));
        let dateB = new Date(b.date.slice(0, 4) + '-' + b.date.slice(4, 6) + '-' + b.date.slice(6));
        return dateA - dateB;
    });

    // Sort previous gigs in reverse chronological order
    previous.sort((a, b) => {
        let dateA = new Date(a.date.slice(0, 4) + '-' + a.date.slice(4, 6) + '-' + a.date.slice(6));
        let dateB = new Date(b.date.slice(0, 4) + '-' + b.date.slice(4, 6) + '-' + b.date.slice(6));
        return dateB - dateA;
    });


    // Append sorted upcoming gigs
    upcoming.forEach(gig => {
        let li = document.createElement("li");
        li.textContent = `${gig.date} - ${gig.performer} @ ${gig.venue}`;
        if (gig.supporting) {
            li.textContent += ` (Supporting: ${gig.supporting})`;
        }
        upcomingGigs.appendChild(li);
    });

    // Append sorted previous gigs
    previous.forEach(gig => {
        let li = document.createElement("li");
        li.textContent = `${gig.date} - ${gig.performer} @ ${gig.venue}`;
        if (gig.supporting) {
            li.textContent += ` (Supporting: ${gig.supporting})`;
        }
        previousGigs.appendChild(li);
    });
}
