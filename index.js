const express = require('express');
const app = express();

app.get('/', (req, res) => {
        res.send('Hello world')
})
app.use('/ping', (req, res) => {
        res.send(new Date());
});
app.listen(3000, () => {
        console.log(chalk.red.bold('Hello world'))

});

var status = [ `discord.gg/sn1`];
const Discord = require(`discord.js`);
const db = require(`quick.db`);
const client = new Discord.Client({ intents: [new Discord.Intents().add(32767)] });
const config = require(`./config.json`);
var prefix = "-";
const InvitesTracker = require('@androz2091/discord-invites-tracker');
const tracker = InvitesTracker.init(client, {
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true
});
var state2 = db.get(`state_`);

if (state2 === 0) {
  
client.on('ready', async() => {
      client.user.setStatus(`online`)
      let status = ['Snow صناع الثقه والضمان'];
    setInterval(()=>{
      client.user.setActivity(status[Math.floor(Math.random()*status.length)]);
    },5000)
  console.log(`Logged in as ${client.user.tag}\n-> Ready to serve ${client.guilds.cache.size} servers\n-> Ready to serve ${client.users.cache.size} users`)
  const channelId = '1176092393167147104';   
  const channel = client.channels.cache.get(channelId);

  if (channel) {
    channel.send(`<@${client.user.id}>** is now online! <a:Online:1108476345996029963>**\n<@1163961350888890389>`);
  };
  });
}else if (state2 === 1) {
  client.on('ready', async() => {
    client.user.setStatus(`online`)
    let status = ['Snow صناع الثقه والضمان'];
  setInterval(()=>{
    client.user.setActivity(status[Math.floor(Math.random()*status.length)]);
  },5000)
  console.log(`Logged in as ${client.user.tag} in disable mode\n-> Ready to serve ${client.guilds.cache.size} servers\n-> Ready to serve ${client.users.cache.size} users`)
  const channelId = '1176092393167147104';   
  const channel = client.channels.cache.get(channelId);

  if (channel) {
  channel.send(`<@${client.user.id}>** is now online but the bot in disable mode!<a:Online:1108476345996029963>**\n<@991063235719471174>`);
  };
  });

}
  

tracker.on('guildMemberAdd', async (member, type, invite) => {
  const welcomeChannel = member.guild.channels.cache.get('1176855426764120074');
  const memberData = db.get(member.id) || db.set(member.id, {
    joinedBefore: false
  });
  
    
  if (type === 'normal') {
    var state3 = db.get(`state_`);
    if (state3 === 0) {
    if (memberData.joinedBefore) {
      // The member has joined before
      
      welcomeChannel.send(`<@${invite.inviter.id}>, هذا العضو ${member} تم دعوته من قبل، منك او من شخص اخر لن تحصل على نقاط اضافية 🫤`);
    } else {
      // The member is new
                const accountCreationDate = new Date(member.user.createdAt);
      const currentDate = new Date();
      const differenceInDays = Math.ceil((currentDate - accountCreationDate) / (1000 * 60 * 60 * 24));

                console.log(`Member: ${member.user.username}, Account Age: ${differenceInDays} days`); 
                    if (differenceInDays < 90) {

        // The account is less than 3 months old
        welcomeChannel.send(`<@${invite.inviter.id}>, هذا العضو ${member} ،تمت دعوته لكن حسابه لم يتجاوز 3 أشهر بعد، لن تحصل على نقاط اضافية 🫤`);
      } else {
        // The account is at least 3 months old
       db.add(`user_${invite.inviter.id}`, 1);
        let point1 = db.get(`user_${invite.inviter.id}`);
        welcomeChannel.send(`<@${invite.inviter.id}>, لقد دعوت ${member} الى السيرفر - نقاطك الان \`${point1}\``);
      }
    }
  }else return;
}
  db.set(member.id, {
    joinedBefore: true
  });
});

client.on('guildMemberRemove', member => {
  const memberData = db.get(member.id) || db.set(member.id, {
    joinedBefore: true
  });


});


