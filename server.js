require("dotenv").config({ path: "./tokens.env" });

const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

// Formang ishlayotgan manzilga ruxsat beramiz
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use(express.json());

const bot = new TelegramBot(process.env.BOT_TOKEN);



app.get("/", async (req, res) => {
    try {
        const updates = await bot.getUpdates({ limit: 100 });

        const chats = {};

        for (const update of updates) {
            const message =
                update.message ||
                update.edited_message ||
                update.channel_post ||
                update.edited_channel_post ||
                update.my_chat_member;

            if (!message) continue;

            const chat = message.chat;

            if (chat && chat.id) {
                chats[chat.id] = {
                    id: chat.id,
                    title: chat.title || chat.username || chat.first_name || "Chat",
                    type: chat.type
                };
            }
        }

        res.json({
            message: "Topilgan Telegram chatlari",
            chats: Object.values(chats)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/register", async (req, res) => {
    const { name, groupTime, groupDay } = req.body;

    if (
        typeof name !== "string" || !name.trim() ||
        typeof groupTime !== "string" || !groupTime.trim() ||
        typeof groupDay !== "string" || !groupDay.trim()
    ) {
        return res.status(400).json({
            error: "Barcha maydonlarni to‘ldiring."
        });
    }

    const message =
        "📝 NEW REGISTRATION\n\n" +
        "👤 Name: " + name.trim() + "\n" +
        "🕒 Group Time: " + groupTime.trim() + "\n" +
        "📅 Group Day: " + groupDay.trim();

    try {
        await bot.sendMessage(process.env.CHAT_ID, message);
        console.log("Yangi ro‘yxatdan o‘tish yuborildi!");
        res.json({ success: true });
    } catch (error) {
        console.error("Telegram xatosi:", error.message);
        res.status(500).json({
            error: "Telegramga yuborilmadi."
        });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
