import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);//storing array of object - data from the API
    const [fetchError, setFetchError] = useState(null);//storing object - error from the API
    const [isLoading, setIsLoading] = useState(false);//storing boolean - Componet with data loading

    useEffect(() => {
        let isMounted = true; // Component is mounted or not => Component is loaded or not
        const source = axios.CancelToken.source()//if Componet is not loaded, then cancelling the fetch request

        const fetchData = async (url) => {
            setIsLoading(true);//After completion of loading, change the state to true
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setData([]);
                    setFetchError(err.message)
                }
            } finally {
                isMounted && setTimeout(() => setIsLoading(false),2000);
            }
        }
        fetchData(dataUrl);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }
        return cleanUp;
    }, [dataUrl]);//useEffect() works when dataUrl comes only

    return { data,fetchError,isLoading };
}

export default useAxiosFetch
