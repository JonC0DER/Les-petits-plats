class Pagination {

    constructor(arrayRecipies){
        this._numberOfRecipes = 6;
        this._firstPage = 0;
        this._currentPage = 1;
        this._arrayRecipies = arrayRecipies;
        this._content = '';
        this._infoPage = '';
    }

    get lastP() {
        return Math.ceil(this._arrayRecipies.length / this._numberOfRecipes);
    }

    newArray(newOne){
        this._arrayRecipies = newOne;
    }
    
    firstPageRecipes() {
        this._firstPage = 0;
        this._currentPage = 1;
    }

    nextPage() {
        if (this._firstPage + this._numberOfRecipes <= this._arrayRecipies.length) {
            this._firstPage += this._numberOfRecipes;
            this._currentPage ++;
        }
    }

    previousPage() {
        if (this._firstPage - this._numberOfRecipes >= 0) {
            this._firstPage -= this._numberOfRecipes;
            this._currentPage --;
        }
    }

    lastPageRecipes() {
        this._firstPage = (this.lastP * this._numberOfRecipes) - this._numberOfRecipes;
        this._currentPage = this.lastP; 
    }

    displayRecipies() {
        this._content = '';
        for (let i = this._firstPage; i < this._firstPage + this._numberOfRecipes; i++) {
            if (i < this._arrayRecipies.length) {
                this._content += this._arrayRecipies[i].outerHTML;
            }
        }
    }
    
    get pageContent(){
        return this._content;
    }

    get currentPageUpdate(){
        return this._currentPage;
    }

    get pageInfo() {
        return this._infoPage = `${this._currentPage} / ${this.lastP}`;
    }

}
