import { useEffect, useState } from 'react'

export default async function useFetchGraphData(
  start: string,
  end: string,
  setLoading: React.Dispatch<any>
): Promise<any> {
  const [data, setData] = useState([])
  const getData = async (
    start: string,
    end: string,
    setLoading: React.Dispatch<any>
  ): Promise<any> => {
    try {
      const uri = `${window.location.origin}/v1/getDataAllPartners/?firstDate=${start}&secondDate=${end}`
      setLoading(true)
      const response = await fetch(uri)
      const data = await response.json()
      setData(data)
    } catch (e) {
      console.log('Error Fetching Data:', e)
    }
    setLoading(false)
  }

  useEffect(() => {
    getData(start, end, setLoading).catch(e => console.log(e))
  }, [start, end])

  return data
}
