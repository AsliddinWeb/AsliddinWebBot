const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()

const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply(`Salom ${ctx.message.from.first_name ? ctx.message.from.first_name : 'Noma\'lum shaxs'}!`)
    console.log(ctx.message);
})


bot.help((ctx) => ctx.reply(text.commands))

bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Kurslar</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('1', 'btn_1'), Markup.button.callback('2', 'btn_2')],
                [Markup.button.callback('3', 'btn_3'), Markup.button.callback('4', 'btn_4'), Markup.button.callback('5', 'btn_5')]
            ]
        ))
    } catch(e) {
        console.error(e)
    }  
})

function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if(src !== false) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        } catch (e) {
            console.error(e);
        }
    })
}

addActionBot('btn_1', './img/1.jpg', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', false, text.text3)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))