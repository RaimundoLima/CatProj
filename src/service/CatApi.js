import Axios from 'axios';

const key = '743f49ba-0557-455f-a087-aa33cde53668'


const config = {
	baseURL: "https://api.thecatapi.com/v1",
	headers:
	{
		'x-api-key': key
	}

}

const api = Axios.create(config)

class CatApi {


	ListImages =  async (filters = {}) =>
	{
		filters.limit = 8;
		filters.size="med"
		const result = await api.get('/images/search', {params:filters})
		return result.data;

	}


	ListMyImages = async () =>
	{
		api.get('')
		return "d"
	}


	SendImage = async (file,sub_id) =>
	{
		const data =
		{
			file: file,
			sub_id:sub_id
		}
		return api.post('/images/upload',data)
	}
	FavImage = async (image_id, sub_id) => {
		const data =
		{
			image_id: image_id,
			sub_id: sub_id
		}
		return api.post('/favourites/', data)
	}

}
export default CatApi;

