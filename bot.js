const botSettings = require("./botSettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
	console.log(`Bot is online! ${bot.user.username}`);
	bot.user.setActivity(`${bot.guilds.size} Servers, ${bot.users.size} Users || ${prefix}help`, { type: "WATCHING" })

	try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
	    console.log(link);
	} catch(e) {
		console.log(e.stack)
	}
});

bot.on("message", async message => {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);
	var fortunes = [
		"Yes",
		"No",
		"Maybe",
		"Fuck you",
		"<@_FuriousPlayer_#7662> is gay",
	  ];
	  function generateHex() {
		return "#" + Math.floor(Math.random() * 16777215).toString(16);
   }
	  

	if(!command.startsWith(prefix)) return;


	if(command === `${prefix}serverinfo`) {

		let sicon = message.guild.iconURL;
		let serverembed = new Discord.RichEmbed()
		  .setDescription("Server Information")
		  .setColor("#15f153")
		  .setThumbnail(sicon)
		  .addField("Server Name", message.guild.name)
		  .addField("Created On", message.guild.createdAt)
		  .addField("You Joined", message.member.joinedAt)
		  .addField("Total Members", message.guild.memberCount);
	
		return message.channel.send(serverembed);
	  }
	if(command === `${prefix}say`) {
		if(!message.member.hasPermission("ADMINISTRATOR")) return;
		const sayMessage = args.join(" ");
		message.delete().catch();
		message.channel.send(sayMessage);
	
	  }
	if(command === `${prefix}kick`) {

		//
	
		let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if (!kUser) return message.channel.send("Can't find user!");
		let kReason = args.join(" ").slice(22);
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No permission");
		if (kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
	
		let kickEmbed = new Discord.RichEmbed()
		  .setDescription("~Kick~")
		  .setColor("#e56b00")
		  .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
		  .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
		  .addField("Kicked In", message.channel)
		  .addField("Tiime", message.createdAt)
		  .addField("Reason", kReason);
	
		let kickChannel = message.guild.channels.find(`name`, "kicks-bans");
		if (!kickChannel) return message.channel.send("Can't find kicks/bans  channel.");
	
		message.guild.member(kUser).kick(kReason);
		kickChannel.send(kickEmbed);
	
		return;
	  }
	if(command === `${prefix}tempmute`) {
		let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!tomute) return message.reply("Couldn't find user.");
		if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply(`cant mute them`)
		let muterole = message.guild.roles.find(`name`, "muted");
		//start of create role
		if(!muterole){
		  try{
			muterole = await message.guild.createRole({
			  name: "muted",
			  color: "#000000",
			  permissions:[]
			})
			message.guild.channels.forEach(async (channel, id) => {
			  await channel.overwritePermissions(muterole, {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false
			  });
			});
		  }catch(e){
			console.log(e.stack);
		  }
		}
		//end of create role
		let mutetime = args[1];
		if(!mutetime) return message.reply("You didn't specify a time!");
	
		await(tomute.addRole(muterole.id));
		channel.message.reply(`<@${tomute.id}> you have been muted for ${ms(ms(mutetime))}`);
	
		setTimeout(function(){
		  tomute.removeRole(muterole.id);
		  message.channel.send(`<@${tomute.id}> has been unmuted!`);
		}, ms(mutetime));
	
	
	  //end of module
	  }
	if(command === `${prefix}help`) {
		var embed = new Discord.RichEmbed()
		.addField("Command here", "Test Descrption")
		.addField("Command here", "Test Description")
		.addField("Command here", "Test Description")
		.addField("Command here", "Test Description")
		.setColor("#ff2600")
		message.channel.sendEmbed(embed);
	}
		 
	if(command === `${prefix}purge`) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
		if (!args[0]) return message.channel.send("no");
		message.channel.bulkDelete(args[0]).then(() => {
		  message.channel.send(`I cleared ${args[0]} messages.`).then(msg => msg.delete(10000));
		});
	
	  }
	if(command === `${prefix}botinfo`) {

		let bicon = bot.user.displayAvatarURL;
		let botembed = new Discord.RichEmbed()
		  .setDescription("Bot Information")
		  .setColor("#15f153")
		  .setThumbnail(bicon)
		  .addField("Bot Name", bot.user.username)
		  .addField("Created On", bot.user.createdAt)
		  .addField("Owner", "OfficialGamingOG";
	
		return message.channel.send(botembed);
	  }
	
	if(command === `${prefix}report`) {

		//
	
		let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if (!rUser) return message.channel.send("Couldn't find user.");
		let rreason = args.join(" ").slice(22);
	
		let reportEmbed = new Discord.RichEmbed()
		  .setDescription("Reports")
		  .setColor("#15f153")
		  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
		  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
		  .addField("Channel", message.channel)
		  .addField("Time", message.createdAt)
		  .addField("Reason", rreason);
	
		let reportschannel = message.guild.channels.find(`name`, "reports");
		if (!reportschannel) return message.channel.send("Couldn't find reports channel.");
	
	
		message.delete().catch(O_o => { });
		reportschannel.send(reportEmbed);
	
		return;
	  }
	 if(command === `${prefix}addrole`){

	 }





	if(command === `${prefix}8ball`){
		if (args[1]) message.channel.sendMessage(fortunes[Math.floor(Math.random() * fortunes.length)]);
		else message.channel.sendMessage("Use like this **Bot.8ball <question>**");
	}
		
	if(command === `${prefix}mute`) {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("No perms");

		let toMute = message.guild.member(message.mentions.users.first ()) || message.guild.members.get(args[0]);
		if(!toMute) return message.channel.sendMessage("You did not say a user");

		let role = message.guild.roles.find(r => r.name === "OG-Muted");
		if(!role) {
			try {
				role  = await message.guild.createRole({
					name: "OG-Muted",
					color: "#000000",
					permissions: []
				});
				
				message.guild.chanels.forEach(async (channel, id) => {
					await channel.overwritePermissions(role, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					});
				});
			} catch(e) {
				console.log(e.stack);
			}
		} 

		if(toMute.roles.has(role.id)) return message.channel.sendMessage("User is already muted");

		await toMute.addRole(role);
		message.channel.sendMessage("User has been muted");

		return;
		
    if(command === `${prefix}unmute`) {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("No perms");
	
		let toMute = message.guild.member(message.mentions.users.first ()) || message.guild.members.get(args[0]);
		if(!toMute) return message.channel.sendMessage("You did not say a user");
	
		let role = message.guild.roles.find(r => r.name === "OG-Muted");
	
		if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("User is not muted");
	
		await toMute.removeRole(role);
		message.channel.sendMessage("I have unmuted the user");
			
		return;
	}
}

});	

client.login(process.env.BOT_TOKEN);
