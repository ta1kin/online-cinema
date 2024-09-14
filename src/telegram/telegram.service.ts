import { Injectable } from '@nestjs/common';
import { getTelegramConfig } from 'src/config/telegram.config';
import { Telegram } from 'src/telegram/telegram.interface';
import { Telegraf } from 'telegraf';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';

@Injectable()
export class TelegramService {
	bot: Telegraf;
	options: Telegram;

	constructor() {
		this.options = getTelegramConfig();
		this.bot = new Telegraf(this.options.token);
	}

	async sendPhoto(
		photo: string,
		msg?: string,
		options?: ExtraReplyMessage,
		chatId: string = this.options.chatId
	) {
		await this.bot.telegram.sendPhoto(
			chatId,
			photo,
			msg
				? {
						caption: msg,
					}
				: {}
		);
	}
	async sendMessage(
		msg: string,
		options?: ExtraReplyMessage,
		chatId: string = this.options.chatId
	) {
		await this.bot.telegram.sendMessage(chatId, msg, {
			parse_mode: 'HTML',
			...options,
		});
	}
}
