// custom async handler

const asyncHandler = (fxn) => (req, res, next) => {
    Promise.resolve(fxn(req, res, next)).catch(error => {
        res.status(500).json({message: error.message});
    });
};

export default asyncHandler;