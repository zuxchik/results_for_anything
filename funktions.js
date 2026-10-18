
document.getElementById("register").addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const groupTime = document.getElementById("groupTime").value.trim();
    const groupDay = document.getElementById("groupDay").value.trim();

    if (!name || !groupTime || !groupDay) {
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
                groupTime,
                groupDay
              })
            }
          );
          
          const result = await response.json();

        if (response.ok) {
            alert("Registered successfully! ✅");

            document.getElementById("name").value = "";
            document.getElementById("groupTime").value = "";
            document.getElementById("groupDay").value = "";
        } else {
            alert(result.error || "Failed to register.");
        }
    } catch (error) {
        alert("Serverga ulanib bo‘lmadi!");
        console.error("Xato:", error);
    }
});
