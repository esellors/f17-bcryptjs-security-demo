const bcrypt = require('bcryptjs')

const messages = [];

module.exports = {
    addMessage: (req, res) => {
        const {pin, message} = req.body;

        // search for existing chat
        for(let i = 0; i < messages.length; i++) {
            const existing = bcrypt.compareSync(pin, messages[i].pinHash)

            if (existing) {
                messages[i].messages.push(message)

                let messagesToReturn = { ...messages[i] }
                delete messagesToReturn.pinHash;

                res.status(200).send(messagesToReturn);
                return;
            }
        }

        // no existing message thread found. make new one

        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(pin, salt)

        const msgObj = {
            pinHash: hash,
            messages: [ message ]
        }

        messages.push(msgObj);

        let messagesToReturn = { ...msgObj }
        delete messagesToReturn.pinHash;

        res.status(201).send(messagesToReturn)
    }
}