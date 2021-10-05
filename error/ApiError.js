class ApiError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    // не залогинился
    static unauthorized(message) {
        return new ApiError('401', message)
    }

    // требуется оплата
    static paymentRequired(message) {
        return new ApiError('402', message)
    }

    // не авторизован
    static forbidden(message) {
        return new ApiError('403', message)
    }

    // неправильный запрос
    static bedRequest(message) {
        return new ApiError('404', message)
    }

    //  ошибка на стороне сервера
    static internal(message) {
        return new ApiError('500', message)
    }

}

module.exports = ApiError