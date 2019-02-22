const { PubSub } = require('apollo-server-express')
const fs = require('fs')
const shortid = require('shortid')
const pubsub = new PubSub()

const authenticate = (session) => {
    let sessionUser;
    try {
        sessionUser = session.user.id
    } catch (e) {
        sessionUser = null
    }
    return sessionUser
}
const authenticateAdmin = (session) => {
    let admin;
    try {
        if (session.user.admin) {
            admin = session.user.id
        }
    } catch (e) {
        admin = null
    }
    return admin
}
const storeFS = ({ stream, filename }) => {
    const id = shortid.generate()
    const path = `./static/uploads/${id}-${filename}`
    return new Promise((resolve, reject) => {
        stream
            .on('error', error => {
                if (stream.truncated) {
                    fs.unlinkSync(path)
                    reject(error)
                }
            })
            .pipe(fs.createWriteStream(path))
            .on('error', error => reject({ error }))
            .on('finish', () => resolve({ path, id }))
    })
}
const deleteFS = path => {
    return new Promise((resolve) => {
        fs.exists(path, exists => exists ? fs.unlink(path, resolve) : null)
    })
}
const simplifyString = str => str.replace(/\s|\W/g, '').toLowerCase()
module.exports = { authenticate, pubsub, authenticateAdmin, storeFS, deleteFS, simplifyString }