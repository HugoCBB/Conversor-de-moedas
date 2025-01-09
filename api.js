// async function fecthGet(key, moeda, quantidade) {
//     try {
//         const response =  await fetch(`https://v6.exchangerate-api.com/v6/${key}/pair/EUR/${moeda}/${quantidade}`)
//         if (!response.ok) {
//             throw new Error("Erro na requisição")
            
//         } 
//         const data = await response.json()
//         console.log(data);
        
//     }catch (error) {
//         console.log("error",error);
        
//     }
let moeda = []

async function fecthGet(key) {
    try {
        const response =  await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`)
        if (!response.ok) {
            throw new Error("Erro na requisição")
            
        } 
        const data = await response.json()
        
        moeda = Object.keys(data.conversion_rates)
        console.log(moeda);
        
    }catch (error) {
        console.log("error",error);
        
    }
    
    
    
}

fecthGet("83fc1f2415e19e4528dd8644");