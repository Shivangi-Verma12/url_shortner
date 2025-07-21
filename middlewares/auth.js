const { getUser } = require('../service/auth');

async function restrictToLoggedinUserOnly(req, res, next) {
    const isApiRequest = req.headers.accept?.includes('application/json');
    const sessionId = req.cookies?.uid;

    if (!sessionId || !getUser(sessionId)) {
        if (isApiRequest) {
            return res.status(401).json({ error: 'Unauthorized' });
        } else {
            return res.redirect('/login');
        }
    }

    req.user = getUser(sessionId); // Attach user to request
    next();
}

module.exports = {
    restrictToLoggedinUserOnly
};

//need to install cookie-parser middleware to handle cookies
