// this a notification service that will be used to send notifications to the user 
// channels: email, sms, push notification
// for now we will use email channel only
// otp is the one time password that will be sent to the user it is also a notification
// 

/**
 * Send notification to user
 * @param {*} id 
 * @param {*} notificationData {title, body,chanel}
 */
const sendNotification = async (id) => {
    
};

module.exports = {
    sendNotification
}