// middleware/responseFormatter.js

const responseFormatter = (req, res, next) => {
    // Store the original res.json function
    const originalJson = res.json;

    // Override res.json
    res.json = function (body) {
        // Define the basic response structure
        const response = {
            msg: body.message || 'Success', // Use the message if provided, or default to "Success"
            status: res.statusCode,
        };

        // Only include `data` if there's actual data to return and it's a GET request or when data is necessary
        if (Object.keys(body).length > 1) {
            response.data = body; // Include the full body as data if it contains more than just `message`
            delete response.data.message; // Remove `message` key from data if it exists
        }

        // Call the original res.json with the custom response structure
        originalJson.call(this, response);
    };

    next();
};

module.exports = responseFormatter;