client.on(`messageCreate`, async smithmsg => {

  if (smithmsg.author.id !== '991063235719471174')
    return;

  if (!smithmsg.content.startsWith(config.prefix)) return;
  const args = smithmsg.content.slice(config.prefix.length).trim().split(` `);
  const command = args.shift().toLowerCase();

  let user;
  // Try to grab the first mentioned user
  if(smithmsg.mentions.users.first()){
    user = smithmsg.mentions.users.first();
  } 
  else if(args[0]){ // If no user was mentioned, try to get the user by ID
    user = await client.users.fetch(args[0]).catch(() => null);
  }

   if (command === 'check') {
    // If there was neither a mention nor an ID, return
    if(!user){
      return smithmsg.reply("No user mentioned or invalid ID!");
    }

    var memberData = db.get(user.id) || db.set(user.id, {
      joinedBefore: false
    });

    if(memberData.joinedBefore === true) {
      smithmsg.reply(`User <@${user.id}> has joined before!`);
    } else {
      smithmsg.reply(`This is <@${user.id}>'s first time joining!`);
    }
  }
});

const cooldowns1 = new Map();
client.on(`messageCreate`, async smithmsg => {
   if (smithmsg.author.bot) return;
  if (!smithmsg.content.startsWith(config.prefix)) return;
  if (cooldowns1.has(smithmsg.author.id)){
    return;
  }
  const args = smithmsg.content.slice(config.prefix.length).trim().split(` `)
  const command = args.shift().toLowerCase();
  const mention = smithmsg.mentions.users.first() || client.users.cache.get(args[0])
//if ()
  if (command === `spin`) {
    var statespin = db.get(`state_`);
    if(statespin === 0){
    cooldowns1.set(smithmsg.author.id, Date.now());

    // Add reaction to the message
    smithmsg.react('⏱');      // Make sure the bot has permission to add reactions.

    // Automatically delete the user from the cooldown map after 5 seconds
    setTimeout(() => {
      cooldowns1.delete(smithmsg.author.id);

      // Get the reaction to remove. You may need to adjust if your reactions are more complex.
      const reaction = smithmsg.reactions.cache.find(r => r.emoji.name === '⏱'); 

      // Remove the bot's own reaction.
      if (reaction) { 
        const botReaction = reaction.users.cache.get(client.user.id);
        if (botReaction) reaction.remove(botReaction);
      }
    }, 10000); 
    if (smithmsg.channel.name.includes(`spin`) ) {

        return smithmsg.reply({ content: `> ** الراجاء انتظار التسليم بعدها يمكن فتح تكت ولف العجله مره اخري** ` });
    }else if (!smithmsg.channel.name.startsWith(`ticket-`) ) {
        return smithmsg.reply({ content: `> ** تقدر تستعمل الامر بس بالتكت !** ` });
    }

    var point = db.get(`user_${smithmsg.author.id}`) || 0;
   
    var smith_embed = new Discord.MessageEmbed()
        .setAuthor({ name: smithmsg.author.tag, iconURL: smithmsg.author.avatarURL() })
        .setTitle(smithmsg.guild.name)
      .setColor(`#215c86`)
        .setDescription(`> Normal spin\nتحتاج انفايت واحد فقط\n > Legend spin\nتحتاج 2 انفايت\n\nانت تملك \`${point}\` نقطه  `)
      .setThumbnail(`https://cdn.discordapp.com/attachments/1162427232581599252/1162427665467326535/20231013_172842_.png?ex=653be620&is=65297120&hm=313742dc5e31644a22d9a71eb8d961fbfa5c5bbc8fc5b17d4b228491f5adb00d&`)
        .setTimestamp()
        .setFooter({ text: `Snow Team`, iconURL: smithmsg.guild.iconURL() });

    var normal_spin_button = new Discord.MessageButton()
        .setStyle(`PRIMARY`)
        .setLabel(`Normal Spin`)
        .setCustomId(`normal_spin`);

    var legend_spin_button = new Discord.MessageButton()
        .setStyle(`DANGER`)
        .setLabel(`Legend Spin`)
        .setCustomId(`legend_spin`);

    var all_button = new Discord.MessageActionRow()
        .addComponents(normal_spin_button)
        .addComponents(legend_spin_button);


    smithmsg.channel.send({ embeds: [smith_embed], components: [all_button] }).then(msg => {
        const filter = i => i.customId.endsWith(`_spin`) && i.user.id === smithmsg.author.id;

        const collector = smithmsg.channel.createMessageComponentCollector({ filter });

        collector.on('collect', async i => {
            if (i.customId === 'normal_spin') {
                if (smithmsg.channel.name.includes(`spin`) ) {
                    return smithmsg.reply({ content: `> ** الراجاء انتظار التسليم بعدها يمكن فتح تكت ولف العجله مره اخري** ` });
                }else if (!smithmsg.channel.name.startsWith(`ticket-`) ) {
                    return smithmsg.reply({ content: `> ** تقدر تستعمل الامر بس بالتكت !** ` });
                }
                var point = db.get(`user_${smithmsg.author.id}`) || 0;

                if (Number(point) < 1) return i.update({ content: `**تحتاج واحد انفيات لي لف العجله و انت تمتلك **\`${point}\``  , embeds: [], components: [] }).catch(err => {});


                const randomSpin = config.spin_default[Math.floor(Math.random() * config.spin_default.length)];

                smithmsg.channel.send({ content: `> **الرجاء عدم المنشن وانتظار تسليمك  ** \nالشخص المستلم  : ${smithmsg.author}\nالجائزة : **${randomSpin}**
  `}).catch(err => {});
              const winchannel = smithmsg.guild.channels.cache.get('1176858714146361364');
  winchannel.send(`** مبروك <@${smithmsg.author.id}> لقد ربحت \`${randomSpin}\`** 🥳`);
                smithmsg.channel.setName(`${randomSpin} 1inv`).catch(err => {});
                db.add(`user_${smithmsg.author.id}` , -1);
            } else if (i.customId === 'legend_spin') {
                  if (smithmsg.channel.name.includes(`spin`) ) {
                      return smithmsg.reply({ content: `> ** الراجاء انتظار التسليم بعدها يمكن فتح تكت ولف العجله مره اخري** ` });
                  }else if (!smithmsg.channel.name.startsWith(`ticket-`) ) {
                      return smithmsg.reply({ content: `> ** تقدر تستعمل الامر بس بالتكت !** ` });
                  }
                var point = db.get(`user_${smithmsg.author.id}`) || 0;

                if (Number(point) < 2) return i.update({ content: `**تحتاج 2 انفيات لي لف العجله و انت تمتلك **\`${point}\``  , embeds: [] , components: []}).catch(err => {});

                const randomSpin = config.spin_legends[Math.floor(Math.random() * config.spin_legends.length)];

                smithmsg.channel.send({ content: `** الرجاء عدم المنشن وانتظار تسليمك ** \n<#1176092392730927153>\nالشخص المستلم  : ${smithmsg.author}\nالجائزة : ** ${randomSpin}**
`}).catch(err => {});
              const winchannel = smithmsg.guild.channels.cache.get('1176858714146361364');
  winchannel.send(`** مبروك <@${smithmsg.author.id}> لقد ربحت \`${randomSpin}\`** 🥳`);
                smithmsg.channel.setName(`${randomSpin} 2inv`).catch(err => {})
                db.add(`user_${smithmsg.author.id}` , -2);
               
                
            } 
        });
    })

  }else     smithmsg.react('❌');
}
});

