
const registerButton = document.getElementById("register");

registerButton.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const SurName = document.getElementById("SurName").value.trim();
    const PhoneNumber = document.getElementById("PhoneNumber").value.trim();

    if (!name || !SurName || !PhoneNumber) {
        alert("Please fill in all fields!");
        return;
    }

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
                    SurName,
                    PhoneNumber
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Registration failed.");
        }

        alert("Registered successfully! ✅");

        document.getElementById("name").value = "";
        document.getElementById("SurName").value = "";
        document.getElementById("PhoneNumber").value = "";

    } catch (error) {
        console.error("Registration error:", error);
        alert(error.message || "Serverga ulanib bo'lmadi!");
    } finally {
        registerButton.disabled = false;
        registerButton.textContent = "Register";
    }
});
