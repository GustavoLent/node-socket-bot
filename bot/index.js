import BotService from './services/botService';
import SocketService from './services/socketService';

(async function main() {
    const bot = new BotService()
    const socketService = new SocketService(bot)
    await bot.init()
    socketService.keepListening()
    
})();