const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    limit: 10, // Limit each IP to 10 requests per `window` (here, per 1 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Use an external store for consistency across multiple server instances.
    handler: (req, res) => {
        res.status(429).json({ error: 'Too Many Requests' });
    },
})

module.exports = limiter