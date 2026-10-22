
document.getElementById("register").addEventListener("click", async () => {
    const registerButton = document.getElementById("register");

    const name = document.getElementById("name").value.trim();
    const groupTime = document.getElementById("groupTime").value.trim();
    const groupDay = document.getElementById("groupDay").value.trim();

    if (!name || !groupTime || !groupDay) {
        alert("Please fill in all fields!");
        return;
    }

    // Tugmani bosilgandan keyin o'zgartirish
    registerButton.disabled = true;
    registerButton.textContent = "Sending...";

    try {
        const response = await fetch(
            "https://results-for-anything.onrender.com/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    groupTime,
                    groupDay
                })
            }
        );

        const result = await response.json();

        if (response.ok) {
            registerButton.textContent = "Registered ✓";

            document.getElementById("name").value = "";
            document.getElementById("groupTime").value = "";
            document.getElementById("groupDay").value = "";
        } else {
            alert(result.error || "Failed to register.");

            registerButton.disabled = false;
            registerButton.textContent = "Register";
        }
    } catch (error) {
        alert("Serverga ulanib bo‘lmadi!");
        console.error("Xato:", error);

        registerButton.disabled = false;
        registerButton.textContent = "Register";
    }
});
