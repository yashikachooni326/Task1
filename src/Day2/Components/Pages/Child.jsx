export const Child = (props)=>
{

    return(
        <>
           
        <h1 className="text-green-500">Child Component</h1>
         <p>Name: {props.name}</p>
            <p>marks: {props.marks}</p>



        <div className="bg-indigo-300 h-100 w-200 mt-8  flex justify-center gap-8 ml-5">
            {props.products.map((item,index)=>(
             <div className="border bg-cyan-100 h-80 rounded-lg mt-5" key={index}>
               <img className="h-50 w-50" src={item.image}/>
               <h2 className="flex items-center justify-center font-medium text-blue-500">{item.title}</h2>
               <h4 className="text-green-600 flex items-center justify-center">{item.description}</h4>
                </div>
                ))
            }
        </div>
        </>
    )
}