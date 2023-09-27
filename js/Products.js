import Storage from "./Storage.js";
const addNewProductBtn = document.getElementById("add-new-product");
const productTitle = document.getElementById("title-product");
const productQuantity = document.getElementById("quantity-product");
const productCategory = document.getElementById("category-product");
const inputSearch = document.getElementById("input-search");
const selectSortOpt = document.getElementById("sort");
class ProductsView{
constructor(){
     addNewProductBtn.addEventListener("click",(e)=>this.addNewProduct(e));
     inputSearch.addEventListener("input",(e)=>this.searchProducts(e));
     selectSortOpt.addEventListener("change",(e)=>this.sortProducts(e));
     this.products = [];
    }
setApp(){
    this.products = Storage.getAllProducts();
}    
addNewProduct(e){
    e.preventDefault();
     const title = productTitle.value;
     const quantity = productQuantity.value;
     const category = productCategory.value;
     if(!title || !quantity || !category) return;
     Storage.saveProduct({title,quantity,category});
     this.products = Storage.getAllProducts();
     this.createProductsList(this.products);
    }
createProductsList(products){

let result = "";
products.forEach((item)=>{
    const selectedCategory = Storage.getAllCategories().find((c)=> c.id === item.category);
    result += `<div class="product w-full flex justify-between items-center text-gray-400 text-xl md:text-lg mobile:text-sm overflow-auto">
    <p>${item.title}</p>
    <div class="w-[60%]  flex justify-end items-center gap-2">
     <span class="text-[3px]">${new Date(item.createdAt).toLocaleDateString("fa-IR")}</span>
     <span class="border-2 border-gray-400 rounded-full px-3 mobile:px-2 py-1  flex justify-center items-center">${item.title}</span>
     <span class="quantity p-4 mobile:p-2">${item.quantity}</span>
     <button id="delete-product" class="border-2 border-red-600 text-red-600 rounded-full px-3 mobile:px-2 py-1 flex justify-center items-center" data-id=${item.id}>delete</button>
    </div>
   </div>`;
});
const productsDOM = document.getElementById("products");
productsDOM.innerHTML = result;
productTitle.value = "";
productQuantity.value="";
productCategory.value="";
const deleteBtns = [...document.querySelectorAll("#delete-product")];
deleteBtns.forEach((btn)=>{
    btn.addEventListener("click",(e)=>this.deleteProduct(e));
})
}    
searchProducts(e){
let search = e.target.value;

const filteredProducts = this.products.filter((p)=>{
    return p.title.toLowerCase().includes(search.trim().toLowerCase());
});

this.createProductsList(filteredProducts);
}
sortProducts(e){
const value = e.target.value;
this.products = Storage.getAllProducts(value);
this.createProductsList(this.products);
}
deleteProduct(e){
const produId = e.target.dataset.id;
Storage.deleteProduct(produId);
this.products = Storage.getAllProducts();
this.createProductsList(this.products);
}
}
export default new ProductsView();