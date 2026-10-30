interface PricingStrategy {
    calculatePrice(hours: number): number;
}

class CarRentalPricing implements PricingStrategy {
    calculatePrice(hours: number): number {
        return hours * 100;
    }
}

class BikeRentalPricing implements PricingStrategy {
    calculatePrice(hours: number): number {
        return hours * 50;
    }
}

class TruckRentalPricing implements PricingStrategy {
    calculatePrice(hours: number): number {
        return hours * 200;
    }
}

class RentalService implements PricingStrategy {
    private pricingStrategy: PricingStrategy;

    constructor(pricingStrategy: PricingStrategy) {
        this.pricingStrategy = pricingStrategy;
    }

    setStrategy(pricingStrategy: PricingStrategy): void {
        this.pricingStrategy = pricingStrategy;
    }

    calculatePrice(hours: number): number {
        return this.pricingStrategy.calculatePrice(hours);
    }
}

const carRental = new RentalService(new CarRentalPricing());
const bikeRental = new RentalService(new BikeRentalPricing());
const truckRental = new RentalService(new TruckRentalPricing());

console.log(`Car rental for 5 hours: ₹${carRental.calculatePrice(5)}`);
console.log(`Bike rental for 3 hours: ₹${bikeRental.calculatePrice(3)}`);
console.log(`Truck rental for 2 hours: ₹${truckRental.calculatePrice(2)}`);