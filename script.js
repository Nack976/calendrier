document.addEventListener("DOMContentLoaded", () => {
    // Récupération de la date du jour
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // 12 = Décembre
    const currentDay = today.getDate();

    // Pour tester facilement à une autre date, vous pouvez simuler :
    // const currentMonth = 12;
    // const currentDay = 5;

    const doors = document.querySelectorAll(".door");

    doors.forEach(door => {
        const dayNumber = parseInt(door.getAttribute("data-day"));

        // Vérification si la case peut s'ouvrir
        // Si on est en décembre et que le jour actuel >= jour de la case
        // (Astuce : changez la condition si vous voulez tester hors décembre en retirant la vérification du mois)
        const isUnlocked = (currentMonth === 12 && currentDay >= dayNumber);

        if (!isUnlocked) {
            door.classList.add("locked");
        }

        // Gestion du clic
        door.addEventListener("click", () => {
            if (door.classList.contains("locked")) {
                alert("Patience ! Cette case ne s'ouvrira que le " + dayNumber + " décembre 🎄.");
                return;
            }

            // Ouvre la case
            door.classList.toggle("open");
        });
    });
});