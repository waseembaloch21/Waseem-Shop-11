export async function getAllProducts() {
    try {
        const products = await fetch(
            "http://api.escuelajs.co/api/v1/products"
        ).then((res) => res.json());
        return products;
    }
     catch (err) {
        throw Error('Something Went Wrong');
    }
    
}