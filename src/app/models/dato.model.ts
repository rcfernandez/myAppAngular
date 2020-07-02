export class Dato {
    docs: any[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number;
    nextPage: number;

    constructor(
        docs: [],
        totalDocs: 0,
        limit: 0,
        totalPages: 0,
        page: 0,
        pagingCounter: 0,
        hasPrevPage: false,
        hasNextPage: false,
        prevPage: 0,
        nextPage: 0
        ) {
            this.docs = docs;
            this.totalDocs = totalDocs;
            this.limit = limit;
            this.totalPages = totalPages;
            this.page = page;
            this.pagingCounter = pagingCounter;
            this.hasPrevPage = hasPrevPage;
            this.hasNextPage = hasNextPage;
            this.prevPage = prevPage;
            this.nextPage = nextPage;
    }
}