import { describe, it, expect, beforeEach } from 'vitest';
import { Book } from '../Book';

describe('Book', () => {
    let book: Book;

    beforeEach(() => {
        book = new Book('1', 'Test Book', 'Test Author');
    });


    describe('constructor', () => {
        it('should create a book with correct initial values', () => {
            expect(book.id).toBe('1');
            expect(book.title).toBe('Test Book');
            expect(book.author).toBe('Test Author');
        });

        it('should set default values for optional properties', () => {
            expect(book.status).toBe('available');
            expect(book.borrowedBy).toBeUndefined();
            expect(book.borrowDate).toBeUndefined();
            expect(book.dueDate).toBeUndefined();
        });
    });

    describe('isBorrowed', () => {
        it('should return true if the book is borrowed', () => {
            book.status = 'borrowed';
            expect(book.isBorrowed()).toBe(true);
        });

        it('should return false if the book is not borrowed', () => {
            book.status = 'available';
            expect(book.isBorrowed()).toBe(false);

            book.status = 'maintenance';
            expect(book.isBorrowed()).toBe(false);
        });
    });

    describe('isAvailable', () => {
        it('should return true if the book is available', () => {
            book.status = 'available';
            expect(book.isAvailable()).toBe(true);
        });

        it('should return false if the book is not available', () => {
            book.status = 'borrowed';
            expect(book.isAvailable()).toBe(false);

            book.status = 'maintenance';
            expect(book.isAvailable()).toBe(false);
        });
    });

    describe('isInMaintenance', () => {
        it('should return true if the book is in maintenance', () => {
            book.status = 'maintenance';
            expect(book.isInMaintenance()).toBe(true);
        });

        it('should return false if the book is not in maintenance', () => {
            book.status = 'available';
            expect(book.isInMaintenance()).toBe(false);

            book.status = 'borrowed';
            expect(book.isInMaintenance()).toBe(false);
        });
    });
});
    