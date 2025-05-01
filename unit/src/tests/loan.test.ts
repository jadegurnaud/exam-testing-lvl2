import { describe, it, expect, beforeEach } from "vitest";
import { LoanService } from "../LoanService";
import { Book } from "../Book";
import { User } from "../User";

describe('LoanService', () => {
    let loanService: LoanService;
    let book: Book;
    let user: User;

    beforeEach(() => {
        loanService = new LoanService();
        book = new Book('1', 'Test Book', 'Test Author');
        user = new User('1', 'Test User', 'test@example.com');
    });

    describe('addBook', () => {
        it('should add a book to the service', () => {
            loanService.addBook(book);
            expect(loanService.getBook('1')).toBe(book);
        });

    });

    describe('addUser', () => {
        it('should add a user to the service', () => {
            loanService.addUser(user);
            expect(loanService.getUser('1')).toEqual(user);
        });

    });

    describe('borrowBook', () => {
        it('should allow a user to borrow a book', () => {
            loanService.addBook(book);
            loanService.addUser(user);
            const result = loanService.borrowBook('1', '1');
            expect(result).toBe(true);
            expect(book.status).toBe('borrowed');
            expect(book.borrowedBy).toBe('1');
        });

        it('should not allow a user to borrow an unavailable book', () => {
            loanService.addBook(book);
            loanService.addUser(user);
            book.status = 'borrowed';
            const result = loanService.borrowBook('1', '1');
            expect(result).toBe(false);
        });

        it('should not allow a user to borrow if they have reached their limit', () => {
            loanService.addBook(book);
            loanService.addUser(user);
            user.currentLoans = ['book1', 'book2', 'book3'];
            const result = loanService.borrowBook('1', '1');
            expect(result).toBe(false);
        });
    });

    describe('returnBook', () => {
        it('should allow a user to return a borrowed book', () => {
            loanService.addBook(book);
            loanService.addUser(user);
            loanService.borrowBook('1', '1');
            const result = loanService.returnBook('1');
            expect(result).toBe(0);
            expect(book.status).toBe('available');
            expect(book.borrowedBy).toBeUndefined();
        });

        it('should not allow returning a book that is not borrowed', () => {
            loanService.addBook(book);
            const result = loanService.returnBook('1');
            expect(result).toBe(-1);
        });
    });

    describe('getAvailableBooks', () => {
        it('should return only available books', () => {
            const book2 = new Book('2', 'Test Book 2', 'Test Author 2');
            loanService.addBook(book);
            loanService.addBook(book2);
            book.status = 'borrowed';
            const availableBooks = loanService.getAvailableBooks();
            expect(availableBooks).toHaveLength(1);
            expect(availableBooks[0]).toBe(book2);
        });

        it('should return an empty array if no books are available', () => {
            loanService.addBook(book);
            book.status = 'borrowed';
            const availableBooks = loanService.getAvailableBooks();
            expect(availableBooks).toHaveLength(0);
        });

        it('should return all books if all are available', () => {
            const book2 = new Book('2', 'Test Book 2', 'Test Author 2');
            loanService.addBook(book);
            loanService.addBook(book2);
            const availableBooks = loanService.getAvailableBooks();
            expect(availableBooks).toHaveLength(2);
            expect(availableBooks).toContain(book);
            expect(availableBooks).toContain(book2);
        });

        it('should return an empty array if no books are present', () => {
            const availableBooks = loanService.getAvailableBooks();
            expect(availableBooks).toHaveLength(0);
        });
    });

    describe('getUserLoans', () => {
        it('should return the loans of a user', () => {
            loanService.addBook(book);
            loanService.addUser(user);
            loanService.borrowBook('1', '1');
            const loans = loanService.getUserLoans('1');
            expect(loans).toHaveLength(1);
            expect(loans[0].id).toBe(book.id);
        });

        it('should return an empty array if the user has no loans', () => {
            loanService.addUser(user);
            const loans = loanService.getUserLoans('1');
            expect(loans).toHaveLength(0);
        });
    });

    describe('calculatePenalty', () => {
        it('should calculate the penalty for overdue books', () => {
            const penalty = loanService.calculatePenalty(book, new Date('2023-10-10'));
            expect(penalty).toBe(0);
        });

        it('should return 0 if the book is not overdue', () => {
            const penalty = loanService.calculatePenalty(book, new Date('2023-10-01'));
            expect(penalty).toBe(0);
        });
    });

    describe('calculateDueDate', () => {
        it('should calculate the due date for standard users', () => {
            const dueDate = loanService.calculateDueDate(new Date('2023-10-01'), 'standard');
            expect(dueDate).toEqual(new Date('2023-10-15'));
        });

    });

    describe('getBorrowedBooks', () => {
        it('should return only borrowed books', () => {
            const book2 = new Book('2', 'Test Book 2', 'Test Author 2');
            loanService.addBook(book);
            loanService.addBook(book2);
            book.status = 'borrowed';
            const borrowedBooks = loanService.getBorrowedBooks();
            expect(borrowedBooks).toHaveLength(1);
            expect(borrowedBooks[0]).toBe(book);
        });

        it('should return an empty array if no books are borrowed', () => {
            loanService.addBook(book);
            const borrowedBooks = loanService.getBorrowedBooks();
            expect(borrowedBooks).toHaveLength(0);
        });
    });

    describe('getOverdueBooks', () => {
       
        it('should return an empty array if no books are overdue', () => {
            loanService.addBook(book);
            book.dueDate = new Date('2023-10-15');
            const overdueBooks = loanService.getOverdueBooks(new Date('2023-10-10'));
            expect(overdueBooks).toHaveLength(0);
        });
    });






});