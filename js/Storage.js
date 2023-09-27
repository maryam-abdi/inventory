
const categories = [
    {
        id:1,
        title:"frontend",
        description:"front web",
        createdAt:"2023-09-18T13:18:59.544Z"
    },
    {
        id:2,
        title:"backend",
        description:"back web",
        createdAt:"2021-05-18T13:18:59.544Z"
    },
];
const products = [
    {
        id:1,
        title:"js",
        category:"frontend",
        createdAt:"2021-05-18T13:18:59.544Z"
    },
    {
        id:2,
        title:"sql",
        category:"backend",
        createdAt:"2023-08-18T13:18:59.544Z"
    },
]

export default class Storage{
   static getAllCategories(){
    const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    
   savedCategories.sort((a,b)=>{
    return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
   })
    return savedCategories;
   }
   static saveCategory(categoryToSave){
    const savedCategories = Storage.getAllCategories();
   const findCategory = savedCategories.find((c)=>c.id === categoryToSave.id);
   if(findCategory){
    findCategory.title = categoryToSave.title;
    findCategory.description = categoryToSave.description;
    // findCategory.createdAt = new Date().toISOString();
   }else{
    categoryToSave.id = new Date().getTime();
    categoryToSave.createdAt = new Date().toISOString();
    savedCategories.push(categoryToSave);
   }
 localStorage.setItem("categories",JSON.stringify(savedCategories));
   }
   static getAllProducts(sort="newest"){
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
   return savedProducts.sort((a,b)=>{
    if(sort === "newest"){

        return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    }else if(sort === "oldest"){
        return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
    }
    })
   }
  static saveProduct(productToSave){
    const savedProducts = Storage.getAllProducts();
    const findProduct = savedProducts.find((c)=>c.id === productToSave.id);
    if(findProduct){
     findProduct.title = productToSave.title;
     findProduct.quantity = productToSave.quantity;
     findProduct.category = productToSave.category;
     // findCategory.createdAt = new Date().toISOString();
    }else{
     productToSave.id = new Date().getTime();
     productToSave.createdAt = new Date().toISOString();
     savedProducts.push(productToSave);
    }
  localStorage.setItem("products",JSON.stringify(savedProducts));
  }
  static deleteProduct(id){
    const savedProducts = Storage.getAllProducts();
    const filteredProducts = savedProducts.filter((p)=>p.id != id);
    localStorage.setItem("products",JSON.stringify(filteredProducts));
  }
}