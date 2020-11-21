export default class ResponseService {
    constructor (data, message, success) {
      this.data = data
      this.message = message
      this.success = success
    }

    errorResponse (message, data = null) {
      return new ResponseService(data, message, false)
    }

    successResponse (message, data) {
      return new ResponseService(data, message, true) 
    }
};