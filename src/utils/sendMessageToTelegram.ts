const sendMessageToTelegram = async (message: unknown) => {
  const token = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_ID;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    }),
  });

  if (!response.ok) {
    console.error('Ошибка отправки в Telegram:', await response.text());
  }
};

export default sendMessageToTelegram;
