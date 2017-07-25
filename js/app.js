Date.prototype.yyyymmdd = function() {
    // getMonth is zero based,
    // so we increment by 1
    let mm = this.getMonth() + 1;
    let dd = this.getDate();

    return [this.getFullYear(),
        (mm>9 ? '' : '0') + mm,
        (dd>9 ? '' : '0') + dd
    ].join('-');
};

const dates = {
    startDate: function() {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        return startDate.yyyymmdd();
    },
    endDate: function() {
        const endDate = new Date();
        return endDate.yyyymmdd();
    }
}

const app = {
    apiURL: `https://api.github.com/search/repositories?q=created:%22${dates.startDate()}+..+${dates.endDate()}%22%20language:javascript&sort=stars&order=desc`,
    cardTemplate: document.querySelector('.card-template')
}

app.createCard = function(trend) {
    console.log(trend);
    const card = app.cardTemplate.cloneNode(true);
    card.classList.remove('card-template')
    card.querySelector('.card-title').textContent = trend.full_name
    card.querySelector('.card-lang').textContent = trend.language
    card.querySelector('.card-stars').textContent = trend.stargazers_count
    card.querySelector('.card-forks').textContent = trend.forks
    card.querySelector('.card-link').setAttribute('href', trend.html_url)
    card.querySelector('.card-img').setAttribute('url', trend.avatar_url)
    card.querySelector('.card-link').setAttribute('target', '_blank')
    return card;
}

app.getTrends = function() {
    const networkReturned = false;
    if ('caches' in window) {
        caches.match(app.apiURL).then(function(response) {
            if (response) {
                response.json().then(function(trends) {
                    console.log('From cache...')
                    if(!networkReturned) {
                        app.updateTrends(trends);
                    }
                });
            }
        });
    }

    fetch(app.apiURL)
        .then(response => response.json())
        .then(function(trends) {
            console.log('From server...')
            app.updateTrends(trends.items)
            //noinspection JSAnnotator
            networkReturned = true;
        }).catch(function(err) {
        // Error
    });
}

app.updateTrends = function(trends) {
    const trendsRow = document.querySelector('.trends');
    for(let i = 0; i < trends.length; i++) {
        const trend = trends[i];
        trendsRow.appendChild(app.createCard(trend));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    app.getTrends()

    // Event listener for refresh button
    const refreshButton = document.querySelector('.refresh');
    refreshButton.addEventListener('click', app.getTrends)
})

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(function() {
            console.log('Service Worker Registered');
        });
}

