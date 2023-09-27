import CategoryView from "./Category.js";
import ProductsView from "./Products.js";
document.addEventListener("DOMContentLoaded",()=>{
    CategoryView.setApp();
    ProductsView.setApp();
    CategoryView.createCategoriesList();
    ProductsView.createProductsList(ProductsView.products);
    console.log(CategoryView)
})