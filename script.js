async function getStats() {
    let tag = document.getElementById('playerTag').value.replace('#', '');
    const proxy = "https://corsproxy.io/?"; // Используем прокси для обхода CORS
    const url = `https://api.brawlstars.com/v1/players/%23${tag}`;
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdhYzE4M2VmLTY3ZGUtNDYzNy04M2VhLTRmY2I0M2VhYjM3YSIsImlhdCI6MTc3NTc0NDIyMywic3ViIjoiZGV2ZWxvcGVyLzcyZTYzYzc2LTc2NmEtZjkzNC02NzlhLTFmNWMwZTA4NTNhYyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMC4wLjAuMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.nEV1awC1zPYxr56XrgsbrKsCxyaGnvkKmkqoChiTRIvQcx2Q-qkfWmYC13h3mx21xxPwll2j0XcrwzX42LI0LQ";

    try {
        const response = await fetch(proxy + encodeURIComponent(url), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        const data = await response.json();

        if (data.reason) {
            alert("Игрок не найден или ошибка API");
            return;
        }

        // Показываем данные
        document.getElementById('result').style.display = 'block';
        document.getElementById('name').innerText = data.name;
        document.getElementById('trophies').innerText = data.trophies;
        document.getElementById('expLevel').innerText = data.expLevel;
        document.getElementById('brawlersCount').innerText = data.brawlers.length;

        // Расчет часов (примерная формула: опыт * коэффициент)
        // Обычно 1 единица уровня требует времени. Возьмем среднее:
        let estimatedHours = Math.round(data.expPoints / 1200); 
        document.getElementById('hours').innerText = estimatedHours;

    } catch (error) {
        console.error("Ошибка:", error);
    }
}
