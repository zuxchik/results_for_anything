
document.getElementById("register").addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const SurName = document.getElementById("SurName").value.trim();
    const PhoneNumber = document.getElementById("PhoneNumber").value.trim();

    if (!name || !SurName || !PhoneNumber) {
        alert("Please fill in all fields!");
        return;
    }

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

        if (response.ok) {
            alert("Registered successfully! ✅");

            document.getElementById("name").value = "";
            document.getElementById("SurName").value = "";
            document.getElementById("PhoneNumber").value = "";
        } else {
            alert(result.error || "Failed to register.");
        }
    } catch (error) {
        alert("Serverga ulanib bo‘lmadi!");
        console.error("Xato:", error);
    }
});
