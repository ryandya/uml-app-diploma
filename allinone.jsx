{
  "classes": [
    {
      "name": "Library",
      "attributes": [
        "libraryId: int",
        "name: string",
        "address: string",
        "contactEmail: string"
      ],
      "methods": [
        "addBook(book: Book)",
        "registerMember(member: Member)",
        "processLoan(loan: Loan)"
      ]
    },
    {
      "name": "Member",
      "attributes": [
        "memberId: int",
        "name: string",
        "email: string",
        "joinDate: date"
      ],
      "methods": [
        "borrowBook(book: Book)",
        "returnBook(loan: Loan)"
      ]
    },
    {
      "name": "Reservation",
      "attributes": [
        "reservationId: int",
        "reservationDate: date",
        "status: string"
      ],
      "methods": [
        "cancelReservation()"
      ]
    },
    {
      "name": "Book",
      "attributes": [
        "isbn: string",
        "title: string",
        "author: string",
        "publicationYear: int",
        "status: string"
      ],
      "methods": [
        "changeStatus(newStatus: string)",
        "displayInfo()"
      ]
    },
    {
      "name": "Loan",
      "attributes": [
        "loanId: int",
        "issueDate: date",
        "dueDate: date",
        "returned: bool"
      ],
      "methods": [
        "calculateFine(): float"
      ]
    },
    {
      "name": "Fine",
      "attributes": [
        "fineId: int",
        "amount: float",
        "reason: string",
        "paid: bool"
      ],
      "methods": [
        "markAsPaid()"
      ]
    }
  ],
    "relationships": [
      {
        "from": "Library",
        "to": "Member",
        "type": "association"
      },
      {
        "from": "Library",
        "to": "Book",
        "type": "association"
      },
      {
        "from": "Library",
        "to": "Loan",
        "type": "association"
      },
      {
        "from": "Member",
        "to": "Reservation",
        "type": "association"
      },
      {
        "from": "Member",
        "to": "Loan",
        "type": "association"
      },
      {
        "from": "Reservation",
        "to": "Book",
        "type": "association"
      },
      {
        "from": "Loan",
        "to": "Book",
        "type": "association"
      },
      {
        "from": "Loan",
        "to": "Fine",
        "type": "association"
      }
    ]
}