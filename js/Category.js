// title , desc => {} => Storage.saveCategory
import Storage from "./Storage.js";
const categoryTitle = document.getElementById("title");
const categoryDescription = document.getElementById("description");
const addNewCategoryBtn = document.querySelector(".add-category-btn");
const addCategoryForm = document.querySelector(".add-category");
const categoryForm = document.getElementById("category-section");
const cancelAddCategory = document.querySelector(".cancel-category-btn");
 class CategoryView{
    constructor(){
   addNewCategoryBtn.addEventListener("click",(e)=>this.addNewCategory(e));
   addCategoryForm.addEventListener("click",(e)=>this.toggleAddCategory(e));
   cancelAddCategory.addEventListener("click",(e)=>this.cancelAddCategory(e));
   this.categories = [];
    }

    addNewCategory(e){
     e.preventDefault();
     const title = categoryTitle.value;
     const description = categoryDescription.value;
     if(!title || !description) return;
     Storage.saveCategory({title,description});
     this.categories = Storage.getAllCategories();
     // update DOM : update select uption in category
     this.createCategoriesList();
     categoryTitle.value = "";
     categoryDescription.value = "";
     categoryForm.classList.add("hidden");
     addCategoryForm.classList.remove("hidden");
    }
    setApp(){
        this.categories = Storage.getAllCategories();
    }
    createCategoriesList(){
    let result = `<option value="">select a category</option>`;
   
    this.categories.forEach(element => {
        result += `<option value=${element.id}>${element.title}</option>`
    });
    const categoryDOM = document.getElementById("category-product");
    categoryDOM.innerHTML = result;
    }
    toggleAddCategory(e){
        e.preventDefault();
     categoryForm.classList.remove("hidden");
     addCategoryForm.classList.add("hidden");
    }
    cancelAddCategory(e){
        e.preventDefault();
        categoryForm.classList.add("hidden");
        addCategoryForm.classList.remove("hidden");
    }
}
export default new CategoryView();