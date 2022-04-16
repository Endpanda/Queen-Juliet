/*
Copyright (C) 2021 Endpanda.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const QueenJuliet = require('queenjuliet-public');
const {FancyText, fancyList} = require('fancy-Juliet');
const Juliet = QueenJuliet.events
const Build = QueenJuliet.build
const {MessageType} = require('@endpanda/queenjuliet-web-api');
let LOL = Build.WORKTYPE == 'public' ? false : true

const Language = require('../language');
const Lang = Language.getString('font');


Juliet.operate({ pattern: 'fancy ?(.*)', fromMe: LOL, desc: Lang.FONT_DESC,  deleteCommand: false}, (async (message, match) => {
    if (match[1] == '') return await message.client.sendMessage(message.jid,Lang.NEED_WORD,MessageType.text, {quoted: message.data});

    var list = await fancyList(match[1])
    await message.client.sendMessage(message.jid, list, MessageType.listMessage, {quoted: message.data})
}));

Juliet.operate({ pattern: 'textfancy ?(.*)', fromMe: LOL, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    var text = match[1].split('////')[1]
    var type = match[1].split('////')[0] 
    var out = await FancyText(text)
    await message.client.sendMessage(message.jid, out[type], MessageType.text, {quoted: message.data})
}));