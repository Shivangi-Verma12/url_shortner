const sessionIDToUserMap = new Map(); // Map to store session IDs to user objects

function setUser(id, user) {
    sessionIDToUserMap.set(id, user); // Store user object with session ID
}

function getUser(id) {
    return sessionIDToUserMap.get(id); // Retrieve user object by session ID
}

module.exports = {
    setUser,   
    getUser
};