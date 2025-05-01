import { describe, test, expect, beforeEach } from 'vitest';
import { RestaurantSystem } from './RestaurantService';
import { ICustomer, IProduct, IOrder, IInvoice } from './types';

describe('Restaurant System Integration Tests', () => {
  let system: RestaurantSystem;
  
  // Variables pour stocker les références aux objets créés
  let customer: ICustomer;
  let pizza: IProduct;
  let soda: IProduct;
  
  beforeEach(() => {
    // Initialiser un nouveau système pour chaque test
    system = new RestaurantSystem();
    
    // Créer un client
    customer = system.getCustomerService().createCustomer({
      name: 'Jean Dupont',
      email: 'jean@example.com',
      address: '123 Rue de Paris, 75001 Paris',
      phone: '+33123456789'
    });
    
    // Créer des produits
    pizza = system.getProductService().createProduct({
      name: 'Margherita',
      description: 'Tomate, mozzarella, basilic',
      price: 12.5,
      category: 'main',
      available: true,
      preparationTimeMinutes: 20
    });
    
    soda = system.getProductService().createProduct({
      name: 'Cola',
      description: 'Boisson gazeuse',
      price: 3.5,
      category: 'drink',
      available: true,
      preparationTimeMinutes: 1
    });
  });
  
  test('Complete order process should work correctly', () => {
    // 1. Créer une commande
    const orderItems = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 2 }
    ];
    
    const result = system.processOrder(customer.id, orderItems);
    
    // 2. Vérifier que la commande et la facture ont été créées
    expect(result.order).not.toBeNull();
    expect(result.invoice).not.toBeNull();
    
    const order = result.order as IOrder;
    const invoice = result.invoice as IInvoice;
    
    // 3. Vérifier les détails de la commande
    expect(order.customerId).toBe(customer.id);
    expect(order.status).toBe('pending');
    expect(order.items.length).toBe(2);
    expect(order.totalAmount).toBe(pizza.price + (soda.price * 2));
    
    // 4. Vérifier les détails de la facture
    expect(invoice.orderId).toBe(order.id);
    expect(invoice.customerId).toBe(customer.id);
    expect(invoice.totalAmount).toBe(order.totalAmount);
    expect(invoice.tax).toBe(order.totalAmount * 0.1);
    expect(invoice.paid).toBe(false);
    
    // 5. Payer la facture
    const paymentResult = system.getInvoiceService().payInvoice(invoice.id, 'credit_card');
    expect(paymentResult).toBe(true);
    
    // 6. Vérifier que la facture est maintenant payée
    const updatedInvoice = system.getInvoiceService().getInvoice(invoice.id);
    expect(updatedInvoice?.paid).toBe(true);
    expect(updatedInvoice?.paymentMethod).toBe('credit_card');
    expect(updatedInvoice?.paidAt).toBeDefined();
    
    // 7. Vérifier que les points de fidélité ont été attribués
    const updatedCustomer = system.getCustomerService().getCustomer(customer.id);
    expect(updatedCustomer?.loyaltyPoints).toBe(1); // 1 point pour 19.5€ (12.5 + 3.5 * 2)
  });

  test('Loyalty points should be correctly awarded for orders', () => {
    // Créer une commande
    const orderItems = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 2 } 
    ];
    
    const result = system.processOrder(customer.id, orderItems);
    
    // Vérifier que la commande et la facture ont été créées
    expect(result.order).not.toBeNull();
    expect(result.invoice).not.toBeNull();
    
    const order = result.order as IOrder;
    
    // Vérifier que le montant total est correct
    expect(order.totalAmount).toBe(19.5); // 12.5 + (3.5 * 2)


    // Payer la facture
    const invoice = result.invoice as IInvoice;
    const paymentResult = system.getInvoiceService().payInvoice(invoice.id, 'credit_card');
    expect(paymentResult).toBe(true);
    
    // Vérifier que les points de fidélité sont correctement attribués
    const updatedCustomer = system.getCustomerService().getCustomer(customer.id);
    expect(updatedCustomer?.loyaltyPoints).toBe(1); // 1 point pour 19.5€
  });

  test('Order should fail if a product is unavailable', () => {
    // Rendre le produit indisponible
    system.getProductService().updateProductAvailability(pizza.id, false);
    
    // Essayer de créer une commande avec le produit indisponible
    const orderItems = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 2 }
    ];
    
    const result = system.processOrder(customer.id, orderItems);
    
    // Vérifier que la commande a échoué
    expect(result.order).toBeNull();
    expect(result.invoice).toBeNull();
  });

  test('Updating product availability should impact orders', () => {
    // Créer une commande avec le produit disponible
    const orderItems = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 2 }
    ];
    
    const result = system.processOrder(customer.id, orderItems);
    
    // Vérifier que la commande et la facture ont été créées
    expect(result.order).not.toBeNull();
    expect(result.invoice).not.toBeNull();
    
    // Rendre le produit indisponible
    system.getProductService().updateProductAvailability(pizza.id, false);
    
    // Essayer de créer une nouvelle commande avec le produit indisponible
    const newOrderItems = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 2 }
    ];
    
    const newResult = system.processOrder(customer.id, newOrderItems);
    
    // Vérifier que la nouvelle commande a échoué
    expect(newResult.order).toBeNull();
    expect(newResult.invoice).toBeNull();
  });

  test('Order status should transition correctly', () => {
    // Créer une commande
    const orderItems = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 2 }
    ];
    
    const result = system.processOrder(customer.id, orderItems);
    
    // Vérifier que la commande a été créée avec le statut "pending"
    const order = result.order as IOrder;
    expect(order.status).toBe('pending');
    
    // Mettre à jour le statut de la commande à "preparing"
    system.getOrderService().updateOrderStatus(order.id, 'preparing');
    const updatedOrder = system.getOrderService().getOrder(order.id);
    expect(updatedOrder?.status).toBe('preparing');
    
    // Mettre à jour le statut de la commande à "ready"
    system.getOrderService().updateOrderStatus(order.id, 'ready');
    const readyOrder = system.getOrderService().getOrder(order.id);
    expect(readyOrder?.status).toBe('ready');
    
    // Mettre à jour le statut de la commande à "delivered"
    system.getOrderService().updateOrderStatus(order.id, 'delivered');
    const deliveredOrder = system.getOrderService().getOrder(order.id);
    expect(deliveredOrder?.status).toBe('delivered');

    // Vérifier le statut final
    const finalOrder = system.getOrderService().getOrder(order.id);
    expect(finalOrder?.status).toBe('delivered');
  });

  test('Order cancellation should only be allowed when status is pending', () => {
    // Créer une commande
    const orderItems = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 2 }
    ];
    
    const result = system.processOrder(customer.id, orderItems);
    
    // Vérifier que la commande a été créée avec le statut "pending"
    const order = result.order as IOrder;
    expect(order.status).toBe('pending');
    
    // Essayer d'annuler la commande
    const cancellationResult = system.getOrderService().cancelOrder(order.id);
    expect(cancellationResult).toBe(true);
    
    // Vérifier que la commande a été annulée
    const cancelledOrder = system.getOrderService().getOrder(order.id);
    expect(cancelledOrder?.status).toBe('cancelled');
    
    // Essayer d'annuler une commande déjà préparée
    system.getOrderService().updateOrderStatus(order.id, 'preparing');
    const secondCancellationResult = system.getOrderService().cancelOrder(order.id);
    expect(secondCancellationResult).toBe(false);
  });

  test('Order and invoice amounts and taxes should be consistent', () => {
    // Créer une commande
    const orderItems = [
      { productId: pizza.id, quantity: 1 },
      { productId: soda.id, quantity: 2 }
    ];
    
    const result = system.processOrder(customer.id, orderItems);
    
    // Vérifier que la commande et la facture ont été créées
    expect(result.order).not.toBeNull();
    expect(result.invoice).not.toBeNull();
    
    const order = result.order as IOrder;
    const invoice = result.invoice as IInvoice;
    
    // Vérifier que le montant total de la commande est égal à celui de la facture
    expect(order.totalAmount).toBe(invoice.totalAmount);
    
    // Vérifier que la taxe est correcte (10% du montant total)
    expect(invoice.tax).toBe(order.totalAmount * 0.1);
  });
  
  
});
