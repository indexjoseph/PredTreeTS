import { stringify } from "querystring";

class TreeBuilder{
    
    /**An array of strings containing the contents of the file. */
    private data: string[];

    /** Hashmap of Trees of size  */
    private mapOfTrees: Map<string, TreeNode>;

    constructor(data: string[]){
        this.data = data;
    }

    /**
     * This method will get all the first letters in the words and initiate
     * a root for every new letter it has not seen.
     * @param {Array} data - Array of words from the file  
     */
    private buildTree(fileContent: string[]): void {
        for(let i = 0; i < fileContent.length; i++){
            let firstLetter = fileContent[i][0].toLowerCase();

            if(!this.mapOfTrees.has(firstLetter))
                this.mapOfTrees.set(firstLetter, new TreeNode(firstLetter));
        }
    }

    /**
     * Thhis method will first initiate the roots of all the trees in the
     * HashMap. It will then populate the corresponding roots with thee words
     * within the designated root. 
     */
    public go(): void {
        this.buildTree(this.data);
        for(let i = 0; i < this.data.length; i++){
            let word = this.data[i].toLowerCase();
            if(word.length > 1)
                this.addWord(word, this.mapOfTrees[word[0]]);
        }
    }

    /**
     * The method first converts the word to lower case and stores the first 
     * letter of the word. If the root has children and the word starts with
     * the same letters as one children it will make a recursive call with that
     * child, which will become it's parent.
     * @param {String} word - Word to be inserted into dictionary
     * @param {TreeNode} root - Current potential parent node of the word
     * @returns {Boolean} added - True if added, false otherwise.
     */
    private addWord(word : string, root : TreeNode): void {
        word = word.toLowerCase();
        for(let i = 0 ; i < root.getChildren(); i++){
            let child = root.getChild(i);
            if(word.startsWith(child.getData().toLowerCase())){
                this.addWord(word, child);
                return;
            }
        }
        root.addChild(word);
    }

    /**
     * 
     * @param {String} letter - Letter used to check if there's a valid root
     * within thee HashMap of root's.
     * @returns {TreeNode} or {Null} - If the first letter exists as a root
     * within the hashMap of root's then 
     */
    public startSearch(letter : string) : any {
        letter = letter.toLowerCase();
        let start : any = null;
        if(this.mapOfTrees.has(letter))
            start = this.mapOfTrees.get(letter);
        return start
    }

    /**
     * This method will populate totalWords array until all the children of the
     * root has been traveersed or the maximum amount of words are in the total
     * Words array.
     * @param {TreeNode} root - Root of the tree for (The first letter within
     * currentWord)
     * @param {String} potentialWord - Current searched content
     * @param {Number} maxWords - Max number of suggestions to be given.
     * @param {Array} totalWords - - Array that holds all possible suggestions.
     * @returns 
     */
    public lookUpWords(root : TreeNode, potentialWord : string, maxWords : number, totalWords : string[]) : void {
        for(let i = 0; i < root.getChildren() && maxWords > totalWords.length; i++){

            let child = root.getChild(i);

            if(child.getData().toLowerCase().startsWith(potentialWord.toLowerCase())
            && !totalWords.includes(child.getData())){
                totalWords.push(child.getData())
            }else if(potentialWord.toLowerCase().startsWith(child.getData())){
                this.lookUpWords(child, potentialWord, maxWords, totalWords);
                return;
            }else if(child.getData() === potentialWord.toLowerCase()){
                this.lookUpWords(child, potentialWord, maxWords, totalWords);
                return;
            }
        }
    }
}


class TreeNode{

    /** Array of TreeNode children */
    private children: TreeNode[];
    /** Data stored within the TreeNode */
    private word : string;

    constructor(word : string) {
        this.word = word;
    }
    /**
     * This method will create a TreeNode object and push it to the children
     * array of the current TreeNode
     * @param {String} data - Data passed for the creation of the TreeNode
     */

    public addChild(word : string) : void {
        let child = new TreeNode(word);
        this.children.push(child);
    }


    /**
     * This method will get the specified TreeNode within the children array
     * of the current TreeNode.
     * @param {Number} index - Specified index within the children array of
     * current TreeNode
     * @returns {TreeNode} - TreeNode at the specified index within the children
     * array
     */
    public getChild(index : number) : TreeNode {
        return this.children[index];
    }

    public getChildren() : number {
        return this.children.length;
    }
    /**
     * This method will set the data of the current node to the parameeter
     * passed.
     * @param {String} data 
     */
    public setData(data : string) : void {
        this.data = data;
    }

    /**
     * This method will get the data (word) within the node.
     * @returns {String} data - The data within the node calling the method
     */
    public getData() : string {
        return this.word;
    }
}
