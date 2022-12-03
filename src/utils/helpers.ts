import { v1 } from "uuid";

export const todolistId1 = v1();
export const todolistId2 = v1();


export const checkLocalStorage = (key: string) => {
    const dataFromLocalStorage = localStorage.getItem(key)
    if (dataFromLocalStorage) {
        return JSON.parse(dataFromLocalStorage)
    } else {
        if (key === 'tasks') {
            return {
                [todolistId1]: [
                    {id: v1(), title: "HTML&CSS", isDone: true},
                    {id: v1(), title: "JS", isDone: true}
                ],
                [todolistId2]: [
                    {id: v1(), title: "Milk", isDone: true},
                    {id: v1(), title: "React Book", isDone: true}
                ]
            }
        } else {
            return [
                {id: todolistId1, title: "What to learn", filter: "all", sort: "default"},
                {id: todolistId2, title: "What to buy", filter: "all", sort: "default"}
            ]
        }
    }
}