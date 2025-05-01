import { describe, it, expect, beforeEach } from "vitest";
import { User } from "../User";

describe('User', () => {
    let user: User;

    beforeEach(() => {
        user = new User('1', 'Test User', 'test@example.com');
    });

    describe('constructor', () => {
        it('should create a user with correct initial values', () => {
            expect(user.id).toBe('1');
            expect(user.name).toBe('Test User');
            expect(user.email).toBe('test@example.com');
            expect(user.category).toBe('standard');
            expect(user.currentLoans).toEqual([]);
        });

        it('should create a user with specified category', () => {
            const premiumUser = new User('2', 'Test User2', 'test2@example.com', 'premium');
            expect(premiumUser.category).toBe('premium');
        });
    });

    describe('canBorrow', () => {
        it('should return true if the user can borrow more books', () => {
            expect(user.canBorrow()).toBe(true);
        });

        it('should return false if the user has reached their loan limit', () => {
            user.currentLoans = ['book1', 'book2', 'book3'];
            expect(user.canBorrow()).toBe(false);
        });
    });

    describe('addLoan', () => {
        it('should add a book ID to currentLoans if not already present', () => {
            user.addLoan('book1');
            expect(user.currentLoans).toContain('book1');
        });

        it('should not add a duplicate book ID to currentLoans', () => {
            user.addLoan('book1');
            user.addLoan('book1');
            expect(user.currentLoans).toEqual(['book1']);
        });
    });

    describe('removeLoan', () => {
        it('should remove a book ID from currentLoans', () => {
            user.addLoan('book1');
            user.removeLoan('book1');
            expect(user.currentLoans).not.toContain('book1');
        });

        it('should not affect currentLoans if the book ID is not present', () => {
            user.addLoan('book1');
            user.removeLoan('book2');
            expect(user.currentLoans).toEqual(['book1']);
        });
    });

});