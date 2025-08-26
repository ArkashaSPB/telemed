import {$host, $authHost} from "./index.js";

export const getServicesAPI = async () => {
	const {data} = await $host.get(`services`)
	return data
}

export const getServicesQuizAPI = async (id) => {
	const {data} = await $host.get(`services/`+id)
	return data
}