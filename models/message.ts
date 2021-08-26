const path = require('path');

import supertest from 'supertest'
import jestOpenAPI from 'jest-openapi';

jestOpenAPI(path.join(__dirname, '../schemas/message.yml'));

const baseURL = 'https://slack.com';

const token = process.env.TOKEN || null;

if (token == null) {
    throw new Error('TOKEN is missing');
}

class Message {
    response: object;

    constructor(response) {
        this.response = response;
    }

    async post(channel, text, blocks?) {
        let query = 'channel=' + channel + '&text=' + text;
        if (blocks) {
            query = query + '&blocks=' + JSON.stringify(blocks)
        }
        this.response = await supertest(baseURL)
            .post('/api/chat.postMessage?' + query)
            .set('Authorization', 'Bearer ' + token)
        return this.response;
    }

    async postScheduled(channel, text, postAt, blocks?) {
        let query = 'channel=' + channel + '&text=' + text + '&post_at=' + postAt;
        if (blocks) {
            query = query + '&blocks=' + JSON.stringify(blocks)
        }
        this.response = await supertest(baseURL)
            .post('/api/chat.scheduleMessage?' + query)
            .set('Authorization', 'Bearer ' + token)
        return this.response;
    }

    async update(channel, ts, text) {
        this.response = await supertest(baseURL)
            .post('/api/chat.update?channel=' + channel + '&ts=' + ts + '&text=' + text)
            .set('Authorization', 'Bearer ' + token)
        return this.response;
    }

    async delete(channel, ts) {
        this.response = await supertest(baseURL)
            .post('/api/chat.delete?channel=' + channel + '&ts=' + ts)
            .set('Authorization', 'Bearer ' + token)
        return this.response;
    }

    async deleteScheduled(channel, ts) {
        this.response = await supertest(baseURL)
            .post('/api/chat.deleteScheduledMessage?channel=' + channel + '&scheduled_message_id=' + ts)
            .set('Authorization', 'Bearer ' + token)
        return this.response;
    }

    async validateResponse(status, ok) {
        expect(this.response).toSatisfyApiSpec();
        // @ts-ignore
        expect(this.response.status).toEqual(status);
        // @ts-ignore
        expect(this.response.body.ok).toEqual(ok);
    }
}

module.exports = {Message};