const cooldowns3 = new Map();
client.on(`messageCreate`, async smithmsg => {

  if (!smithmsg.content.startsWith(config.prefix)) return;

    const args = smithmsg.content.slice(config.prefix.length).trim().split(` `)
    const command = args.shift().toLowerCase();
    const mention = smithmsg.mentions.users.first() || client.users.cache.get(args[0])

  var statem = db.get(`state_`);
    if (command === `mypoint`){ 
    if(statem === 0){
      if (cooldowns3.has(smithmsg.author.id)){
        return;
      }
      cooldowns3.set(smithmsg.author.id, Date.now());

      // Add reaction to the message
      smithmsg.react('⏱');      // Make sure the bot has permission to add reactions.

      // Automatically delete the user from the cooldown map after 5 seconds
      setTimeout(() => {
        cooldowns3.delete(smithmsg.author.id);

        // Get the reaction to remove. You may need to adjust if your reactions are more complex.
        const reaction = smithmsg.reactions.cache.find(r => r.emoji.name === '⏱'); 

        // Remove the bot's own reaction.
        if (reaction) { 
          const botReaction = reaction.users.cache.get(client.user.id);
          if (botReaction) reaction.remove(botReaction);
        }
      }, 10000); 
        var point = db.get(`user_${smithmsg.author.id}`) || 0;

        if (!point || point === 0) return smithmsg.reply({ content: `> **ليس لديك نقاط **` });

        smithmsg.reply({ content: `** انت تملك \`${point}\` نقطه ! **` })
    }else smithmsg.react('❌');
      }else if (command === `reset`) {
       if (smithmsg.author.bot) return;
      if (!smithmsg.member.permissions.has(`ADMINISTRATOR`)) return;

      const members = Array.from(smithmsg.guild.members.cache.values());

      members.forEach(member => {
        const points = db.get(`user_${member.id}`);
        if (points) {
          db.set(`user_${member.id}`, 0);
        }
      });
      smithmsg.reply(`**Successfully reset points for members who have points.**`);

    }  else if (command === `addpoint`) {
        if (!smithmsg.member.permissions.has(`ADMINISTRATOR`)) return;
        if (!args[1] || !mention || isNaN(args[1])) return smithmsg.reply({content: `> ** Please add valid number ** (> **${config.prefix}${command} <user> <value>)**`});

        db.add(`user_${mention.id}` , Number(args[1]))

        var embed_smith_2 = new Discord.MessageEmbed()
        .setAuthor({name: mention.tag , iconURL: mention.avatarURL()})
        .setDescription(`> **successfully added ** **${Number(args[1])}** to ${mention}\nTotal Point of ${mention.tag}: **${db.get(`user_${mention.id}`)}**`)
        .setColor(`#215c86`);

        smithmsg.reply({embeds: [embed_smith_2]})
    } else if (command === `setpoint`) {
        if (!smithmsg.member.permissions.has(`ADMINISTRATOR`)) return;
        if (!args[1] || !mention || isNaN(args[1])) return smithmsg.reply({content: `> ** Please add valid number ** (> **${config.prefix}${command} <user> <value>)**`});

        db.set(`user_${mention.id}` , Number(args[1]))

        var embed_smith_2 = new Discord.MessageEmbed()
        .setAuthor({name: mention.tag , iconURL: mention.avatarURL()})
        .setDescription(`> **successfully seted ** **${Number(args[1])}** to ${mention}\nTotal Point of ${mention.tag}: **${db.get(`user_${mention.id}`)}**`)
        .setColor(`#215c86`);

        smithmsg.reply({embeds: [embed_smith_2]})
    }     else if (smithmsg.content.startsWith(prefix + 'on')) {
      if (!smithmsg.member.permissions.has(`ADMINISTRATOR`)) return;
      if (smithmsg.author.bot) return;
      db.set(`state_`, 0);
      smithmsg.reply(`**تم تشغيل البوت بنجاح ✅**`);
    } else if (smithmsg.content.startsWith(prefix + 'off')) {
      if (!smithmsg.member.permissions.has(`ADMINISTRATOR`)) return;
      if (smithmsg.author.bot) return;
      db.set(`state_`, 1);
      smithmsg.reply(`**تم غلق البوت بنجاح ✅**`);
    }
else if (smithmsg.content.startsWith(prefix + 'help')) {
        if (!smithmsg.member.permissions.has(`ADMINISTRATOR`)) return;



        var embed_smith_2 = new Discord.MessageEmbed()
        .setFooter({text:`Requested By ` + smithmsg.author.tag , iconURL: smithmsg.author.avatarURL()})
        .setAuthor({ name: smithmsg.guild.name + ` Spin Help`, iconURL: smithmsg.guild.iconURL() })
        .addField(`Bot Command`,`\`** -p ** \` to show your current point.\n\`** -spin **\` to spin and get your prize.\n\`** -setpoint **\` to change point to some one.\n\`** -addpoint **\` to add point to some one.\n\`** -check **\` to know if member saved in data as new member or joined  befor.\n\`** -reset **\` to reset all point for all membrs.\n\`** -state **\` to check if member cmd disable or not.\n\`** -on **\` to enable member cmd.\n\`** -off **\` to disable member cmd.\n`,true)
        .addField(`Bot Ping`,`${client.ws.ping}ms`,true)
        .setColor(`#215c86`);

        smithmsg.reply({embeds: [embed_smith_2]})
    }else return;
      if (!smithmsg.member.permissions.has(`ADMINISTRATOR`)) return;
      if (!smithmsg.content.startsWith(config.prefix)) return;
      const args1 = smithmsg.content.slice(config.prefix.length).trim().split(` `);
      const command1 = args1.shift().toLowerCase();

      let user;
      // Try to grab the first mentioned user
      if(smithmsg.mentions.users.first()){
        user = smithmsg.mentions.users.first();
      }  else if(args1[0]){ // If no user was mentioned, try to get the user by ID
        user = await client.users.fetch(args1[0]).catch(() => null);
      }

       if (command1 === 'check') {
        // If there was neither a mention nor an ID, return
        if(!user){
          return smithmsg.reply("No user mentioned or invalid ID!");
        }

        var memberData = db.get(user.id) || db.set(user.id, {
          joinedBefore: false
        });

        if(memberData.joinedBefore === true) {
          smithmsg.reply(`User <@${user.id}> has joined before!`);
        } else {
          smithmsg.reply(`This is <@${user.id}>'s first time joining!`);
        }
      };
  
  

  
  });
