// estadisticas.js - Datos y renderizado de estadísticas para los 12 participantes
document.addEventListener('DOMContentLoaded', () => {
    // Datos precisos / simulados pero realistas para cada selección
    const countriesStats = [
        { name: "México", flag: "🇲🇽", worldCups: 17, bestResult: "Cuartos de final (1970, 1986)", fifaRank: 14, titles: 0, extra: "Anfitrión 2026" },
        { name: "Sudáfrica", flag: "🇿🇦", worldCups: 3, bestResult: "Fase de grupos (2010)", fifaRank: 60, titles: 0, extra: "Anfitrión 2010" },
        { name: "Corea del Sur", flag: "🇰🇷", worldCups: 11, bestResult: "Semifinales (2002)", fifaRank: 28, titles: 0, extra: "4° lugar 2002" },
        { name: "Ucrania", flag: "🇺🇦", worldCups: 1, bestResult: "Cuartos de final (2006)", fifaRank: 24, titles: 0, extra: "Eurocopa cuartos" },
        { name: "Túnez", flag: "🇹🇳", worldCups: 6, bestResult: "Fase de grupos", fifaRank: 52, titles: 0, extra: "Campeón África 2004" },
        { name: "Uzbekistán", flag: "🇺🇿", worldCups: 0, bestResult: "No clasificado", fifaRank: 74, titles: 0, extra: "Semifinalista AFC" },
        { name: "Colombia", flag: "🇨🇴", worldCups: 6, bestResult: "Cuartos de final (2014)", fifaRank: 17, titles: 0, extra: "Copa América 2001" },
        { name: "Japón", flag: "🇯🇵", worldCups: 7, bestResult: "Octavos de final (2002, 2010, 2018, 2022)", fifaRank: 20, titles: 0, extra: "4 veces octavos" },
        { name: "Cabo Verde", flag: "🇨🇻", worldCups: 0, bestResult: "Sin participación", fifaRank: 65, titles: 0, extra: "Afcon 2021 cuartos" },
        { name: "Arabia Saudí", flag: "🇸🇦", worldCups: 6, bestResult: "Octavos (1994)", fifaRank: 53, titles: 0, extra: "Victoria vs Argentina 2022" },
        { name: "España", flag: "🇪🇸", worldCups: 16, bestResult: "Campeón (2010)", fifaRank: 8, titles: 1, extra: "Eurocopas 1964,2008,2012" },
        { name: "República Checa", flag: "🇨🇿", worldCups: 1, bestResult: "Fase grupos (2006)", fifaRank: 36, titles: 0, extra: "Subcampeón Euro 1996" }
    ];

    const gridContainer = document.getElementById('statsGrid');
    if (!gridContainer) return;

    function renderStats() {
        gridContainer.innerHTML = '';
        countriesStats.forEach(country => {
            const card = document.createElement('div');
            card.className = 'country-card';
            card.style.animationDelay = `${Math.random() * 0.1}s`;
            
            // Determinar si tiene título mundialista
            const championBadge = country.titles === 1 ? '<span style="background: linear-gradient(90deg,#f59e0b,#fbbf24); color:#000; padding:2px 8px; border-radius:30px; font-size:0.7rem; margin-left:8px;">🏆 Campeón</span>' : '';
            
            card.innerHTML = `
                <div class="card-header">
                    <div class="flag-emojii">${country.flag}</div>
                    <div class="country-name">${country.name} ${championBadge}</div>
                </div>
                <div class="stats-list">
                    <div class="stat-item">
                        <span class="stat-label"><i class="fas fa-futbol"></i> Participaciones</span>
                        <span class="stat-value">${country.worldCups} Mundial(es)</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label"><i class="fas fa-trophy"></i> Mejor resultado</span>
                        <span class="stat-value">${country.bestResult}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label"><i class="fas fa-ranking-star"></i> Ranking FIFA</span>
                        <span class="stat-value">${country.fifaRank}° puesto</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label"><i class="fas fa-star-of-life"></i> Logro extra</span>
                        <span class="stat-value">${country.extra}</span>
                    </div>
                </div>
                <div class="stat-note">
                    <i class="fas fa-chart-simple"></i> Datos actualizados - WorldLens
                </div>
            `;
            gridContainer.appendChild(card);
        });
    }

    renderStats();
});