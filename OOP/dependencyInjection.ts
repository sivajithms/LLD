interface NotificationService {
    sendNotification(message: string): void;
}

class EmailNotificationService implements NotificationService {
    sendNotification(message: string): void {
        console.log(`Sending email notification: ${message}`);
    }

}

class SMSNotificationService implements NotificationService {
    sendNotification(message: string): void {
        console.log(`Sending SMS notification: ${message}`);
    }

}

class OrderService {
    private notificationServices: NotificationService[];
    constructor(notificationServices: NotificationService[]) {
        this.notificationServices = notificationServices;
    }
    
    placeOrder(orderId: number): void {
        console.log(`Placing order with ID: ${orderId}`);
        this.notificationServices.forEach(service => service.sendNotification(`Order ${orderId} has been placed.`));
    }
}

const orderService = new OrderService([
    new EmailNotificationService(),
    new SMSNotificationService()
]);

orderService.placeOrder(12345);