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


	ListImages =  async (filters = {limit:0,size:""}) =>
	{
		filters.limit = 8;
		filters.size="med"
		const result = await api.get('/images/search', {params:filters})
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

	ListMyImages = async () =>
	{
		api.get('')
		return "d"
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

