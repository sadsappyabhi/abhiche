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

    gigs.forEach(gig => {
        let li = document.createElement("li");
        li.textContent = `${gig.date} - ${gig.performer} @ ${gig.venue}`;
        if (gig.supporting) {
            li.textContent += ` (Supporting: ${gig.supporting})`;
        }

        // Reformat gig date from yyyymmdd to yyyy-mm-dd
        let gigDateStr = gig.date.slice(0, 4) + '-' + gig.date.slice(4, 6) + '-' + gig.date.slice(6);
        let gigDate = new Date(gigDateStr);

        if (gigDate < today) {
            previousGigs.appendChild(li);
        } else {
            upcomingGigs.appendChild(li);
        }
    });


    function convertDate(date) {
        let year = date.substring(0, 3);
        let month = date.substring(4, 6);
        let day = date.substring(7);
        return month + "/" + day + "/" + year;
    }
    console.log("Hello World!");

}

