const {Message} = require('../models/message')
const {tags} = require('jest-tags')

const channel = 'C0SD8FYMT'
const blocks = require('../fixtures/blocks.json')

describe("Post (Update/Delete) new message to the channel", () => {
    const now = Date.now();
    let message;
    beforeAll(() => {
        message = new Message();
    });

    tags('smoke').test("Should successfully create, update and delete message", async () => {
        await message.post(channel, 'Created ' + now)
        await message.validateResponse(200, true)
        expect(message.response.body.message.text).toEqual('Created ' + now);

        const ts = message.response.body.ts;
        await message.update(channel, ts, 'Updated ' + now)
        await message.validateResponse(200, true)
        expect(message.response.body.message.text).toEqual('Updated ' + now);

        await message.delete(channel, ts)
        await message.validateResponse(200, true)
    });

    tags('smoke').test("Should successfully create message with attachment and delete it", async () => {
        await message.post(channel, 'Created with attachment ' + now, blocks)
        await message.validateResponse(200, true)
        expect(message.response.body.message.text).toEqual('Created with attachment ' + now);
        expect(message.response.body.message.blocks[0].image_url).toEqual('https://placekitten.com/500/500');

        const ts = message.response.body.ts;
        await message.delete(channel, ts)
        await message.validateResponse(200, true)
    });

    tags('smoke').test("Should successfully create scheduled message and delete it", async () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(9, 0, 0);

        const postAt = Math.round(tomorrow.getTime() / 1000)

        await message.postScheduled(channel, 'Created scheduled message ' + now, postAt)
        expect(message.response.status).toEqual(200);
        expect(message.response.body.ok).toEqual(true);
        expect(message.response.body.post_at).toEqual(postAt);
        expect(message.response.body.message.text).toEqual('Created scheduled message ' + now);

        const ts = message.response.body.scheduled_message_id;
        await message.deleteScheduled(channel, ts)
        expect(message.response.status).toEqual(200);
        expect(message.response.body.ok).toEqual(true);
    });
});