import  {useEffect, useState} from "react";
import apiBuilder from "./getApi";


const useApi = (entity ,state ,language , page) => {

const [values, setValues] = useState([])


useEffect(() => {
    const getData = async () => {
        const res = await apiBuilder.tryGet(entity, state, language, page)
        if(res instanceof Error) {
            console.log(res.messange)
        } else {
            setValues(res)
        }
    }
    getData()
},[entity,language,page,state])



return[values]

}

export default useApi;
