/*
Copyright (C) 2021 Endpanda.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
*/

const QueenJuliet = require('Endpanda-public');
const Amdi = QueenJuliet.events
const Build = QueenJuluet.build
const _settings = QueenJuliet.settings
const {MessageType} = require('@Endpanda/queenjuliet-web-api');

const Language = require('../language');
const Lang = Language.getString('_settings');

const Heroku = require('heroku-client');
const {secondsToHms} = require('./afk');
const got = require('got');

const heroku = new Heroku({
    token: Build.HEROKU.API_KEY
});

let baseURI = '/apps/' + Build.HEROKU.APP_NAME;


// ======== Log Number WorkType ========
JULIET.operate({pattern: 'qaworktype', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => { 
    await QueenJuliet.juliet_setup()
    if (Build.WORKTYPE == 'private') {
        var wktype = await _settings.wkbutton()
        await message.client.sendMessage(message.jid, wktype, MessageType.buttonsMessage, {quoted: message.data}); 
    }
    else if (Build.WORKTYPE == 'public'){
        var wktypepvt = await _settings.wkbuttonpvt()
        await message.client.sendMessage(message.jid, wktypepvt, MessageType.buttonsMessage, {quoted: message.data});
    }
}));
Juliet.operate({pattern: 'qasetwtpublic', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => { 
    await message.client.sendMessage(message.jid, Lang.SUCPUB, MessageType.text);
    await message.client.sendMessage(message.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['WORK_TYPE']: "public"
        } 
    });
}));
Juliet.operate({pattern: 'qasetwtprivate', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => { 
    await message.client.sendMessage(message.jid, Lang.SUCPVT, MessageType.text);
    await message.client.sendMessage(message.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['WORK_TYPE']: "private"
        } 
    });
}));
// ==============================

// ============Heroku settings=====================
Juliet.operate({pattern: 'settings', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (message) => {
    var menu = await _settings.menu()
    await message.client.sendMessage(message.jid, menu, MessageType.listMessage, {quoted: message.data});
}));

Juliet.operate({pattern: 'qaherokuset ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => {
    if (match[1] == 'bad') {
        var badbut = await _settings.badbutton()
        await message.client.sendMessage(message.jid, badbut, MessageType.buttonsMessage, {quoted: message.data}); 
    }
    else if (match[1] == 'bug') {
        var bugbut = await _settings.bugbutton()
        await message.client.sendMessage(message.jid, bugbut, MessageType.buttonsMessage, {quoted: message.data});
    }
    else if (match[1] == 'antilink') {
        var linkbut = await _settings.linkbutton()
        await message.client.sendMessage(message.jid, linkbut, MessageType.buttonsMessage, {quoted: message.data});
    }
    else if (match[1] == 'lang') {
        var langbut = await _settings.langbutton()
        await message.client.sendMessage(message.jid, langbut, MessageType.buttonsMessage, {quoted: message.data});
    }
    else if (match[1] == 'wktype') {
        var langbut = await _settings.wktybutton()
        await message.client.sendMessage(message.jid, langbut, MessageType.buttonsMessage, {quoted: message.data});
    }
}));

Juliet.operate({pattern: 'qasetherokubad ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => {
    if (match[1] == 'false') {
        await message.client.sendMessage(message.jid, '📴 *ANTIBAD disabled.*', MessageType.text);
    } else if (match[1] == 'true') {
        await message.client.sendMessage(message.jid, '🔛 *ANTIBAD enabled.*', MessageType.text);
    }
    await message.client.sendMessage(message.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['ANTIBAD']: match[1]
        } 
    });
}))

Juliet.operate({pattern: 'qasetherokubug ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => {
    if (match[1] == 'false') {
        await message.client.sendMessage(message.jid, '📴 *ANTIBUG disabled.*', MessageType.text);
    } else if (match[1] == 'true') {
        await message.client.sendMessage(message.jid, '🔛 *ANTIBUG enabled.*', MessageType.text);
    }
    await message.client.sendMessage(message.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['ANTIBUG']: match[1]
        } 
    });
}))

Juliet.operate({pattern: 'qasetherokulink ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => {
    if (match[1] == 'false') {
        await message.client.sendMessage(message.jid, '📴 *ANTILINK disabled.*', MessageType.text);
    } else if (match[1] == 'true') {
        await message.client.sendMessage(message.jid, '🔛 *ANTILINK enabled.*', MessageType.text);
    }
    await message.client.sendMessage(message.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['ANTILINK']: match[1]
        } 
    });
}))

Juliet.operate({pattern: 'qasetherokulang ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => {
    if (match[1] == 'SI') {
        await message.client.sendMessage(message.jid, '*Sinhala language setted.*', MessageType.text);
    } else if (match[1] == 'EN') {
        await message.client.sendMessage(message.jid, '*English language setted.*', MessageType.text);
    }
    await message.client.sendMessage(message.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['LANGUAGE']: match[1]
        } 
    });
}))

Juliet.operate({pattern: 'qasetherokuwkty ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => {
    if (match[1] == 'private') {
        await message.client.sendMessage(message.jid, '🛅 *Private mode activated!*', MessageType.text);
    } else if (match[1] == 'public') {
        await message.client.sendMessage(message.jid, '🛄 *Public mode activated!*', MessageType.text);
    }
    await message.client.sendMessage(message.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['WORK_TYPE']: match[1]
        } 
    });
}))

Juliet.operate({pattern: 'qasetherokuamdichat ?(.*)', fromMe: true, dontAddCommandList: true, deleteCommand: false}, (async (message, match) => {
    if (match[1] == 'false') {
        await message.client.sendMessage(message.jid, '📴 *Queen_CHAT disabled.*', MessageType.text);
    } else if (match[1] == 'true') {
        await message.client.sendMessage(message.jid, '🔛 *Queen_CHAT enabled.*', MessageType.text);
    }
    await message.client.sendMessage(message.jid, Lang.RESTART, MessageType.text);
    await new Promise(r => setTimeout(r, 1200));
    await heroku.patch(baseURI + '/config-vars', { 
        body: { 
            ['Queen_CHAT']: match[1]
        } 
    });
}))
// =========================================