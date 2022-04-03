class GetData {

    constructor(idName){
        if(GetData.exist){
            return GetData.instance;
        }

        this._idName = idName;
        this._recipesArray = new Array()
        this._recipes = fetch('data/recipes.json')
            .then(res => res.json())
            .then(values => {
                for (const key in values) {
                    this._recipesArray.push(
                        values[key]
                    )
                }
            })
            .catch(err => console.error(err));
        
        GetData.exist = true;
        GetData.instance = this;
    }

    get data(){
        return this._recipes;
    }

    get recipes(){
        return this._recipesArray;
    }

    get id(){
        return this._idName;
    }
}
