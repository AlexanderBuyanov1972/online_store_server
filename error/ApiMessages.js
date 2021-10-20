class ApiMessage {
    ERROR_OBJECT_IS_NOT_CREATE = "Ошибка сервера. Объект не создан."
    ERROR_OBJECT_IS_NOT_UPDATE = "Ошибка сервера. Объект не обновлён."
    ERROR_OBJECT_IS_NOT_EXIST = "Ошибка клиента.Объект c таким id не существует."
    ERROR_DATA_IS_NOT_RECEIVED = "Ошибка сервера. Данные не получены."
    ERROR_DATA_IS_NOT_DELETED = "Ошибка сервера. Данные не удалены."

    SUCCESSFUL_DELETION = "Все объекты успешно удалены."
    SUCCESSFUL_DELETION_WITH_DEFINED_ID = "Объект с заданным id успешно удалён."
}

module.exports = new ApiMessage;