//make loosly coupled elements


// class EmailService {
//     sendEmail(message: string): void {
//         console.log("Email sent:", message);
//     }
// }

// class OrderService {
//     private emailService = new EmailService();

//     placeOrder(): void {
//         // Place order
//         this.emailService.sendEmail("Order placed");
//     }
// }


interface NotificationService {
    send(message: string): void;
}

class EmailService implements NotificationService {
    send(message: string): void {
        console.log("Email:", message);
    }
}

class SmsService implements NotificationService {
    send(message: string): void {
        console.log("SMS:", message);
    }
}

class OrderService {
    constructor(
        private notification: NotificationService
    ) { }

    placeOrder(): void {
        // Place order
        this.notification.send("Order placed");
    }
}

export {};