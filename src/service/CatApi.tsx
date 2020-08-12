import Axios from 'axios';

const key = '743f49ba-0557-455f-a087-aa33cde53668'


const config = {
	baseURL: "https://api.thecatapi.com/v1",
	headers:
	{
		'Content-Type': 'application/x-www-form-urlencoded',
		'Access-Control-Allow-Origin' : '*',
		'x-api-key': key
	}

}

const api = Axios.create(config)

class CatApi {


	ListImages = async (filters = {breed: "",category: "",type: ""}) =>
	{
		const params = {
			breed_id: filters.breed,
			category_ids: filters.category,
			mime_types: filters.type,
			limit: 8,
			size: "med"
		}
		console.log(params)
		const result = await api.get('/images/search', {params:params})
		return result.data;

	}

	ListMyImages = async (sub_id: string) => {
		console.log(`sub id : ${sub_id}`)
		const params = {
			sub_id: sub_id,
			limit:8
		}
		const result = await api.get('/images/', { params: params })
		console.log(`result ${result}`)
		console.log(`data ${result.data}`)
		return result.data;
	}

	ListBreeds = async () => {
		const result = await api.get("/breeds")
		return result.data
	}

	ListCategory = async () => {
		const result = await api.get("/categories")
		return result.data
	}


	SendImage = async (file:File,sub_id:string) =>
	{
		const formData = new FormData()
		formData.append("file",file)
		formData.append("sub_id",sub_id)

		const auxConfig = config;

		auxConfig.headers["Content-Type"] = "multipart/form-data"
		
		return api.post('/images/upload',formData,auxConfig)
	}

	FavImage = async (image_id:string, sub_id:string) => {
		const data =
		{
			image_id: image_id,
			sub_id: sub_id
		}
		return api.post('/favourites/', data)
	}

}
export default CatApi;

