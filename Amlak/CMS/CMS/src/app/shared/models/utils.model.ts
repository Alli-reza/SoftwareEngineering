export class PageCollection {
  skip?: number;
  take?: number;
  pageNumber?: number;
  counts?: number;
  searchWord?: string;

  constructor(model: PageCollection) {
    this.skip = model.skip || 0;
    this.take = model.take || 10;
    this.pageNumber = model.pageNumber || 0;
    this.counts = model.counts || 0;
    this.searchWord = model.searchWord || '';
  }
}
