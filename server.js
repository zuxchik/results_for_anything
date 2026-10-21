
require("dotenv").config({ path: "./tokens.env" });

const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

app.use(cors({
    origin: "https://registrering-for-something.netlify.app"
}));

app.use(express.json());

const bot = new TelegramBot(process.env.BOT_TOKEN);

app.get("/", (req, res) => {
    res.json({ success: true, message: "Server ishlayapti!" });
});

app.post("/register", async (req, res) => {
    const { name, SurName, PhoneNumber } = req.body;

    if (
        typeof name !== "string" || !name.trim() ||
        typeof SurName !== "string" || !SurName.trim() ||
        typeof PhoneNumber !== "string" || !PhoneNumber.trim()
    ) {
        return res.status(400).json({
            error: "Barcha maydonlarni to'ldiring."
        });
    }

    if (!process.env.CHAT_ID) {
        return res.status(500).json({
            error: "CHAT_ID sozlanmagan."
        });
    }

    const message =
        "📝 NEW REGISTRATION\n\n" +
        "👤 Name: " + name.trim() + "\n" +
        "👤 SurName: " + SurName.trim() + "\n" +
        "📞 Phone Number: " + PhoneNumber.trim();

    try {
        await bot.sendMessage(process.env.CHAT_ID, message);

        console.log("Yangi ro'yxatdan o'tish yuborildi!");

        return res.json({ success: true });
    } catch (error) {
        console.error("Telegram xatosi:", error.message);

        return res.status(500).json({
            error: "Telegramga yuborilmadi."
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server ${PORT} portda ishlayapti.`);
});
