

export const handlerErros = (handlerFn) => {
    return (req, res, next) => {
        return Promise.resolve(handlerFn(req, res, next))
            .catch((e) => next(e))
    }
}