import { MAIN_URL, PER_PAGE } from "@/lib/vars"
import type { Note, NoteId, NotePost, NotesData, SortBy, Tag } from "@/types/note"
import axios from "axios"

axios.defaults.baseURL = MAIN_URL
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`

export interface SearchParams {
	search: string
	tag?: Tag
	page?: number
	perPage?: number
	sortBy?: SortBy
}

interface ApiQueryParams {
	params: SearchParams
}

export type Category = {
	id: string
	name: string
	description: string
	createdAt: string
	updatedAt: string
}

export const getCategories = (): string[] => {
	return ["Todo", "Work", "Personal", "Meeting", "Shopping"]
}

export const createQueryParams = (search = "", page = 1, tag?: string): ApiQueryParams => {
	const params: SearchParams = {
		search,
		page,
		perPage: PER_PAGE,
	}
	//console.log(tag)
	if (tag !== "All") {
		params.tag = tag as Tag
	}

	return { params }
}

export const fetchNotes = async (queryParams: ApiQueryParams): Promise<NotesData> => {
	//const url: string = id === null ? MAIN_URL : `${MAIN_URL}/${id}`
	const response = await axios.get<NotesData>(MAIN_URL, queryParams)
	return response.data
}

export const deleteNote = async (id: NoteId): Promise<Note> => {
	const response = await axios.delete<Note>(`${MAIN_URL}/${id}`)
	return response.data
}

export const createNote = async (queryParams: NotePost): Promise<Note> => {
	//console.log("creation", queryParams)
	const response = await axios.post<Note>(MAIN_URL, queryParams)
	return response.data
}

export const updateNote = async (queryParams: NotePost, id: NoteId): Promise<Note> => {
	const response = await axios.patch<Note>(`${MAIN_URL}/${id}`, queryParams)
	return response.data
}

export const fetchNoteById = async (id: NoteId): Promise<Note> => {
	const response = await axios.get<Note>(`${MAIN_URL}/${id}`)
	return response.data
}
