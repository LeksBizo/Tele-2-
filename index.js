const TelegramBot = require('node-telegram-bot-api'); //добавление библиотеки тегеграмма

const token = '6826502677:AAFxQ94oEGWDR3xRLZwkjg2KEK2NdK36BkU';  //наш токет 

const bot = new TelegramBot(token, {polling: true});

const chats = {} //типо база данных

const gameOptions1 = {      //табличка опций телефон 

    reply_markup: JSON.stringify({
       inline_keyboard: [
        [{text: '1', callback_data: '1'}],  
        [{text: '2', callback_data: '2'}],
        [{text: '3', callback_data: '3'}],
        [{text: '4', callback_data: '4'}],
        [{text: '5', callback_data: '5'}]
       ]  
    })    

}

const gameOptions = {      //табличка опций телефон 

    reply_markup: JSON.stringify({
       inline_keyboard: [
        [{text: '1', callback_data: '1'}],  
        [{text: '5', callback_data: '5'}]
       ]  
    })    

}

const againOptions = {

    reply_markup: JSON.stringify({
       inline_keyboard: [
        [{text: 'играть еще раз', callback_data: '/again'}],  
    
       ]  
    })    

}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'загадываю цифру'); 
    const randomNumber = Math.floor(Math.random() * 10) //формула рандомайзера
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions1);
}

bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Разработчик'},
    {command: '/1', description: 'связи'}, 
    {command: '/2', description: 'связи'},
    {command: '/3', description: 'связи'},
    {command: '/4', description: 'связи'},
    {command: '/5', description: 'связи'},
    {command: '/6', description: 'связи'},
    {command: '/7', description: 'связи'},
    {command: '/game', description: 'игра'}   
])

const start = () => {}

bot.on('message',async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
   
    if(msg.text == '/start') {
    
       await bot.sendMessage(chatId, 'Ты молодой');
       await bot.sendSticker(chatId,'https://tenor.com/ru/view/lotr-bilbo-baggins-adventure-the-hobbit-gif-11425180');
    }

    if(msg.text == '/info') {
    
        await bot.sendMessage(chatId, 'Создатель данного бота/игры - Мишкель Алексей leks_Bizo, создан исключительно в развлекательных целях');
        await bot.sendSticker(chatId,'https://sun1-89.userapi.com/s/v1/ig2/avmvY35V5n9bGdbduZ-n2qrlbDfcPmOYWU1BmQ2Cy8A7GExX5bCXEcRBENUJ9CqtuJve39xLJwzwjCQDMsnZW-co.jpg?size=400x400&quality=95&crop=122,274,612,612&ava=1');
    }

    if(msg.text == '/relations') {
    
        await bot.sendMessage(chatId, '3');
    }

    if(msg.text == '/game') {

        return startGame(chatId);
    }

    if(msg.text == '/1') {

        await bot.sendMessage(chatId, 'ты выбрал единицу ');
        await bot.sendSticker(chatId,'https://tenor.com/ru/view/not-listening-gollum-lotr-lord-of-the-rings-no-spoilers-gif-14027575');
    }
   
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        
        if(data === '/again' ) {
            return startGame(chatId)
        }
        if(data === chats[chatId]) {
          return bot.sendMessage(chatId, 'Ты отгадал цифру', againOptions)
        } else {
            return bot.sendMessage(chatId, 'Лошара', againOptions) 
        }

        
    })

})