const cooldowns = new Map();
client.on('messageCreate', async smithmsg => {
  if (smithmsg.author.bot) return;

  // Check cooldown
  if (cooldowns.has(smithmsg.author.id)){
    return;
  }

  const args = smithmsg.content.slice(config.prefix.length).trim().split(' ');
  const mention = smithmsg.mentions.users.first() || client.users.cache.get(args[0]);

  if (smithmsg.content.startsWith(prefix + 'point') || smithmsg.content.startsWith(prefix + 'p')) {
    var state0 = db.get(`state_`);
    if(state0 === 0){
    // Your code goes here...

    const member = smithmsg.mentions.members.first() || smithmsg.guild.members.cache.get(args[0]);


    cooldowns.set(smithmsg.author.id, Date.now());

    // Add reaction to the message
    smithmsg.react('⏱');      // Make sure the bot has permission to add reactions.

    // Automatically delete the user from the cooldown map after 5 seconds
    setTimeout(() => {
      cooldowns.delete(smithmsg.author.id);

      // Get the reaction to remove. You may need to adjust if your reactions are more complex.
      const reaction = smithmsg.reactions.cache.find(r => r.emoji.name === '⏱'); 

      // Remove the bot's own reaction.
      if (reaction) { 
        const botReaction = reaction.users.cache.get(client.user.id);
        if (botReaction) reaction.remove(botReaction);
      }
    }, 5000); 

    if (!member) {
      var point = db.get(`user_${smithmsg.author.id}`) || 0;

      if (!point || point === 0) return smithmsg.reply({ content: `> **ليس لديك نقاط **` });

      smithmsg.reply({ content: `** انت تملك \`${point}\` نقطه ! **` });
    }else if (member) {

    // Put the user's id into the map as they used a command.
   

    const points = db.get(`user_${member.id}`)|| 0;
    return smithmsg.channel.send(`**${member} يملك \`${points}\` نقطة.**`);
  }
    }else smithmsg.react('❌');
  }else if (smithmsg.content.startsWith(prefix + "state")) {
    var state = db.get(`state_`);
    if (state === 0) {
      smithmsg.reply({ content: `**البوت مفعل لالغاء التفعيل اكتب \`-off\`**` });
    } else {
      smithmsg.reply({ content: `**البوت غير مفعل للتفعيل اكتب \`-on\`**` });
    }
  }
});


process.on('unhandledRejection', error => {     console.error('Error has been handler!'); });

process.on('uncaughtException', (error) => {
    const channelId = '1176092393167147104'; // replace with your channel id
    const channel = client.channels.cache.get(channelId);

    if (channel) {
        channel.send(`An error happened in the bot script: \n\n${JSON.stringify(error)}`);
    }
});

process.on('unhandledRejection', (error) => {
  const channelId = '1176092393167147104'; 
  const channel = client.channels.cache.get(channelId);

  if (channel) {
    channel.send(` <@991063235719471174> **An unhandled promise rejection occurred: **\n\n\`\`\`\n${error.stack}\n\`\`\``);
  }
})

client.login(process.env.token);
