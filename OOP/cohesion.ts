//  wrong

// class OrderService {
//     placeOrder(): void {
//         // Place order
//     }

//     calculatePrice(): number {
//         return 1000;
//     }

//     saveToDatabase(): void {
//         // Save order
//     }

//     sendEmail(): void {
//         // Send email
//     }

//     generateInvoice(): void {
//         // Generate invoice
//     }
// }  

class OrderService {
    placeOrder(): void {
        // Place order
    }
}

class PricingService {
    calculatePrice(): number {
        return 1000;
    }
}

class OrderRepository {
    save(): void {
        // Save to database
    }
}

class EmailService {
    sendEmail(): void {
        // Send email
    }
}

class InvoiceService {
    generateInvoice(): void {
        // Generate invoice
    }
}

export {};